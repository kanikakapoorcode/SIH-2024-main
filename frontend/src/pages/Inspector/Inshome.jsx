import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiTrendingUp, FiUsers, FiHome, FiAward } from 'react-icons/fi';
import AIInsights from '../../components/AIInsights';
import AIImageAnalysis from '../../components/AIImageAnalysis';
import UniGraph from './UniGraph';
import UniRanking from './UniRanking';
import UniSlider from './UniSlider';
import JudgingCriteria from './JudgingCriteria';
import Feedback from './Feedback';

const Inshome = () => {
  // Mock data for the dashboard
  const stats = [
    { name: 'Total Inspections', value: '24', icon: FiHome, change: '+2.1%', changeType: 'increase' },
    { name: 'Active Issues', value: '8', icon: FiAlertCircle, change: '-3', changeType: 'decrease' },
    { name: 'Compliance Rate', value: '92%', icon: FiCheckCircle, change: '+5.2%', changeType: 'increase' },
    { name: 'Top Performer', value: 'MIT', icon: FiAward, change: '1st', changeType: 'neutral' },
  ];

  const handleAnalysisComplete = (results) => {
    console.log('Image analysis results:', results);
    // Here you can handle the analysis results, e.g., update state or send to server
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">AI-Powered University Inspection Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : stat.changeType === 'decrease' ? 'text-red-600' : 'text-indigo-600'}`}>
                    <span className="font-medium">{stat.change}</span> {stat.changeType === 'increase' ? 'vs last month' : stat.changeType === 'decrease' ? 'resolved' : 'ranking'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insights and Analysis Section */}
        <div className="mt-8 space-y-8">
          {/* Infrastructure Image Analysis */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Infrastructure Analysis</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <AIImageAnalysis onAnalysisComplete={handleAnalysisComplete} />
            </div>
          </div>

          {/* AI Insights Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">AI-Generated Insights</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AIInsights universityId="1" />
              </div>
              
              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md text-left text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <span>Start New Inspection</span>
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md text-left text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <span>Generate Monthly Report</span>
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-md text-left text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <span>View High Priority Issues</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        3 New
                      </span>
                    </button>
                  </div>
                </div>

                {/* Inspection Progress */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Inspection Progress</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Infrastructure', progress: 75, color: 'bg-indigo-600' },
                      { name: 'Safety', progress: 90, color: 'bg-green-600' },
                      { name: 'Labs', progress: 45, color: 'bg-yellow-500' },
                      { name: 'Administration', progress: 60, color: 'bg-purple-600' },
                    ].map((item) => (
                      <div key={item.name}>
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                          <span>{item.name}</span>
                          <span>{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${item.color}`} 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='relative p-6 space-y-6'>
        <div className="pt-[5rem] md:pt-[7rem] gap-4 flex md:flex-row flex-col md:w-full">
          <div className="md:w-1/2 w-full">
          <h2 className='uppercase text-3xl md:text-4xl bg-white lg:text-5xl p-4 font-bold text-center'>Score board</h2>
            <UniGraph />
          </div>
          <div className="md:w-1/2 w-full">
          <h2 className='uppercase text-3xl md:text-4xl bg-white lg:text-5xl p-4 font-bold text-center'>Ranking</h2>
            <UniRanking />
          </div>
        </div>
        <h2 className='uppercase text-3xl md:text-4xl bg-white lg:text-5xl p-4 font-bold text-left'>Universities</h2>
        <UniSlider className="w-full"/>
        <div className='w-full'>
        <h2 className='uppercase text-3xl md:text-4xl bg-white lg:text-5xl p-4 font-bold text-left'>Judging criteria</h2>
        <JudgingCriteria />
        </div> 
        <div className='w-full'>
        <h2 className='uppercase text-3xl md:text-4xl bg-white lg:text-5xl p-4 font-bold text-left'>Feedback Form</h2>
        <Feedback />
        </div>
      </div>
    </div>
  );
};

export default Inshome;
