import { useState } from 'react';

// API base URL - points to our Node.js backend
const API_BASE_URL = 'http://localhost:4000'; // Default port

const OTP_ERROR_MESSAGES = {
  'Please wait': 'Please wait before requesting another OTP',
  'Too many requests': 'Too many requests. Please try again later',
  'Invalid OTP': 'Invalid OTP entered',
  'Maximum attempts': 'Maximum verification attempts exceeded',
  'Expired': 'OTP has expired. Please request a new one',
  'default': 'An error occurred. Please try again'
};

export const useOtpVerification = (email) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);
  const [resendTimer, setResendTimer] = useState(0);

  const formatError = (message) => {
    for (const [key, value] of Object.entries(OTP_ERROR_MESSAGES)) {
      if (message.includes(key)) return value;
    }
    return OTP_ERROR_MESSAGES['default'];
  };

  const sendOtp = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch(`${API_BASE_URL}/api/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Failed to send OTP';
        throw new Error(errorMessage);
      }

      setOtpSent(true);
      setAttemptsRemaining(3);
      setResendTimer(30); // 30 seconds resend timer
      
      // Start resend timer countdown
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return true;
    } catch (err) {
      setError(formatError(err.message));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch(`${API_BASE_URL}/api/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Failed to verify OTP';
        
        // Handle attempts remaining
        if (errorMessage.includes('attempts remaining')) {
          const attempts = parseInt(errorMessage.match(/\d+/)[0]);
          setAttemptsRemaining(attempts);
        }
        
        throw new Error(errorMessage);
      }

      // Reset state on successful verification
      resetOtp();
      return true;
    } catch (err) {
      setError(formatError(err.message));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetOtp = () => {
    setError('');
    setOtpSent(false);
    setAttemptsRemaining(3);
    setResendTimer(0);
  };

  return {
    isLoading,
    error,
    otpSent,
    attemptsRemaining,
    resendTimer,
    sendOtp,
    verifyOtp,
    resetOtp
  };
};