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
  FiLock,
  FiMap
} from 'react-icons/fi';
import PageLayout from '../components/PageLayout';

const ChurchHealthAssessment = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('last12months');
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // Sample data for the balanced scorecard
  const healthScores = {
    spiritual: {
      overall: 78,
      metrics: {
        worshipAttendance: 85,
        smallGroupParticipation: 72,
        prayerLife: 68,
        bibleStudy: 75,
        serviceParticipation: 82,
        spiritualGifts: 76
      }
    },
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
    <div className="space-y-8 p-4">
      {/* Overall Health Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Overall Church Health</h2>
          <div className="flex items-center mt-2 sm:mt-0">
            <span className="text-gray-500">Last Updated:</span>
            <span className="ml-2 font-medium text-gray-700">Today</span>
          </div>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {Object.entries(healthScores).map(([key, value]) => (
            <div key={key} className="relative">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-medium text-gray-700 capitalize">{key}</span>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center relative`} style={{
                    background: `conic-gradient(${
                      key === 'spiritual' ? '#3B82F6' : 
                      key === 'organizational' ? '#8B5CF6' : 
                      key === 'financial' ? '#10B981' : 
                      key === 'community' ? '#EF4444' : 
                      '#F59E0B'
                    } ${typeof value === 'object' ? value.overall : value}%, #EEE ${typeof value === 'object' ? value.overall : value}% 100%)`
                  }}>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <span className="text-sm font-semibold" style={{
                        color: key === 'spiritual' ? '#3B82F6' : 
                               key === 'organizational' ? '#8B5CF6' : 
                               key === 'financial' ? '#10B981' : 
                               key === 'community' ? '#EF4444' : 
                               '#F59E0B'
                      }}>
                        {typeof value === 'object' ? value.overall : value}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${typeof value === 'object' ? value.overall : value}%`,
                      backgroundColor: key === 'spiritual' ? '#3B82F6' : 
                                     key === 'organizational' ? '#8B5CF6' : 
                                     key === 'financial' ? '#10B981' : 
                                     key === 'community' ? '#EF4444' : 
                                     '#F59E0B'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Spiritual Metrics Detail */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Spiritual Health Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {Object.entries(healthScores.spiritual.metrics).map(([metric, score]) => (
              <div key={metric} className="flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    {metric.replace(/([A-Z])/g, ' $1').split(' ').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    ).join(' ')}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{score}%</span>
                </div>
                <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benchmark Comparison */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Benchmark Comparison</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(benchmarkData).map(([key, data]) => (
            <div key={key} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <span className={`text-sm font-medium ${
                  data.difference.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {data.difference}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{data.yourChurch}</p>
                  <p className="text-xs text-gray-500 mt-1">Your Church</p>
                </div>
                <div className="text-right">
                  <p className="text-lg text-gray-600">{data.similarChurches}</p>
                  <p className="text-xs text-gray-500 mt-1">Similar Churches</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership & Culture Combined Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leadership Alignment */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Leadership Alignment</h3>
          <div className="space-y-4">
            {Object.entries(leadershipAlignmentData).map(([key, value]) => (
              <div key={key} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 capitalize">{key}</span>
                  <span className="text-sm font-medium text-indigo-600">{value}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Culture & Values */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Culture & Values</h3>
          <div className="space-y-4">
            {cultureValues.map((item) => (
              <div key={item.value} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.value}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{item.actual}%</span>
                    <span className="text-xs text-gray-500">/ {item.target}%</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.actual >= item.target ? 'bg-green-500' : 
                      item.actual >= item.target * 0.9 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                    style={{ width: `${item.actual}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
  // Add new renderBenchmarks function
  const renderBenchmarks = () => (
    <div className="space-y-8 p-4">
      {/* Benchmark Overview Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Church Benchmarks</h2>
            <p className="text-gray-600 mt-1">Compare your metrics with similar churches</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue="similar-size"
            >
              <option value="similar-size">Similar Size Churches</option>
              <option value="same-denomination">Same Denomination</option>
              <option value="same-region">Same Region</option>
              <option value="national-avg">National Average</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(benchmarkData).map(([key, data]) => (
            <div key={key} className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  data.difference.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {data.difference}
                </span>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Your Church</span>
                  <span className="text-2xl font-bold text-gray-900">{data.yourChurch}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      data.difference.startsWith('+') ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ 
                      width: `${
                        parseInt(data.yourChurch.replace(/[^0-9]/g, '')) / 
                        (parseInt(data.similarChurches.replace(/[^0-9]/g, '')) * 1.5) * 100
                      }%` 
                    }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Similar Churches</span>
                  <span className="text-lg text-gray-600">{data.similarChurches}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Percentile Ranking</span>
                  <span className="font-medium text-indigo-600">
                    {key === 'attendance' ? 'Top 15%' :
                     key === 'giving' ? 'Top 10%' :
                     key === 'volunteerEngagement' ? 'Top 25%' :
                     key === 'newMembers' ? 'Top 20%' :
                     'Top 45%'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trends Over Time */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Historical Trends</h2>
        <div className="text-center text-gray-600 py-8">
          <FiBarChart2 className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2">Trend data visualization coming soon</p>
        </div>
      </div>

      {/* Regional Comparison */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Regional Comparison</h2>
        <div className="text-center text-gray-600 py-8">
          <FiMap className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2">Regional comparison data coming soon</p>
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
      {activeTab === 'benchmarks' && renderBenchmarks()}
      {activeTab === 'surveys' && renderDashboard()}
      {activeTab === 'leadership' && renderLeadership()}
      {activeTab === 'culture' && renderCulture()}
      
      {/* Premium modal */}
      {renderPremiumModal()}
    </PageLayout>
  );
};

export default ChurchHealthAssessment;
