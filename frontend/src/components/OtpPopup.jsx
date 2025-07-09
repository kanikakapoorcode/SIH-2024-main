import React, { useState, useEffect } from "react";

const OtpPopup = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading = false, 
  error = '',
  attemptsRemaining = 3,
  resendTimer = 0
}) => {
  const [otp, setOtp] = useState("");

  // Focus input when popup opens
  useEffect(() => {
    if (isOpen) {
      document.querySelector('.otp-input')?.focus();
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (otp.length === 6) {
      onSubmit(otp);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
            <p className="text-gray-600 mb-6">
              Enter the 6-digit code sent to your email
            </p>

            {/* Attempts remaining */}
            <div className="text-sm text-gray-600 mb-6">
              {attemptsRemaining} attempts remaining
            </div>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center space-x-2 mb-6">
            <input
              type="text"
              className="otp-input w-12 h-12 text-2xl text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                setOtp(value);
              }}
              maxLength="6"
              disabled={isLoading}
              placeholder="••••••"
              autoFocus
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">
              {error}
            </div>
          )}

          {/* Resend OTP */}
          <div className="text-center text-sm text-gray-600 mb-6">
            Didn't receive the code?{' '}
            <button
              onClick={() => onSubmit('resend')}
              disabled={resendTimer > 0 || isLoading}
              className={`font-medium ${
                resendTimer > 0 || isLoading
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
            </button>
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleSubmit}
              disabled={otp.length !== 6 || isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                otp.length === 6 && !isLoading
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-blue-400 cursor-not-allowed'
              } transition-colors`}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </button>

            <button
              onClick={onClose}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpPopup;
// import React, { useState } from "react";
// import { BottomWarning } from "../components/BottomWarning";
// import { Button } from "../components/Button";
// import { Heading } from "../components/Heading";
// import { InputBox } from "../components/InputBox";
// import { SubHeading } from "../components/SubHeading";
// import OtpPopup from "../components/OtpPopup";
// import { useOtpVerification } from "../hooks/useOtpVerification";

// export const University = () => {
//   // Form data state
//   const [formData, setFormData] = useState({
//     universityId: '',
//     universityName: '',
//     designation: '',
//     contactNumber: '',
//     username: '',
//     email: ''
//   });

//   // OTP popup state and verification hook
//   const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
//   const { sendOtp, verifyOtp, isLoading, error } = useOtpVerification(formData.email);

//   // Handle input changes for all form fields
//   const handleInputChange = (e, field) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: e.target.value
//     }));
//   };

//   // Basic email validation
//   const validateEmail = (email) => {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
//   };

//   // Validate form data before sending OTP
//   const validateForm = () => {
//     return formData.universityId &&
//            formData.universityName &&
//            formData.designation &&
//            formData.contactNumber &&
//            formData.username &&
//            formData.email &&
//            validateEmail(formData.email);
//   };

//   // Handle verify and signup process
//   const handleVerifyAndSignup = async () => {
//     if (!validateForm()) {
//       alert("Please fill in all fields correctly.");
//       return;
//     }

//     const success = await sendOtp();
//     if (success) {
//       setIsOtpPopupOpen(true);
//     }

//     // After OTP verification, call API to send email and handle redirection
//     const response = await fetch('/api/send-email', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: formData.email, designation: formData.designation })
//     });

//     if (response.ok) {
//       const data = await response.json();
//       // Redirect based on the user designation
//       if (data.role === 'university') {
//         window.location.href = '/university-homepage';
//       } else if (data.role === 'inspector') {
//         window.location.href = '/inshome';
//       }
//     } else {
//       alert('Failed to send the email.');
//     }
//   };

//   // Handle OTP submission
//   const handleOtpSubmit = async (otp) => {
//     const success = await verifyOtp(otp);
//     if (success) {
//       setIsOtpPopupOpen(false);
//       // Here you would typically make an API call to create the user account
//       try {
//         // Example API call (replace with your actual API endpoint)
//         const response = await fetch('/api/signup', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(formData)
//         });

//         if (response.ok) {
//           // Handle successful signup (e.g., redirect to dashboard)
//           window.location.href = '/dashboard';
//         } else {
//           throw new Error('Signup failed');
//         }
//       } catch (err) {
//         alert('Failed to create account. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="bg-slate-300 h-screen flex justify-center">
//       <div className="flex flex-col justify-center">
//         <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
//           <Heading label={"University Official Details"} />
//           <SubHeading label={"Enter your information to create an account"} />
          
//           <InputBox 
//             placeholder="743298" 
//             label={"University ID"} 
//             value={formData.universityId}
//             onChange={(e) => handleInputChange(e, 'universityId')}
//           />
          
//           <InputBox 
//             placeholder="Graphic Era Hill University" 
//             label={"University Name"} 
//             value={formData.universityName}
//             onChange={(e) => handleInputChange(e, 'universityName')}
//           />
          
//           <InputBox 
//             placeholder="Rank" 
//             label={"Designation"} 
//             value={formData.designation}
//             onChange={(e) => handleInputChange(e, 'designation')}
//           />
          
//           <InputBox 
//             placeholder="91+" 
//             label={"Contact Number"} 
//             value={formData.contactNumber}
//             onChange={(e) => handleInputChange(e, 'contactNumber')}
//           />
          
//           <InputBox 
//             placeholder="nimratkaur123" 
//             label={"Username"} 
//             value={formData.username}
//             onChange={(e) => handleInputChange(e, 'username')}
//           />
          
//           <InputBox 
//             placeholder="example@university.edu" 
//             label={"Email"} 
//             value={formData.email}
//             onChange={(e) => handleInputChange(e, 'email')}
//           />

//           {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          
//           <div className="pt-4">
//             <Button 
//               onClick={handleVerifyAndSignup} 
//               label={isLoading ? "Please wait..." : "Verify & Signup"}
//               disabled={isLoading}
//             />
//           </div>
          
//           <BottomWarning 
//             label={"Already have an account?"} 
//             buttonText={"Sign in"} 
//             to={"/signin"} 
//           />
//         </div>
//       </div>

//       <OtpPopup
//         isOpen={isOtpPopupOpen}
//         onClose={() => setIsOtpPopupOpen(false)}
//         onSubmit={handleOtpSubmit}
//       />
//     </div>
//   );
// };
