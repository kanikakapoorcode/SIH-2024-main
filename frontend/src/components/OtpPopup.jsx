import React, { useState } from "react";

  const OtpPopup = ({ isOpen, onClose, onSubmit }) => {
  const [otp, setOtp] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(otp);
    setOtp(""); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Enter OTP</h2>
        <p className="text-gray-600 text-sm mb-4 text-center">
           Enter the 6-digit OTP sent to your registered Email.
        </p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-center text-lg"
          placeholder="Enter OTP"
        />
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-900 text-sm font-medium"
          >
            Submit
          </button>
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
