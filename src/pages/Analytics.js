import React, { useState, useEffect } from 'react';
import { FiUsers, FiCalendar, FiTrendingUp, FiBarChart2, FiDownload, FiFilter } from 'react-icons/fi';
import { CardSkeleton } from '../components/SkeletonLoader';

const Analytics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'quarter', 'year'

  useEffect(() => {
    // Simulate API call to fetch analytics data
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const data = {
          attendanceTrend: {
            average: 285,
            change: 5.2,
            data: [250, 265, 275, 290, 280, 295, 305, 300, 310, 285, 290, 295]
          },
          membershipGrowth: {
            total: 450,
            newMembers: 28,
            change: 6.5,
            data: [420, 425, 430, 435, 440, 445, 450]
          },
          givingAnalytics: {
            average: 12500,
            change: 3.8,
            data: [11800, 12200, 12100, 12600, 12400, 12800, 13000, 12900, 13200, 12500, 12700, 12900]
          },
          eventParticipation: {
            total: 520,
            change: 8.3,
            topEvents: [
              { name: 'Sunday Service', participants: 285 },
              { name: 'Bible Study', participants: 95 },
              { name: 'Youth Group', participants: 65 },
              { name: 'Community Outreach', participants: 45 },
              { name: 'Prayer Meeting', participants: 30 }
            ]
          },
          demographicBreakdown: {
            ageGroups: [
              { group: '0-12', percentage: 15 },
              { group: '13-18', percentage: 12 },
              { group: '19-29', percentage: 18 },
              { group: '30-45', percentage: 25 },
              { group: '46-65', percentage: 20 },
              { group: '65+', percentage: 10 }
            ],
            genderRatio: { male: 45, female: 55 }
          }
        };
        
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              <FiFilter className="mr-2" /> 
              {timeRange === 'week' ? 'This Week' : 
               timeRange === 'month' ? 'This Month' : 
               timeRange === 'quarter' ? 'This Quarter' : 'This Year'}
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden">
              <div className="py-1">
                <button 
                  onClick={() => handleTimeRangeChange('week')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  This Week
                </button>
                <button 
                  onClick={() => handleTimeRangeChange('month')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  This Month
                </button>
                <button 
                  onClick={() => handleTimeRangeChange('quarter')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  This Quarter
                </button>
                <button 
                  onClick={() => handleTimeRangeChange('year')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  This Year
                </button>
              </div>
            </div>
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FiDownload className="mr-2" /> Export
          </button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FiUsers className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Members</p>
              <h3 className="text-xl font-bold text-gray-900">{analyticsData.membershipGrowth.total}</h3>
              <p className="text-sm text-green-600">
                <span className="font-medium">+{analyticsData.membershipGrowth.change}%</span> from last period
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiCalendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Attendance</p>
              <h3 className="text-xl font-bold text-gray-900">{analyticsData.attendanceTrend.average}</h3>
              <p className="text-sm text-green-600">
                <span className="font-medium">+{analyticsData.attendanceTrend.change}%</span> from last period
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FiTrendingUp className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">New Members</p>
              <h3 className="text-xl font-bold text-gray-900">{analyticsData.membershipGrowth.newMembers}</h3>
              <p className="text-sm text-green-600">
                <span className="font-medium">This {timeRange}</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FiBarChart2 className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Giving</p>
              <h3 className="text-xl font-bold text-gray-900">${analyticsData.givingAnalytics.average}</h3>
              <p className="text-sm text-green-600">
                <span className="font-medium">+{analyticsData.givingAnalytics.change}%</span> from last period
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trend</h2>
          <div className="h-64 flex items-end space-x-2">
            {analyticsData.attendanceTrend.data.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${(value / Math.max(...analyticsData.attendanceTrend.data)) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Giving Trend</h2>
          <div className="h-64 flex items-end space-x-2">
            {analyticsData.givingAnalytics.data.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-green-500 rounded-t"
                  style={{ height: `${(value / Math.max(...analyticsData.givingAnalytics.data)) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Participation</h2>
          <div className="space-y-4">
            {analyticsData.eventParticipation.topEvents.map((event, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{event.name}</span>
                  <span className="text-sm font-medium text-gray-700">{event.participants}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(event.participants / analyticsData.attendanceTrend.average) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Demographic Breakdown</h2>
          <div className="mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-2">Age Groups</h3>
            <div className="flex h-8 rounded-md overflow-hidden">
              {analyticsData.demographicBreakdown.ageGroups.map((age, index) => (
                <div 
                  key={index}
                  className="h-full flex items-center justify-center text-xs text-white font-medium"
                  style={{ 
                    width: `${age.percentage}%`,
                    backgroundColor: `hsl(${index * 60}, 70%, 60%)`
                  }}
                >
                  {age.percentage > 5 ? `${age.group}` : ''}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {analyticsData.demographicBreakdown.ageGroups.map((age, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-1"
                    style={{ backgroundColor: `hsl(${index * 60}, 70%, 60%)` }}
                  ></div>
                  <span className="text-xs text-gray-500">{age.group}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Gender Ratio</h3>
            <div className="flex h-8 rounded-md overflow-hidden">
              <div 
                className="h-full bg-blue-500 flex items-center justify-center text-xs text-white font-medium"
                style={{ width: `${analyticsData.demographicBreakdown.genderRatio.male}%` }}
              >
                Male {analyticsData.demographicBreakdown.genderRatio.male}%
              </div>
              <div 
                className="h-full bg-pink-500 flex items-center justify-center text-xs text-white font-medium"
                style={{ width: `${analyticsData.demographicBreakdown.genderRatio.female}%` }}
              >
                Female {analyticsData.demographicBreakdown.genderRatio.female}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 