import React, { useState, useEffect } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import OtpPopup from "../components/OtpPopup";
import { useNavigate } from "react-router-dom";
import { useOtpVerification } from "../hooks/useOtpVerification";

export const University = () => {
  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    universityId: "",
    universityName: "",
    designation: "",
    contactNumber: "",
    username: ""
  });
  
  const navigate = useNavigate();

  // Use the OTP verification hook
  const { 
    isLoading, 
    error, 
    otpSent, 
    attemptsRemaining,
    resendTimer,
    sendOtp, 
    verifyOtp, 
    resetOtp 
  } = useOtpVerification(email);

  const handleVerifyAndSignup = async () => {
    if (!email) {
      alert('Please enter a valid email address');
      return;
    }

    // Show OTP popup
    setIsOtpPopupOpen(true);
    
    // Try to send OTP if not already sent
    if (!otpSent) {
      await sendOtp();
    }
  };

  const handleOtpSubmit = async (enteredOtp) => {
    const isValid = await verifyOtp(enteredOtp);
    if (isValid) {
      // OTP verified, proceed with signup
      setIsOtpPopupOpen(false);
      handleSignup();
    }
  };

  const handleOtpPopupClose = () => {
    setIsOtpPopupOpen(false);
    resetOtp();
  };

  const handleSignup = () => {
    // Here you would typically send the form data to your backend
    console.log("Form data:", { email, ...formData });
    
    // For now, just redirect to the university dashboard
    navigate("/university/dashboard");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <div className="text-center mb-8">
          <Heading label={"University Official Details"} />
          <SubHeading label={"Enter your information to create an account"} />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <InputBox
            type="email"
            name="email"
            placeholder="Enter your email"
            label={"Email Address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={otpSent}
          />
          
          <InputBox 
            name="universityId"
            placeholder="743298" 
            label={"University ID"}
            value={formData.universityId}
            onChange={handleInputChange}
          />
          
          <InputBox 
            name="universityName"
            placeholder="Graphic Era Hill University" 
            label={"University Name"}
            value={formData.universityName}
            onChange={handleInputChange}
          />
          
          <InputBox 
            name="designation"
            placeholder="e.g., Professor, HOD" 
            label={"Designation"}
            value={formData.designation}
            onChange={handleInputChange}
          />
          
          <InputBox 
            name="contactNumber"
            type="tel"
            placeholder="+91XXXXXXXXXX" 
            label={"Contact Number"}
            value={formData.contactNumber}
            onChange={handleInputChange}
          />
          
          <InputBox 
            name="username"
            placeholder="Choose a username" 
            label={"Username"}
            value={formData.username}
            onChange={handleInputChange}
          />
          
          <div className="pt-4">
            <Button 
              onClick={handleVerifyAndSignup}
              disabled={isLoading}
              label={
                isLoading 
                  ? "Processing..." 
                  : otpSent 
                    ? "Complete Signup" 
                    : "Send OTP"
              }
              className={`w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>
          
          <BottomWarning 
            label={"Already have an account?"} 
            buttonText={"Sign in"} 
            to={"/signin"} 
          />
        </div>
      </div>

      {/* OTP Popup */}
      {isOtpPopupOpen && (
        <OtpPopup
          isOpen={isOtpPopupOpen}
          onClose={handleOtpPopupClose}
          onSubmit={handleOtpSubmit}
          isLoading={isLoading}
          error={error}
          attemptsRemaining={attemptsRemaining}
          resendTimer={resendTimer}
        />
      )}
    </div>
  );
};
