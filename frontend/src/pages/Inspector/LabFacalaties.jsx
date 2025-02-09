import React, { useState } from "react";

const LabFacalaties = () => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // Function to handle image selection
  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages([...images, ...fileArray]);

      // Generate image previews
      const previewArray = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages([...previewImages, ...previewArray]);
    }
  };

  // Function to handle form submission
  const handleGenerate = async () => {
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image_${index}`, image);
    });

    try {
      const response = await fetch("YOUR_BACKEND_ENDPOINT", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Images uploaded successfully!");
      } else {
        alert("Failed to upload images.");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error occurred while uploading images.");
    }
  };

  return (
    <div className="p-4 bg-[#0f4b8a] w-full space-y-4 rounded-md text-white">
        <h1 className="text-4xl text-white p-2 font-bold">Lab Facilities </h1>
      <div className="flex gap-4  items-center ">
        <input 
          type="file" 
          accept="image/*" 
          multiple 
          onChange={handleImageChange} 
          className="mb-4 p-2 border border-gray-300 rounded-md"
        />
        <h2 className="text-2xl font-semibold mb-4">Upload Images</h2>
      </div>
  
  <div className="flex flex-wrap gap-4 mt-4">
    {previewImages.map((src, index) => (
      <div key={index} className="w-1/3 sm:w-1/4 lg:w-1/5 p-2">
        <img
          src={src}
          alt={`Preview ${index}`}
          className="h-[200px] w-[200px] object-cover rounded-md"
        />
      </div>
    ))}
  </div>
  
  <button 
    onClick={handleGenerate} 
    className="mt-4 p-4 bg-[#00bbf1] text-white text-xl rounded-xl hover:bg-gray-800 transition"
  >
    Generate
  </button>
</div>

  );
};

export default LabFacalaties;