import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiTrendingUp, 
  FiUsers, 
  FiCalendar, 
  FiDollarSign,
  FiPieChart,
  FiBarChart2,
  FiActivity,
  FiDownload,
  FiFilter,
  FiRefreshCw,
  FiUserPlus,
  FiCheck,
  FiHeart
} from 'react-icons/fi';
import PageLayout from '../components/PageLayout';

const MinistryAnalytics = () => {
  // Time period filter
  const [timePeriod, setTimePeriod] = useState('last30days');
  
  // Sample data for charts and metrics
  const metrics = {
    attendance: {
      current: 248,
      previous: 232,
      change: 6.9,
      trend: 'up'
    },
    newMembers: {
      current: 12,
      previous: 8,
      change: 50,
      trend: 'up'
    },
    giving: {
      current: 24500,
      previous: 21800,
      change: 12.4,
      trend: 'up'
    },
    engagement: {
      current: 68,
      previous: 62,
      change: 9.7,
      trend: 'up'
    }
  };
  
  // Sample attendance data for chart
  const attendanceData = [
    { date: '2023-06-18', count: 232 },
    { date: '2023-06-25', count: 241 },
    { date: '2023-07-02', count: 238 },
    { date: '2023-07-09', count: 245 },
    { date: '2023-07-16', count: 248 }
  ];
  
  // Sample giving data for chart
  const givingData = [
    { date: '2023-06-18', amount: 21800 },
    { date: '2023-06-25', amount: 22500 },
    { date: '2023-07-02', amount: 23100 },
    { date: '2023-07-09', amount: 24000 },
    { date: '2023-07-16', amount: 24500 }
  ];
  
  // Sample demographic data
  const demographicData = [
    { group: 'Under 18', count: 42, percentage: 17 },
    { group: '18-24', count: 28, percentage: 11 },
    { group: '25-34', count: 53, percentage: 21 },
    { group: '35-44', count: 45, percentage: 18 },
    { group: '45-54', count: 38, percentage: 15 },
    { group: '55-64', count: 25, percentage: 10 },
    { group: '65+', count: 17, percentage: 7 }
  ];
  
  // Sample ministry effectiveness data
  const ministryData = [
    { name: 'Sunday Service', engagement: 92, growth: 5, impact: 88 },
    { name: 'Youth Ministry', engagement: 78, growth: 12, impact: 82 },
    { name: 'Small Groups', engagement: 65, growth: 8, impact: 75 },
    { name: 'Outreach', engagement: 58, growth: 15, impact: 80 },
    { name: 'Children\'s Ministry', engagement: 85, growth: 7, impact: 84 },
    { name: 'Worship Team', engagement: 90, growth: 3, impact: 86 }
  ];
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format percentage
  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value}%`;
  };
  
  // Get trend color
  const getTrendColor = (trend, value) => {
    if (trend === 'up' && value > 0) return 'text-green-500';
    if (trend === 'down' && value < 0) return 'text-red-500';
    return 'text-gray-500';
  };
  
  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ministry Analytics</h1>
          <p className="text-gray-600 mt-1">Data-driven insights for ministry effectiveness</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
            <option value="lastYear">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="text-gray-500 hover:text-gray-700 p-2">
            <FiRefreshCw size={18} />
          </button>
          <button className="text-gray-500 hover:text-gray-700 p-2">
            <FiDownload size={18} />
          </button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FiUsers size={20} />
            </div>
            <span className={`text-sm font-medium ${getTrendColor(metrics.attendance.trend, metrics.attendance.change)}`}>
              {formatPercentage(metrics.attendance.change)}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{metrics.attendance.current}</h3>
          <p className="text-sm text-gray-500 mt-1">Weekly Attendance</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiUserPlus size={20} />
            </div>
            <span className={`text-sm font-medium ${getTrendColor(metrics.newMembers.trend, metrics.newMembers.change)}`}>
              {formatPercentage(metrics.newMembers.change)}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{metrics.newMembers.current}</h3>
          <p className="text-sm text-gray-500 mt-1">New Members</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FiDollarSign size={20} />
            </div>
            <span className={`text-sm font-medium ${getTrendColor(metrics.giving.trend, metrics.giving.change)}`}>
              {formatPercentage(metrics.giving.change)}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(metrics.giving.current)}</h3>
          <p className="text-sm text-gray-500 mt-1">Monthly Giving</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              <FiHeart size={20} />
            </div>
            <span className={`text-sm font-medium ${getTrendColor(metrics.engagement.trend, metrics.engagement.change)}`}>
              {formatPercentage(metrics.engagement.change)}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{metrics.engagement.current}%</h3>
          <p className="text-sm text-gray-500 mt-1">Member Engagement</p>
        </div>
      </div>
      
      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Attendance Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Attendance Trend</h3>
            <div className="flex items-center space-x-2">
              <button className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600 font-medium">Weekly</button>
              <button className="text-xs px-2 py-1 rounded text-gray-500 hover:bg-gray-100">Monthly</button>
            </div>
          </div>
          
          <div className="h-64 flex items-end space-x-2">
            {attendanceData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${(item.count / 300) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{item.date.split('-')[2]}/{item.date.split('-')[1]}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-gray-500">
              <span className="font-medium text-gray-700">Average:</span> 241
            </div>
            <div className="text-gray-500">
              <span className="font-medium text-gray-700">Peak:</span> 248
            </div>
          </div>
        </div>
        
        {/* Giving Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Giving Trend</h3>
            <div className="flex items-center space-x-2">
              <button className="text-xs px-2 py-1 rounded bg-purple-50 text-purple-600 font-medium">Weekly</button>
              <button className="text-xs px-2 py-1 rounded text-gray-500 hover:bg-gray-100">Monthly</button>
            </div>
          </div>
          
          <div className="h-64 flex items-end space-x-2">
            {givingData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-purple-500 rounded-t"
                  style={{ height: `${(item.amount / 30000) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">{item.date.split('-')[2]}/{item.date.split('-')[1]}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-gray-500">
              <span className="font-medium text-gray-700">Average:</span> {formatCurrency(23180)}
            </div>
            <div className="text-gray-500">
              <span className="font-medium text-gray-700">Total:</span> {formatCurrency(115900)}
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Demographics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Demographics</h3>
            <button className="text-sm text-blue-500 hover:text-blue-700">View Details</button>
          </div>
          
          <div className="space-y-4">
            {demographicData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700">{item.group}</span>
                  <span className="text-gray-500">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Ministry Effectiveness */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Ministry Effectiveness</h3>
            <button className="text-sm text-blue-500 hover:text-blue-700">View Details</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Ministry</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Engagement</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Growth</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ministryData.map((ministry, index) => (
                  <tr key={index}>
                    <td className="py-3 text-sm font-medium text-gray-900">{ministry.name}</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${ministry.engagement}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{ministry.engagement}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${ministry.growth * 6}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{ministry.growth}%</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${ministry.impact}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">{ministry.impact}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Key Insights</h3>
          <button className="text-sm text-blue-500 hover:text-blue-700">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <div className="flex items-center text-green-600 mb-2">
              <FiTrendingUp size={18} className="mr-2" />
              <h4 className="font-medium">Growth Opportunity</h4>
            </div>
            <p className="text-sm text-gray-700">Youth Ministry shows strong growth potential. Consider increasing resources for this area.</p>
          </div>
          
          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center text-yellow-600 mb-2">
              <FiActivity size={18} className="mr-2" />
              <h4 className="font-medium">Engagement Alert</h4>
            </div>
            <p className="text-sm text-gray-700">Small Groups engagement is lower than other ministries. Review and refresh small group strategy.</p>
          </div>
          
          <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
            <div className="flex items-center text-blue-600 mb-2">
              <FiPieChart size={18} className="mr-2" />
              <h4 className="font-medium">Demographic Insight</h4>
            </div>
            <p className="text-sm text-gray-700">25-34 age group is your largest demographic. Ensure programs are meeting their specific needs.</p>
          </div>
        </div>
      </div>
      
      {/* Premium Badge */}
      <div className="mt-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-4 text-white flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Premium Feature</h3>
          <p className="opacity-90">Ministry Analytics is a premium feature. Upgrade your plan for full access.</p>
        </div>
        <button className="bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-opacity-90">
          Upgrade
        </button>
      </div>
    </PageLayout>
  );
};

export default MinistryAnalytics;
