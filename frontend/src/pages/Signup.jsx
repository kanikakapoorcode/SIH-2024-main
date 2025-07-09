import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { Link } from "react-router-dom";
import { FaUserPlus, FaUniversity, FaUserTie, FaArrowRight } from "react-icons/fa";

export const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        designation: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        
        if (!formData.designation) newErrors.designation = "Please select your designation";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = () => {
        if (validateForm()) {
            if (formData.designation === "UN") {
                navigate("/university");
            } else if (formData.designation === "IS") {
                navigate("/inspector/home");
            }
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>
            
            <div className="max-w-md w-full space-y-8 relative z-10">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 transition-all duration-500 hover:shadow-2xl">
                    <div className="text-center">
                        <div className="mx-auto h-14 w-14 rounded-full bg-indigo-100 flex items-center justify-center">
                            <FaUserPlus className="h-7 w-7 text-indigo-600" />
                        </div>
                        <Heading label="Create your account" />
                        <SubHeading label="Fill in your details to join the University Inspection System" />
                    </div>
                    
                    <div className="mt-8 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <InputBox 
                                label="First Name" 
                                placeholder="John" 
                                value={formData.firstName}
                                onChange={(e) => handleChange({ target: { name: "firstName", value: e.target.value } })}
                                required={true}
                                error={errors.firstName}
                            />
                            
                            <InputBox 
                                label="Last Name" 
                                placeholder="Doe" 
                                value={formData.lastName}
                                onChange={(e) => handleChange({ target: { name: "lastName", value: e.target.value } })}
                                required={true}
                                error={errors.lastName}
                            />
                        </div>
                        
                        <InputBox 
                            label="Email Address" 
                            placeholder="your.email@example.com" 
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange({ target: { name: "email", value: e.target.value } })}
                            required={true}
                            error={errors.email}
                        />
                        
                        <InputBox 
                            label="Password" 
                            placeholder="••••••••" 
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleChange({ target: { name: "password", value: e.target.value } })}
                            required={true}
                            error={errors.password}
                        />
                        
                        <div className="w-full">
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                Designation <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none appearance-none bg-white ${
                                        errors.designation 
                                            ? "border-red-300 focus:ring-red-100" 
                                            : "border-gray-300 focus:ring-indigo-100 focus:border-indigo-400"
                                    }`}
                                >
                                    <option value="">Select Your Designation</option>
                                    <option value="UN">University Official</option>
                                    <option value="IS">Inspector</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                                    </svg>
                                </div>
                                {errors.designation && (
                                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.designation}</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex items-center mt-4">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                            </label>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <Button 
                            label="Create Account" 
                            onClick={handleSignup}
                            icon={<FaArrowRight />}
                        />
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Your role</span>
                            </div>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div className={`
                                p-4 border rounded-lg flex flex-col items-center text-center cursor-pointer transition-all
                                ${formData.designation === "UN" 
                                    ? "border-indigo-600 bg-indigo-50" 
                                    : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50"}
                            `}
                            onClick={() => handleChange({ target: { name: "designation", value: "UN" } })}>
                                <FaUniversity className="h-8 w-8 text-indigo-600 mb-2" />
                                <div className="font-medium">University</div>
                                <div className="text-xs text-gray-500">Official staff member</div>
                            </div>
                            
                            <div className={`
                                p-4 border rounded-lg flex flex-col items-center text-center cursor-pointer transition-all
                                ${formData.designation === "IS" 
                                    ? "border-indigo-600 bg-indigo-50" 
                                    : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50"}
                            `}
                            onClick={() => handleChange({ target: { name: "designation", value: "IS" } })}>
                                <FaUserTie className="h-8 w-8 text-indigo-600 mb-2" />
                                <div className="font-medium">Inspector</div>
                                <div className="text-xs text-gray-500">Quality assessment role</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
