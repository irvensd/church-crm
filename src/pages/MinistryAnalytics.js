import React, { useState } from 'react';
import { 
  FiBarChart2,
  FiTrendingUp,
  FiUsers,
  FiHeart,
  FiTarget,
  FiCalendar,
  FiPieChart,
  FiActivity,
  FiAward,
  FiDownload
} from 'react-icons/fi';
import PageLayout from '../components/PageLayout';

const MinistryAnalytics = () => {
  const [timeRange, setTimeRange] = useState('last12months');
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for ministry metrics
  const [ministryMetrics] = useState({
    attendance: {
      current: 450,
      previous: 420,
      trend: '+7.1%',
      breakdown: {
        adults: 280,
        youth: 95,
        children: 75
      },
      history: [
        { month: 'Jan', count: 420 },
        { month: 'Feb', count: 425 },
        { month: 'Mar', count: 435 },
        { month: 'Apr', count: 440 },
        { month: 'May', count: 445 },
        { month: 'Jun', count: 450 }
      ]
    },
    engagement: {
      smallGroups: {
        participation: '65%',
        totalGroups: 24,
        averageAttendance: 12
      },
      volunteers: {
        active: 120,
        newThisMonth: 8,
        departments: {
          worship: 25,
          children: 30,
          hospitality: 35,
          technical: 15,
          other: 15
        }
      },
      events: {
        upcoming: 12,
        averageAttendance: 85,
        satisfaction: '4.5/5'
      }
    },
    spiritualGrowth: {
      baptisms: {
        ytd: 28,
        trend: '+40%'
      },
      discipleship: {
        programParticipation: '45%',
        completionRate: '78%'
      },
      bibleStudy: {
        groupsActive: 18,
        averageAttendance: '70%'
      }
    },
    ministryHealth: {
      leadershipDevelopment: {
        activeLeaders: 45,
        inTraining: 12
      },
      memberRetention: {
        rate: '92%',
        risk: 15
      },
      satisfaction: {
        overall: '4.2/5',
        worship: '4.4/5',
        community: '4.1/5',
        teaching: '4.3/5'
      }
    }
  });

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FiUsers size={24} />
            </div>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {ministryMetrics.attendance.trend}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{ministryMetrics.attendance.current}</h3>
          <p className="text-gray-600 mt-1">Average Attendance</p>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Adults</span>
              <span className="font-medium">{ministryMetrics.attendance.breakdown.adults}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">Youth</span>
              <span className="font-medium">{ministryMetrics.attendance.breakdown.youth}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">Children</span>
              <span className="font-medium">{ministryMetrics.attendance.breakdown.children}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiHeart size={24} />
            </div>
            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{ministryMetrics.engagement.smallGroups.totalGroups}</h3>
          <p className="text-gray-600 mt-1">Small Groups</p>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Participation Rate</span>
              <span className="font-medium">{ministryMetrics.engagement.smallGroups.participation}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">Avg. Attendance</span>
              <span className="font-medium">{ministryMetrics.engagement.smallGroups.averageAttendance}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FiAward size={24} />
            </div>
            <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              YTD
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{ministryMetrics.spiritualGrowth.baptisms.ytd}</h3>
          <p className="text-gray-600 mt-1">Baptisms</p>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Growth Trend</span>
              <span className="font-medium">{ministryMetrics.spiritualGrowth.baptisms.trend}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">Discipleship Rate</span>
              <span className="font-medium">{ministryMetrics.spiritualGrowth.discipleship.programParticipation}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-amber-100 text-amber-600">
              <FiActivity size={24} />
            </div>
            <span className="text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{ministryMetrics.engagement.volunteers.active}</h3>
          <p className="text-gray-600 mt-1">Active Volunteers</p>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">New This Month</span>
              <span className="font-medium">{ministryMetrics.engagement.volunteers.newThisMonth}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">Departments</span>
              <span className="font-medium">{Object.keys(ministryMetrics.engagement.volunteers.departments).length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ministry Health */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Ministry Health Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Leadership Development</h4>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Active Leaders</span>
              <span className="font-medium">{ministryMetrics.ministryHealth.leadershipDevelopment.activeLeaders}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">In Training</span>
              <span className="font-medium">{ministryMetrics.ministryHealth.leadershipDevelopment.inTraining}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Member Retention</h4>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Retention Rate</span>
              <span className="font-medium">{ministryMetrics.ministryHealth.memberRetention.rate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">At Risk Members</span>
              <span className="font-medium">{ministryMetrics.ministryHealth.memberRetention.risk}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">Satisfaction Scores</h4>
            {Object.entries(ministryMetrics.ministryHealth.satisfaction).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-600 capitalize">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PageLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Ministry Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive insights into your ministry's health and growth</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="last3months">Last 3 Months</option>
              <option value="last6months">Last 6 Months</option>
              <option value="last12months">Last 12 Months</option>
              <option value="ytd">Year to Date</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FiDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`${
              activeTab === 'attendance'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Attendance
          </button>
          <button
            onClick={() => setActiveTab('engagement')}
            className={`${
              activeTab === 'engagement'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Engagement
          </button>
          <button
            onClick={() => setActiveTab('growth')}
            className={`${
              activeTab === 'growth'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Spiritual Growth
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      
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
