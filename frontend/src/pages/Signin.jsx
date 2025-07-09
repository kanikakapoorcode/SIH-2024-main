import React, { useState } from 'react'
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { Link, useNavigate } from 'react-router-dom'
import { FaLock, FaEnvelope, FaArrowRight } from 'react-icons/fa'

export const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            // Add your authentication logic here
            console.log("Login attempt with:", { email, password });
            // For now, let's just redirect to home
            // navigate('/');
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
                            <FaLock className="h-7 w-7 text-indigo-600" />
                        </div>
                        <Heading label="Sign in to your account" />
                        <SubHeading label="Enter your credentials to access the University Inspection System" />
                    </div>
                    
                    <div className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <InputBox 
                                label="Email Address" 
                                placeholder="your.email@example.com" 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required={true}
                                error={errors.email}
                            />
                            
                            <InputBox 
                                label="Password" 
                                placeholder="••••••••" 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
                                error={errors.password}
                            />
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input 
                                        id="remember-me" 
                                        name="remember-me" 
                                        type="checkbox" 
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>
                                
                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <Button 
                                label="Sign in" 
                                onClick={handleSubmit}
                                icon={<FaArrowRight />}
                            />
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <Button
                                label="Google"
                                variant="secondary"
                                onClick={() => {}}
                            />
                            <Button
                                label="Microsoft"
                                variant="secondary"
                                onClick={() => {}}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
