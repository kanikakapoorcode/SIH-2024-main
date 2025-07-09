require('dotenv').config();
const express = require("express");
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const Redis = require('ioredis');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Kill any existing Node.js processes
exec('taskkill /F /IM node.exe', (error, stdout, stderr) => {
  if (error) {
    console.error('Error killing processes:', error);
  }
  console.log('Existing Node.js processes terminated');
});

// Initialize app and middleware
const app = express();
const PORT = process.env.PORT || 4000;

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Configure logging
const logFile = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });
const logStdout = process.stdout;

// In-memory rate limiting store (primary)
const rateLimitStore = new Map();

// Initialize Redis client with fallback
let redisClient = null;

try {
  redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || '',
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    connectTimeout: 2000,
    enableOfflineQueue: false
  });

  redisClient.on('error', (error) => {
    console.error('Redis connection error:', error);
    redisClient = null;
  });

  redisClient.on('connect', () => {
    console.log('Redis connected successfully');
  });

  redisClient.on('end', () => {
    console.log('Redis connection closed');
    redisClient = null;
  });

  // Test connection
  redisClient.ping().catch(() => {
    console.error('Redis ping failed, falling back to in-memory rate limiting');
    redisClient = null;
  });
} catch (error) {
  console.error('Failed to initialize Redis:', error);
  redisClient = null;
}

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000, // Default 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  message: 'Too many requests. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: async (req, res, next) => {
    try {
      // Always use in-memory store first
      const now = Date.now();
      const key = req.ip;
      const entry = rateLimitStore.get(key);

      if (entry) {
        // Check if window has expired
        if (now - entry.timestamp > (parseInt(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000) {
          rateLimitStore.delete(key);
        } else if (entry.count >= (parseInt(process.env.RATE_LIMIT_MAX) || 100)) {
          return res.status(429).json({
            success: false,
            error: 'Too many requests. Please try again later.'
          });
        } else {
          entry.count++;
          rateLimitStore.set(key, entry);
        }
      } else {
        rateLimitStore.set(key, {
          count: 1,
          timestamp: now
        });
      }

      // Try to update Redis if available
      if (redisClient) {
        try {
          const redisKey = `rate_limit:${req.ip}`;
          const count = await redisClient.get(redisKey);
          if (count && parseInt(count) >= (parseInt(process.env.RATE_LIMIT_MAX) || 100)) {
            return res.status(429).json({
              success: false,
              error: 'Too many requests. Please try again later.'
            });
          }
          
          // Increment counter
          await redisClient.incr(redisKey);
          await redisClient.expire(redisKey, (parseInt(process.env.RATE_LIMIT_WINDOW) || 15) * 60);
        } catch (redisError) {
          console.error('Redis rate limiting error:', redisError);
          // Continue with in-memory store
        }
      }

      next();
    } catch (error) {
      console.error('Rate limiting error:', error);
      next();
    }
  }
});

// Apply middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(limiter);

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} ${req.method} ${req.url} ${JSON.stringify(req.body)}\n`;
  logFile.write(logEntry);
  logStdout.write(logEntry);
  next();
});

// In-memory store for OTPs (replace with database in production)
const otpStore = new Map();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // For production, use SendGrid or similar service
  ...(process.env.NODE_ENV === 'production' && {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
});

// Generate random 6-digit OTP
function generateOTP() {
  return crypto.randomBytes(3).toString('hex').slice(0, 6);
}

// Send OTP endpoint
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'Email is required'
    });
  }

  // Generate OTP
  const otp = generateOTP();
  const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
  const otpAttempts = 0;

  // Store OTP in memory
  otpStore.set(email, { otp, expiry: otpExpiry, attempts: otpAttempts });

  // Send email
  try {
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'OTP Service'}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your OTP Code</h2>
          <p>Your one-time password (OTP) is:</p>
          <div style="font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0; padding: 10px; background: #f4f4f4; display: inline-block;">
            ${otp}
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
        </div>
      `
    });

    res.json({
      success: true,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send OTP. Please try again.'
    });
  }
});

// Verify OTP endpoint
app.post('/api/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  
  // Input validation
  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      error: 'Email and OTP are required'
    });
  }

  // Get OTP from store
  const otpData = otpStore.get(email);
  
  // Check if OTP exists and is not expired
  if (!otpData) {
    return res.status(400).json({
      success: false,
      error: 'OTP not found or expired. Please request a new one.'
    });
  }

  // Check if OTP is expired
  if (Date.now() > otpData.expiry) {
    otpStore.delete(email);
    return res.status(400).json({
      success: false,
      error: 'OTP has expired. Please request a new one.'
    });
  }

  // Check if max attempts reached
  if (otpData.attempts >= 3) {
    otpStore.delete(email);
    return res.status(400).json({
      success: false,
      error: 'Maximum number of attempts reached. Please request a new OTP.'
    });
  }

  // Verify OTP
  if (otp !== otpData.otp) {
    // Increment attempt counter
    otpData.attempts++;
    otpStore.set(email, otpData);

    return res.status(400).json({
      success: false,
      error: 'Invalid OTP. Please try again.',
      attemptsRemaining: 3 - otpData.attempts
    });
  }

  // OTP is valid
  otpStore.delete(email);

  // Here you would typically generate a JWT token and return it
  // For now, we'll just return a success message
  res.json({
    success: true,
    message: 'OTP verified successfully',
    // In a real app, you would include a JWT token here
    // token: generateAuthToken(email)
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please stop any existing server or use a different port.`);
    process.exit(1);
  }
  console.error('Server error:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
