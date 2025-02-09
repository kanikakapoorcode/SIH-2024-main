import { useState } from 'react';

export const useOtpVerification = (email) => {

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const sendOtp = async () => {

    try {

      setIsLoading(true);

      setError('');

      const response = await fetch('/api/send-otp', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ email })

      });

      if (!response.ok) {

        throw new Error('Failed to send OTP');

      }

      return true;

    } catch (err) {

      setError('Failed to send OTP. Please try again.');

      return false;

    } finally {

      setIsLoading(false);

    }

  };

  const verifyOtp = async (otp) => {

    try {

      setIsLoading(true);

      setError('');

      const response = await fetch('/api/verify-otp', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ email, otp })

      });

      if (!response.ok) {

        throw new Error('Invalid OTP');

      }

      return true;

    } catch (err) {

      setError('Invalid OTP. Please try again.');

      return false;

    } finally {

      setIsLoading(false);

    }

  };

  return { sendOtp, verifyOtp, isLoading, error };

};