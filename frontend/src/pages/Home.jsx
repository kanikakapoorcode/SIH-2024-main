import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShield, FiTrendingUp, FiAward, FiArrowRight, FiCamera } from 'react-icons/fi';
import AIImageAnalysis from '../components/AIImageAnalysis';

// Import image directly
import uniIcon from '../assets/uniIcon.jpg';

function Home() {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  
  const handleAnalysisComplete = (results) => {
    setAnalysisResults(results);
  };

  const features = [
    {
      icon: FiShield,
      title: "AI-Powered Analysis",
      description: "Advanced infrastructure inspection using artificial intelligence"
    },
    {
      icon: FiTrendingUp,
      title: "Real-time Insights",
      description: "Get instant feedback and recommendations"
    },
    {
      icon: FiAward,
      title: "Quality Assurance",
      description: "Ensure high standards in educational infrastructure"
    }
  ];

  return (
    <main className='min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-blue-50'>
      {/* Hero Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left Column - Content */}
          <div className='space-y-8'>
            <div className='space-y-4'>
              <div className='inline-block'>
                <span className='bg-indigo-100 text-indigo-800 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wide'>
                  Next-Gen Technology
                </span>
              </div>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
                AI-Driven University
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 block'>
                  Inspection System
                </span>
              </h1>
              <p className='text-lg text-gray-600 max-w-2xl'>
                Transform your university inspection process with cutting-edge AI technology. 
                Get real-time insights and ensure quality standards across your institution.
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Link to="/signin" className="w-full sm:w-auto">
                <button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition hover:scale-105 shadow-md"
                >
                  Get Started
                </button>
              </Link>
              <Link to="/signup" className="w-full sm:w-auto">
                <button 
                  className="w-full bg-white text-gray-800 border-2 border-gray-200 px-8 py-3 rounded-lg font-semibold hover:border-indigo-500 hover:text-indigo-500 transition hover:scale-105 shadow-sm"
                >
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-3xl transform rotate-6 scale-105"></div>
            <div className="relative bg-white rounded-3xl shadow-xl p-6 transform transition-transform hover:-rotate-2">
              <img 
                src={uniIcon}
                alt="University inspection illustration"
                className="w-full h-full object-contain rounded-2xl"
                width={512}
                height={512}
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className='mt-24 grid md:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <div 
              key={index}
              className='bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:scale-105'
            >
              <div className='w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4'>
                <feature.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                {feature.title}
              </h3>
              <p className='text-gray-600'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* AI Demo Section */}
        <div className='mt-24 bg-white rounded-2xl shadow-lg overflow-hidden'>
          <div className='p-8 bg-gradient-to-r from-indigo-500 to-blue-600 text-white'>
            <h2 className='text-3xl font-bold mb-4'>Try Our AI Analysis Demo</h2>
            <p className='text-indigo-100 mb-6'>
              Upload infrastructure images and see how our AI can identify potential issues in real-time
            </p>
            {!showAnalysis ? (
              <button 
                onClick={() => setShowAnalysis(true)}
                className='flex items-center bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition shadow-md'
              >
                <FiCamera className="w-5 h-5 mr-2" />
                <span>Try Demo Now</span>
                <FiArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : null}
          </div>
          
          {showAnalysis && (
            <div className='p-8'>
              <AIImageAnalysis onAnalysisComplete={handleAnalysisComplete} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className='text-center pb-8'>
        <div className="py-2 text-sm flex justify-center">
          <div>Don't have an account?</div>
          <Link className="pointer underline pl-1 cursor-pointer text-blue-800" to="/signup">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;