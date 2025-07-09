import React, { useState, useCallback } from 'react';
import { FiUpload, FiCheckCircle, FiX, FiAlertTriangle, FiImage, FiTrash2 } from 'react-icons/fi';

const AIImageAnalysis = ({ onAnalysisComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState(null);

  // Handle drag events
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Handle file drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const newFiles = Array.from(e.dataTransfer.files);
    if (newFiles.length > 0) {
      const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
      if (imageFiles.length > 0) {
        setFiles(prev => [...prev, ...imageFiles]);
        setError(null);
      } else {
        setError('Please upload image files only');
      }
    }
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length > 0) {
      const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
      if (imageFiles.length > 0) {
        setFiles(prev => [...prev, ...imageFiles]);
        setError(null);
      } else {
        setError('Please select image files only');
      }
    }
  };

  // Remove a file
  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Analyze images using AI
  const analyzeImages = async () => {
    if (files.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // In a real app, this would be an API call to your backend
      // const formData = new FormData();
      // files.forEach(file => formData.append('images', file));
      // const response = await fetch('/api/ai/analyze-images', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const results = await response.json();

      // Mock API response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResults = {
        analysis: files.map((file, index) => ({
          id: `img-${index}`,
          filename: file.name,
          issues: [
            { type: 'crack', confidence: 0.87, location: 'Wall near window' },
            { type: 'water_damage', confidence: 0.65, location: 'Ceiling corner' },
            { type: 'structural_issue', confidence: 0.92, location: 'Foundation' },
          ].slice(0, Math.floor(Math.random() * 3) + 1), // Random number of issues (1-3)
          overallScore: Math.floor(70 + Math.random() * 30), // Random score between 70-100
        })),
        summary: {
          criticalIssues: Math.floor(Math.random() * 5),
          highPriority: Math.floor(Math.random() * 10),
          maintenanceNeeded: Math.floor(Math.random() * 8) + 2,
        },
      };

      setAnalysisResults(mockResults);
      if (onAnalysisComplete) {
        onAnalysisComplete(mockResults);
      }
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('Failed to analyze images. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Reset the component
  const resetAnalysis = () => {
    setFiles([]);
    setAnalysisResults(null);
    setError(null);
  };

  // Render file previews
  const renderFilePreviews = () => {
    return files.map((file, index) => (
      <div key={index} className="relative group">
        <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-200">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="h-full w-full object-cover"
          />
          <button
            onClick={() => removeFile(index)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>
        <span className="text-xs text-gray-500 truncate block w-32 mt-1">
          {file.name.length > 15 ? `${file.name.substring(0, 12)}...` : file.name}
        </span>
      </div>
    ));
  };

  // Render analysis results
  const renderAnalysisResults = () => {
    if (!analysisResults) return null;

    return (
      <div className="mt-6 space-y-6">
        <div className="bg-green-50 border-l-4 border-green-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiCheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                Analysis complete! Found {analysisResults.summary.criticalIssues} critical issues and {analysisResults.summary.highPriority} high priority items.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysisResults.analysis.map((result, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {result.filename}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    result.overallScore >= 80 ? 'bg-green-100 text-green-800' :
                    result.overallScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    Score: {result.overallScore}/100
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Detected Issues:</h4>
                <ul className="space-y-2">
                  {result.issues.map((issue, i) => (
                    <li key={i} className="flex items-start">
                      <FiAlertTriangle className={`h-4 w-4 mt-0.5 mr-2 flex-shrink-0 ${
                        issue.confidence > 0.8 ? 'text-red-500' :
                        issue.confidence > 0.5 ? 'text-yellow-500' : 'text-blue-500'
                      }`} />
                      <div>
                        <span className="text-sm font-medium text-gray-900 capitalize">
                          {issue.type.replace('_', ' ')} - {issue.location}
                        </span>
                        <span className="block text-xs text-gray-500">
                          Confidence: {Math.round(issue.confidence * 100)}%
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-indigo-900 mb-3">Maintenance Recommendations</h3>
          <ul className="space-y-2">
            {analysisResults.summary.criticalIssues > 0 && (
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-sm text-gray-700">
                  {analysisResults.summary.criticalIssues} critical issues require immediate attention.
                </span>
              </li>
            )}
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              <span className="text-sm text-gray-700">
                Schedule maintenance for {analysisResults.summary.maintenanceNeeded} identified areas.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-sm text-gray-700">
                Consider a detailed structural assessment for comprehensive evaluation.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={resetAnalysis}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Analyze More Images
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {!analysisResults ? (
        <>
          <div
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
              isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-1 text-center">
              <FiImage className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload images</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Selected Images ({files.length})
              </h3>
              <div className="flex flex-wrap gap-3">
                {renderFilePreviews()}
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={analyzeImages}
                  disabled={isAnalyzing}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isAnalyzing
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Images with AI'
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        renderAnalysisResults()
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIImageAnalysis;
