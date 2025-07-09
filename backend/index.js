require('dotenv').config();
const express = require("express");
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory store for OTPs (replace with database in production)
const otpStore = new Map();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Send OTP endpoint
app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ 
      success: false,
      error: 'Email is required' 
    });
  }

  // Check if there's a recent OTP that hasn't expired yet
  const existingOtp = otpStore.get(email);
  if (existingOtp && existingOtp.expires > Date.now()) {
    const timeLeft = Math.ceil((existingOtp.expires - Date.now()) / 1000 / 60);
    return res.status(429).json({
      success: false,
      error: `Please wait ${timeLeft} minutes before requesting a new OTP`
    });
  }

  const otp = generateOTP();
  const expiresIn = parseInt(process.env.OTP_EXPIRY_MINUTES || '10') * 60 * 1000; // Convert to milliseconds
  otpStore.set(email, { 
    otp, 
    expires: Date.now() + expiresIn,
    attempts: 0 // Track verification attempts
  });

  try {
    // In development, log the OTP instead of sending an email
    if (process.env.NODE_ENV === 'development') {
      console.log(`OTP for ${email}: ${otp}`);
      return res.json({ 
        success: true, 
        message: 'OTP sent successfully (check console in development)' 
      });
    }

    // In production, send the actual email
    await transporter.sendMail({
      from: `"EduInsight" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP for EduInsight',
      text: `Your OTP is: ${otp}\n\nThis OTP is valid for ${process.env.OTP_EXPIRY_MINUTES || '10'} minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your OTP for EduInsight</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <div style="font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP is valid for ${process.env.OTP_EXPIRY_MINUTES || '10'} minutes.</p>
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            If you didn't request this OTP, please ignore this email.
          </p>
        </div>
      `,
    });

    res.json({ 
      success: true, 
      message: 'OTP sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send OTP. Please try again later.' 
    });
  }
});

// Verify OTP endpoint
app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  
  if (!email || !otp) {
    return res.status(400).json({ 
      success: false, 
      error: 'Email and OTP are required' 
    });
  }

  const storedOtp = otpStore.get(email);

  // Check if OTP exists
  if (!storedOtp) {
    return res.status(400).json({ 
      success: false, 
      error: 'No OTP found for this email. Please request a new one.' 
    });
  }

  // Check if OTP has expired
  if (Date.now() > storedOtp.expires) {
    otpStore.delete(email);
    return res.status(400).json({ 
      success: false, 
      error: 'OTP has expired. Please request a new one.' 
    });
  }

  // Check if maximum attempts exceeded
  if (storedOtp.attempts >= 3) {
    otpStore.delete(email);
    return res.status(400).json({ 
      success: false, 
      error: 'Maximum attempts exceeded. Please request a new OTP.' 
    });
  }

  // Check if OTP matches
  if (storedOtp.otp !== otp) {
    // Increment attempt counter
    storedOtp.attempts++;
    otpStore.set(email, storedOtp);
    
    const attemptsLeft = 3 - storedOtp.attempts;
    return res.status(400).json({ 
      success: false, 
      error: `Invalid OTP. ${attemptsLeft} attempts remaining.`
    });
  }

  // OTP is valid
  otpStore.delete(email);
  
  // In a real app, you would generate a JWT token here
  // and return it to the client for authenticated requests
  res.json({ 
    success: true, 
    message: 'OTP verified successfully',
    // token: generateAuthToken(email) // Implement this function
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
