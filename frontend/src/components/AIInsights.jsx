import React, { useState, useEffect } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiTrendingUp, FiBarChart2 } from 'react-icons/fi';

const AIInsights = ({ universityId }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        // In a real app, this would be an API call to your backend
        // const response = await fetch(`/api/ai/insights/${universityId}`);
        // const data = await response.json();
        
        // Mock data for demonstration
        setTimeout(() => {
          setInsights({
            riskFactors: [
              { id: 1, title: 'Infrastructure Age', score: 65, trend: 'increasing', severity: 'medium' },
              { id: 2, title: 'Lab Equipment', score: 42, trend: 'decreasing', severity: 'high' },
              { id: 3, title: 'Safety Compliance', score: 88, trend: 'stable', severity: 'low' },
            ],
            recommendations: [
              'Upgrade lab equipment in Chemistry department',
              'Schedule maintenance for Building A electrical systems',
              'Review safety protocols in science labs',
            ],
            prediction: {
              nextInspectionScore: 78,
              confidence: 0.87,
              trend: 'improving',
            },
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load AI insights');
        setLoading(false);
      }
    };

    fetchInsights();
  }, [universityId]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4 p-6 bg-white rounded-lg shadow">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return <FiTrendingUp className="text-red-500" />;
      case 'decreasing': return <FiTrendingUp className="transform rotate-180 text-green-500" />;
      default: return <FiBarChart2 className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Factors */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">AI-Detected Risk Factors</h3>
        <div className="space-y-4">
          {insights.riskFactors.map((factor) => (
            <div key={factor.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${getSeverityColor(factor.severity)}`}>
                  {factor.title}
                </span>
                <span className="text-sm text-gray-600">
                  Score: {factor.score}/100
                </span>
              </div>
              <div className="flex items-center">
                {getTrendIcon(factor.trend)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">AI Recommendations</h3>
        <ul className="space-y-3">
          {insights.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start">
              <FiCheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-gray-700">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Predictive Analytics */}
      <div className="bg-indigo-50 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-indigo-900 mb-4">Predictive Analysis</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Next Inspection Score:</span>
            <span className="font-medium">{insights.prediction.nextInspectionScore}/100</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Confidence Level:</span>
            <span className="font-medium">{(insights.prediction.confidence * 100).toFixed(0)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Trend:</span>
            <span className="flex items-center">
              {getTrendIcon(insights.prediction.trend)}
              <span className="ml-1 capitalize">{insights.prediction.trend}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
