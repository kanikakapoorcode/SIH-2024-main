import React, { useState, useCallback } from "react";
import { FaCamera, FaFileUpload, FaTrash, FaSpinner } from "react-icons/fa";
import { Button } from "../../components/Button";

const Infrastructure = () => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  // Function to handle image selection
  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      addNewImages(files);
    }
  };

  // Function to add new images to state
  const addNewImages = (files) => {
    const fileArray = Array.from(files);
    
    // Filter out non-image files
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      setFeedback({ 
        type: "error", 
        message: "Please select valid image files (JPEG, PNG, etc.)" 
      });
      setTimeout(() => setFeedback({ type: "", message: "" }), 3000);
      return;
    }
    
    setImages(prevImages => [...prevImages, ...imageFiles]);

    // Generate image previews
    const previewArray = imageFiles.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) // size in MB
    }));
    
    setPreviewImages(prevPreviews => [...prevPreviews, ...previewArray]);
    
    setFeedback({ 
      type: "success", 
      message: `${imageFiles.length} image${imageFiles.length !== 1 ? 's' : ''} added successfully` 
    });
    setTimeout(() => setFeedback({ type: "", message: "" }), 3000);
  };

  // Function to remove an image
  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewImages];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewImages[index].url);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setPreviewImages(newPreviews);
    
    setFeedback({ 
      type: "info", 
      message: "Image removed" 
    });
    setTimeout(() => setFeedback({ type: "", message: "" }), 3000);
  };

  // Drag and drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addNewImages(e.dataTransfer.files);
    }
  }, []);

  // Function to handle form submission
  const handleGenerate = async () => {
    if (images.length === 0) {
      setFeedback({ 
        type: "error", 
        message: "Please upload at least one image." 
      });
      setTimeout(() => setFeedback({ type: "", message: "" }), 3000);
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image_${index}`, image);
    });

    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      /* 
      // Uncomment and update when backend endpoint is available
      const response = await fetch("YOUR_BACKEND_ENDPOINT", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setFeedback({ type: "success", message: "Images uploaded and analysis completed!" });
      } else {
        setFeedback({ type: "error", message: "Failed to process images." });
      }
      */
      
      // For demo purposes
      setFeedback({ 
        type: "success", 
        message: "Images uploaded and analysis completed!" 
      });
      
    } catch (error) {
      console.error("Error uploading images:", error);
      setFeedback({ 
        type: "error", 
        message: "Error occurred while uploading images." 
      });
    } finally {
      setIsUploading(false);
      setTimeout(() => setFeedback({ type: "", message: "" }), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6">
          <div className="flex items-center space-x-2">
            <FaCamera className="text-white text-2xl" />
            <h1 className="text-3xl font-bold text-white">Infrastructure Assessment</h1>
          </div>
          <p className="text-indigo-100 mt-2">
            Upload images of university infrastructure for AI-powered quality assessment
          </p>
        </div>

        {/* Feedback messages */}
        {feedback.message && (
          <div 
            className={`mx-6 mt-4 p-4 rounded-lg ${
              feedback.type === "success" ? "bg-green-50 text-green-800 border border-green-200" :
              feedback.type === "error" ? "bg-red-50 text-red-800 border border-red-200" :
              "bg-blue-50 text-blue-800 border border-blue-200"
            } transition-all duration-500`}
          >
            {feedback.message}
          </div>
        )}

        {/* Upload area */}
        <div className="p-6">
          <div 
            className={`border-2 border-dashed rounded-lg p-10 text-center transition-all
              ${dragActive 
                ? "border-indigo-500 bg-indigo-50" 
                : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
              }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <FaFileUpload className="text-4xl text-indigo-500" />
              <h3 className="text-xl font-medium text-gray-700">Drag and drop images here</h3>
              <p className="text-gray-500 max-w-md">
                Support for JPG, PNG, and other image formats. 
                You can upload multiple files at once.
              </p>
              <div className="mt-4">
                <label className="cursor-pointer">
                  <span className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Browse Files
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Image preview section */}
        {previewImages.length > 0 && (
          <div className="px-6 pb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Images ({previewImages.length})</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {previewImages.map((preview, index) => (
                <div 
                  key={index} 
                  className="group relative bg-gray-100 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md"
                >
                  <img
                    src={preview.url}
                    alt={`Preview ${index}`}
                    className="h-40 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                    <button
                      onClick={() => removeImage(index)}
                      className="bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100"
                      title="Remove image"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className="p-2 text-sm text-gray-700">
                    <p className="truncate" title={preview.name}>{preview.name}</p>
                    <p className="text-gray-500">{preview.size} MB</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
          <Button
            label={isUploading ? "Processing..." : "Generate Assessment"}
            onClick={handleGenerate}
            disabled={isUploading || images.length === 0}
            icon={isUploading ? <FaSpinner className="animate-spin" /> : null}
            variant={images.length === 0 ? "secondary" : "primary"}
            fullWidth={false}
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;