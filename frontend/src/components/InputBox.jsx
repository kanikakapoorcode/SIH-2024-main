import { useState } from 'react';

export function InputBox({ label, placeholder, type = "text", value, onChange, required = false, error = "" }) {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="mb-4 w-full">
      <label 
        className={`text-sm font-medium transition-all duration-200 ${
          focused ? "text-indigo-600" : "text-gray-700"
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="mt-1 relative">
        <input 
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-200 focus:ring-2 focus:outline-none
            ${error ? "border-red-300 focus:ring-red-100" : "border-gray-300 focus:ring-indigo-100 focus:border-indigo-400"}
            ${focused ? "border-indigo-400" : ""}
          `}
        />
        
        {error && (
          <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>
        )}
      </div>
    </div>
  );
}