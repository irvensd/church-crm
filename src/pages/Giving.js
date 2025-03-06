import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiPieChart, FiTrendingUp, FiCalendar, FiDownload } from 'react-icons/fi';
import { CardSkeleton, TableSkeleton } from '../components/SkeletonLoader';

const Giving = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [givingData, setGivingData] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch giving data
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const data = {
          totalGiving: 125750.00,
          monthlyGiving: 15250.00,
          yearlyGrowth: 8.5,
          recentTransactions: [
            { id: 1, donor: 'John Smith', amount: 250.00, date: '2023-05-15', fund: 'General Fund' },
            { id: 2, donor: 'Sarah Johnson', amount: 1000.00, date: '2023-05-14', fund: 'Building Fund' },
            { id: 3, donor: 'Michael Brown', amount: 75.00, date: '2023-05-13', fund: 'Missions' },
            { id: 4, donor: 'Emily Davis', amount: 150.00, date: '2023-05-12', fund: 'General Fund' },
            { id: 5, donor: 'Robert Wilson', amount: 500.00, date: '2023-05-11', fund: 'Youth Ministry' },
          ],
          fundBreakdown: [
            { fund: 'General Fund', amount: 85000.00, percentage: 67.6 },
            { fund: 'Building Fund', amount: 25000.00, percentage: 19.9 },
            { fund: 'Missions', amount: 8750.00, percentage: 7.0 },
            { fund: 'Youth Ministry', amount: 4500.00, percentage: 3.6 },
            { fund: 'Benevolence', amount: 2500.00, percentage: 1.9 },
          ]
        };
        
        setGivingData(data);
      } catch (error) {
        console.error('Error fetching giving data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Giving</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <TableSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Giving</h1>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FiCalendar className="mr-2" /> Filter by Date
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FiDownload className="mr-2" /> Export
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FiDollarSign className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Giving (YTD)</p>
              <h3 className="text-xl font-bold text-gray-900">${givingData.totalGiving.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiDollarSign className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Monthly Giving</p>
              <h3 className="text-xl font-bold text-gray-900">${givingData.monthlyGiving.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FiTrendingUp className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Yearly Growth</p>
              <h3 className="text-xl font-bold text-gray-900">{givingData.yearlyGrowth}%</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow mb-8 overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {givingData.recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.donor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.fund}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Fund Breakdown */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Fund Breakdown</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {givingData.fundBreakdown.map((fund, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{fund.fund}</span>
                  <span className="text-sm font-medium text-gray-700">${fund.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${fund.percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{fund.percentage}%</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-8 border-blue-100 flex items-center justify-center">
              <FiPieChart className="h-24 w-24 text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Giving; 