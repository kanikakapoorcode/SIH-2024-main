
import React, { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import OtpPopup from "../components/OtpPopup";
import { useNavigate } from "react-router-dom"; // React Router for navigation

export const University = () => {
  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userType, setUserType] = useState(""); // Store the user type (Inspector/University)
  const navigate = useNavigate(); // React Router hook for navigation

  const handleVerifyAndSignup = () => {
    if (!email) {
      alert("Please enter a valid email address");
      return;
  };
    // Logic to send OTP email to the provided email address.
    // You'll need to implement the backend API call for sending the OTP to the email
    sendOtpEmail(email).then((response) => {
      if (response.success) {
        setIsOtpPopupOpen(true); // Open OTP popup
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    });
  };

    // Function to simulate sending OTP email (this would actually be handled in your backend)
    const sendOtpEmail = async (email) => {
      // Call to your backend or API to send OTP
      // For now, simulate an API call
      console.log(`Sending OTP to ${email}`);
      return { success: true }; // Assume OTP is sent successfully
    };

  const handleOtpSubmit = (otp) => {
    console.log("Submitted OTP:", otp);
    // Logic to validate OTP from your backend or OTP service
    const isOtpValid = otp === "1234"; // You would replace this with real OTP validation logic

    if (isOtpValid) {
      setIsOtpPopupOpen(false); // Close the OTP popup
      redirectToHomePage(userType); // Redirect based on user type (Inspector or University)
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // Redirect to different pages based on user type
  const redirectToHomePage = (type) => {
    if (type === "university") {
      navigate("/unihome");
    } else {
      alert("Invalid user type.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
          <Heading label={"University Official Details"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            placeholder="Enter your email"
            label={"Email Address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Set email input value
          />         
          <InputBox placeholder="743298" label={"University ID"} />
          <InputBox placeholder="Graphic Era Hill University" label={"University Name"} />
          <InputBox placeholder="Rank" label={"Designation"} />
          <InputBox placeholder="91+ " label={"Contact Number"} />
          <InputBox placeholder="nimratkaur123" label={"Username"} />
          <div className="pt-4">
            <Button onClick={handleVerifyAndSignup} label={"Verify & Signup"} />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
      {/* OTP Popup */}
      <OtpPopup
        isOpen={isOtpPopupOpen}
        onClose={() => setIsOtpPopupOpen(false)}
        onSubmit={handleOtpSubmit}
      />
    </div>
  );
};
