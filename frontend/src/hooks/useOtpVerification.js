import { useState } from 'react';

// API base URL - points to our Node.js backend
const API_BASE_URL = 'http://localhost:3001';

export const useOtpVerification = (email) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      setError('Email is required');
      return false;
    }

    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(`${API_BASE_URL}/api/send-otp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setOtpSent(true);
      return true;

    } catch (err) {
      console.error('OTP Send Error:', err);
      setError(err.message || 'Failed to send OTP. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    if (!email || !otp) {
      setError('Email and OTP are required');
      return false;
    }

    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(`${API_BASE_URL}/api/verify-otp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP');
      }

      return true;

    } catch (err) {
      console.error('OTP Verification Error:', err);
      setError(err.message || 'Invalid OTP. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetOtp = () => {
    setOtpSent(false);
    setError('');
  };

  return { 
    sendOtp, 
    verifyOtp, 
    resetOtp,
    isLoading, 
    error,
    otpSent
  };
};