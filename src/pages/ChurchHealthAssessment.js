import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiBarChart2, 
  FiPieChart, 
  FiUsers, 
  FiHeart,
  FiDollarSign,
  FiClipboard,
  FiTarget,
  FiTrendingUp,
  FiCheckSquare,
  FiAward,
  FiSliders,
  FiDownload,
  FiFilter,
  FiCalendar,
  FiRefreshCw,
  FiAlertCircle,
  FiPlusCircle,
  FiLock
} from 'react-icons/fi';
import PageLayout from '../components/PageLayout';

const ChurchHealthAssessment = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('last12months');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // Sample data for the balanced scorecard
  const healthScores = {
    spiritual: 78,
    organizational: 65,
    financial: 82,
    community: 71,
    discipleship: 69
  };
  
  // Sample benchmark data
  const benchmarkData = {
    attendance: {
      yourChurch: 320,
      similarChurches: 285,
      difference: '+12%'
    },
    giving: {
      yourChurch: '$1,250',
      similarChurches: '$1,100',
      difference: '+14%'
    },
    volunteerEngagement: {
      yourChurch: '35%',
      similarChurches: '28%',
      difference: '+7%'
    },
    newMembers: {
      yourChurch: 45,
      similarChurches: 38,
      difference: '+18%'
    },
    discipleshipParticipation: {
      yourChurch: '42%',
      similarChurches: '45%',
      difference: '-3%'
    }
  };
  
  // Sample leadership alignment data
  const leadershipAlignmentData = {
    vision: 85,
    strategy: 72,
    priorities: 68,
    values: 90,
    roles: 75
  };
  
  // Sample culture and values assessment
  const cultureValues = [
    { value: 'Community', actual: 87, target: 90 },
    { value: 'Excellence', actual: 72, target: 85 },
    { value: 'Authenticity', actual: 91, target: 90 },
    { value: 'Generosity', actual: 78, target: 85 },
    { value: 'Growth', actual: 65, target: 80 }
  ];
  
  // Render the leadership tab
  const renderLeadership = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Leadership Team Alignment</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {Object.entries(leadershipAlignmentData).map(([key, value]) => (
          <div key={key} className="bg-indigo-50 rounded-lg p-4 text-center">
            <div className="text-indigo-600 font-bold text-xl mb-1">{value}%</div>
            <div className="text-sm font-medium text-gray-700 capitalize">{key}</div>
            <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  value >= 80 ? 'bg-green-500' : 
                  value >= 70 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`} 
                style={{ width: `${value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  // Render the culture tab
  const renderCulture = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Culture & Values Assessment</h3>
      <div className="mb-6">
        {cultureValues.map((item) => (
          <div key={item.value} className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{item.value}</span>
              <span className="text-sm text-gray-600">{item.actual}% / {item.target}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  item.actual >= item.target ? 'bg-green-500' : 
                  item.actual >= item.target * 0.9 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`} 
                style={{ width: `${item.actual}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  // Render the dashboard tab
  const renderDashboard = () => (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Overall Health Score</h3>
            <FiBarChart2 className="text-blue-500" size={20} />
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                  strokeDasharray="100, 100"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="3"
                  strokeDasharray="73, 100"
                />
                <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="#4F46E5" fontWeight="bold">73%</text>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Benchmark Ranking</h3>
            <FiTarget className="text-purple-500" size={20} />
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">Top 15%</div>
              <p className="text-sm text-gray-600">Among similar-sized churches</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Improvement Areas</h3>
            <FiSliders className="text-amber-500" size={20} />
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Discipleship Pathways</h4>
                <p className="text-sm text-gray-600">Only 42% of members are in a growth track</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">Balanced Scorecard</h3>
          <p className="text-sm text-gray-600 mt-1">Measuring health across key dimensions</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(healthScores).map(([key, value]) => (
              <div key={key} className={`bg-${key === 'spiritual' ? 'blue' : key === 'organizational' ? 'purple' : key === 'financial' ? 'green' : key === 'community' ? 'red' : 'amber'}-50 rounded-lg p-4 text-center`}>
                <div className={`text-${key === 'spiritual' ? 'blue' : key === 'organizational' ? 'purple' : key === 'financial' ? 'green' : key === 'community' ? 'red' : 'amber'}-600 font-bold text-xl mb-1`}>{value}%</div>
                <div className="text-sm font-medium text-gray-700 capitalize">{key}</div>
                <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className={`bg-${key === 'spiritual' ? 'blue' : key === 'organizational' ? 'purple' : key === 'financial' ? 'green' : key === 'community' ? 'red' : 'amber'}-600 h-full rounded-full`} style={{ width: `${value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
  // Render the premium modal
  const renderPremiumModal = () => (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 ${showPremiumModal ? '' : 'hidden'}`}>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white mb-4">
            <FiAward size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Upgrade to Premium</h3>
          <p className="text-gray-600 mt-2">
            Unlock advanced Church Health Assessment features with our Premium plan.
          </p>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <FiCheckSquare className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <span className="text-gray-700">
              Benchmark against similar churches in your denomination and region
            </span>
          </div>
          <div className="flex items-start">
            <FiCheckSquare className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
            <span className="text-gray-700">
              AI-powered survey analysis and actionable insights
            </span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-3">
          <button 
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={() => setShowPremiumModal(false)}
          >
            Upgrade Now
          </button>
          <button 
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => setShowPremiumModal(false)}
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Church Health Assessment</h1>
          <div className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            PRO
          </div>
        </div>
        <p className="text-gray-600">
          Measure and improve your church's health across spiritual, organizational, and financial dimensions.
        </p>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`${
              activeTab === 'dashboard'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`${
              activeTab === 'benchmarks'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Benchmarks
          </button>
          <button
            onClick={() => {setActiveTab('surveys'); setShowPremiumModal(true);}}
            className={`${
              activeTab === 'surveys'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            Surveys
            <FiLock size={14} className="ml-1 text-gray-400" />
          </button>
          <button
            onClick={() => {setActiveTab('leadership'); setShowPremiumModal(true);}}
            className={`${
              activeTab === 'leadership'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            Leadership
            <FiLock size={14} className="ml-1 text-gray-400" />
          </button>
          <button
            onClick={() => {setActiveTab('culture'); setShowPremiumModal(true);}}
            className={`${
              activeTab === 'culture'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            Culture & Values
            <FiLock size={14} className="ml-1 text-gray-400" />
          </button>
        </nav>
      </div>
      
      {/* Time range selector */}
      <div className="mb-6 flex justify-end">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="last3months">Last 3 Months</option>
          <option value="last6months">Last 6 Months</option>
          <option value="last12months">Last 12 Months</option>
          <option value="ytd">Year to Date</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>
      
      {/* Tab content */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'benchmarks' && renderDashboard()}
      {activeTab === 'surveys' && renderDashboard()}
      {activeTab === 'leadership' && renderLeadership()}
      {activeTab === 'culture' && renderCulture()}
      
      {/* Premium modal */}
      {renderPremiumModal()}
    </PageLayout>
  );
};

export default ChurchHealthAssessment;
