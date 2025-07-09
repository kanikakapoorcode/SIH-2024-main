import React from 'react';

export function Button({ 
  label, 
  onClick, 
  variant = "primary", 
  size = "medium", 
  fullWidth = true,
  icon = null,
  disabled = false,
  type = "button"
}) {
  // Button variants
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-300",
    secondary: "bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-200",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-300",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-300",
  };

  // Button sizes
  const sizes = {
    small: "text-xs px-3 py-1.5",
    medium: "text-sm px-5 py-2.5",
    large: "text-base px-6 py-3",
  };
  
  return (
    <button 
      onClick={onClick} 
      type={type}
      disabled={disabled}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? "w-full" : ""}
        font-medium rounded-lg 
        transition-all duration-300 
        focus:outline-none focus:ring-4
        flex items-center justify-center gap-2
        shadow-sm hover:shadow-md
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {icon && <span className="inline-block">{icon}</span>}
      {label}
    </button>
  );
}