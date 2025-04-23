import React, { useState, useEffect } from 'react';
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiPieChart, 
  FiDownload, 
  FiPlus, 
  FiFilter, 
  FiCalendar, 
  FiSearch, 
  FiCreditCard, 
  FiUser, 
  FiFileText, 
  FiCheckCircle, 
  FiX, 
  FiEdit, 
  FiTrash2, 
  FiUpload, 
  FiRefreshCw, 
  FiPrinter, 
  FiArrowUpRight, 
  FiArrowDownRight, 
  FiUsers,
  FiHome,
  FiBriefcase,
  FiGift,
  FiBarChart2
} from 'react-icons/fi';
import { generateDummyDonations, generateDummyExpenses, generateDummyBudgets } from '../utils/dummyFinancial';
import AdvancedDonationForm from '../components/AdvancedDonationForm';
import ExpenseForm from '../components/ExpenseForm';
import BudgetForm from '../components/BudgetForm';
import PageLayout from '../components/PageLayout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend, CartesianGrid } from 'recharts';

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#8DD1E1'];

const Financial = () => {
  const [donations, setDonations] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'donations', 'expenses', 'budgets', 'reports'
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dateRange, setDateRange] = useState('month'); // 'week', 'month', 'quarter', 'year'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showRecurringOnly, setShowRecurringOnly] = useState(false);

  // Load dummy data
  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setDonations(generateDummyDonations());
      setExpenses(generateDummyExpenses());
      setBudgets(generateDummyBudgets());
      setIsLoading(false);
    }, 1000);
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate financial summary
  const calculateSummary = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    // Filter donations for current month
    const monthlyDonations = donations.filter(donation => {
      const donationDate = new Date(donation.date);
      return donationDate.getMonth() === currentMonth && donationDate.getFullYear() === currentYear;
    });
    
    // Filter expenses for current month
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
    
    // Calculate totals
    const totalTithes = monthlyDonations.filter(donation => donation.category === 'tithe').reduce((sum, donation) => sum + donation.amount, 0);
    const totalOfferings = monthlyDonations.filter(donation => donation.category === 'offering').reduce((sum, donation) => sum + donation.amount, 0);
    const totalExpenses = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netIncome = totalTithes + totalOfferings - totalExpenses;
    
    // Calculate previous month totals for comparison
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    const prevMonthTithes = donations.filter(donation => {
      const donationDate = new Date(donation.date);
      return donationDate.getMonth() === prevMonth && donationDate.getFullYear() === prevYear && donation.category === 'tithe';
    }).reduce((sum, donation) => sum + donation.amount, 0);
    
    const prevMonthOfferings = donations.filter(donation => {
      const donationDate = new Date(donation.date);
      return donationDate.getMonth() === prevMonth && donationDate.getFullYear() === prevYear && donation.category === 'offering';
    }).reduce((sum, donation) => sum + donation.amount, 0);
    
    const prevMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === prevMonth && expenseDate.getFullYear() === prevYear;
    }).reduce((sum, expense) => sum + expense.amount, 0);
    
    // Calculate percentage changes
    const titheChange = prevMonthTithes === 0 ? 100 : ((totalTithes - prevMonthTithes) / prevMonthTithes) * 100;
    const offeringChange = prevMonthOfferings === 0 ? 100 : ((totalOfferings - prevMonthOfferings) / prevMonthOfferings) * 100;
    const expenseChange = prevMonthExpenses === 0 ? 100 : ((totalExpenses - prevMonthExpenses) / prevMonthExpenses) * 100;
    
    return {
      totalTithes,
      totalOfferings,
      totalExpenses,
      netIncome,
      titheChange,
      offeringChange,
      expenseChange
    };
  };

  // Quick Actions
  const quickActions = [
    {
      title: 'Record Tithe',
      icon: <FiHome className="h-6 w-6" />,
      action: () => {
        setActiveTab('overview');
        setShowDonationForm(true);
      },
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Add Expense',
      icon: <FiBriefcase className="h-6 w-6" />,
      action: () => {
        setActiveTab('overview');
        setShowExpenseForm(true);
      },
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'View Reports',
      icon: <FiBarChart2 className="h-6 w-6" />,
      action: () => setActiveTab('reports'),
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Manage Budget',
      icon: <FiGift className="h-6 w-6" />,
      action: () => setActiveTab('budgets'),
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  // Get monthly financial data for charts
  const getMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [];
    
    const currentYear = new Date().getFullYear();
    
    for (let i = 0; i < 12; i++) {
      const monthTithes = donations.filter(donation => {
        const date = new Date(donation.date);
        return date.getMonth() === i && date.getFullYear() === currentYear && donation.category === 'tithe';
      }).reduce((sum, donation) => sum + donation.amount, 0);
      
      const monthOfferings = donations.filter(donation => {
        const date = new Date(donation.date);
        return date.getMonth() === i && date.getFullYear() === currentYear && donation.category === 'offering';
      }).reduce((sum, donation) => sum + donation.amount, 0);
      
      const monthExpenses = expenses.filter(expense => {
        const date = new Date(expense.date);
        return date.getMonth() === i && date.getFullYear() === currentYear;
      }).reduce((sum, expense) => sum + expense.amount, 0);
      
      data.push({
        name: months[i],
        tithes: monthTithes,
        offerings: monthOfferings,
        expenses: monthExpenses
      });
    }
    
    return data;
  };

  // Get donation categories with totals
  const getDonationCategories = () => {
    const categories = {};
    
    donations.forEach(donation => {
      if (!categories[donation.category]) {
        categories[donation.category] = 0;
      }
      categories[donation.category] += donation.amount;
    });
    
    return Object.entries(categories).map(([name, amount]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: amount
    }));
  };

  // Handle deleting a budget
  const handleDeleteBudget = (budgetId) => {
    setBudgets(budgets.filter(budget => budget.id !== budgetId));
  };

  // Calculate budget vs actual spending
  const calculateBudgetVsActual = () => {
    const result = [];
    
    // Group expenses by category
    const expensesByCategory = {};
    expenses.forEach(expense => {
      if (!expensesByCategory[expense.category]) {
        expensesByCategory[expense.category] = 0;
      }
      expensesByCategory[expense.category] += expense.amount;
    });
    
    // Calculate budget vs actual for each category
    budgets.forEach(budget => {
      const actual = expensesByCategory[budget.category] || 0;
      const remaining = budget.annualAmount - actual;
      const percentUsed = (actual / budget.annualAmount) * 100;
      
      result.push({
        category: budget.category,
        budgeted: budget.annualAmount,
        actual,
        remaining,
        percentUsed
      });
    });
    
    return result;
  };

  return (
    <PageLayout 
      title="Financial Management" 
      subtitle="Track tithes, offerings, and expenses"
    >
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`flex items-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${action.color}`}
          >
            <div className="mr-4">
              {action.icon}
            </div>
            <div className="text-left">
              <h3 className="font-medium">{action.title}</h3>
              <p className="text-sm text-gray-600">Click to get started</p>
            </div>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Financial Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Financial Overview</h2>
              <div className="flex items-center space-x-2">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border rounded-md px-3 py-2"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Tithes */}
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Total Tithes</h3>
                    <p className="text-2xl font-semibold text-gray-900">{formatCurrency(calculateSummary().totalTithes)}</p>
                  </div>
                  <div className={`p-3 rounded-full ${calculateSummary().titheChange >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {calculateSummary().titheChange >= 0 ? <FiTrendingUp className="h-6 w-6" /> : <FiTrendingDown className="h-6 w-6" />}
                  </div>
                </div>
                <p className={`text-sm mt-2 ${calculateSummary().titheChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(calculateSummary().titheChange).toFixed(1)}% from last period
                </p>
              </div>

              {/* Total Offerings */}
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Total Offerings</h3>
                    <p className="text-2xl font-semibold text-gray-900">{formatCurrency(calculateSummary().totalOfferings)}</p>
                  </div>
                  <div className={`p-3 rounded-full ${calculateSummary().offeringChange >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {calculateSummary().offeringChange >= 0 ? <FiTrendingUp className="h-6 w-6" /> : <FiTrendingDown className="h-6 w-6" />}
                  </div>
                </div>
                <p className={`text-sm mt-2 ${calculateSummary().offeringChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(calculateSummary().offeringChange).toFixed(1)}% from last period
                </p>
              </div>

              {/* Net Income */}
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Net Income</h3>
                    <p className={`text-2xl font-semibold ${calculateSummary().netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(calculateSummary().netIncome)}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${calculateSummary().netIncome >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {calculateSummary().netIncome >= 0 ? <FiTrendingUp className="h-6 w-6" /> : <FiTrendingDown className="h-6 w-6" />}
                  </div>
                </div>
                <p className={`text-sm mt-2 ${calculateSummary().netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {calculateSummary().netIncome >= 0 ? 'Positive' : 'Negative'} balance
                </p>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border rounded-md px-3 py-2"
                />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="border rounded-md px-3 py-2"
                >
                  <option value="all">All Categories</option>
                  <option value="tithe">Tithes</option>
                  <option value="offering">Offerings</option>
                  <option value="expense">Expenses</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...donations, ...expenses]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 10)
                    .map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(transaction.date)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{transaction.description || transaction.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.category === 'tithe' ? 'bg-blue-100 text-blue-800' :
                            transaction.category === 'offering' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {transaction.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${
                            transaction.category === 'expense' ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {formatCurrency(transaction.amount)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Financial Reports</h2>
            <div className="flex items-center space-x-2">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
              <button
                onClick={() => window.print()}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <FiPrinter className="mr-2" /> Print Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Income vs Expenses Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Income vs Expenses</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getMonthlyData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <Bar dataKey="tithes" name="Tithes" fill="#8884d8" />
                    <Bar dataKey="offerings" name="Offerings" fill="#82ca9d" />
                    <Bar dataKey="expenses" name="Expenses" fill="#8DD1E1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Donation Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4">Giving Categories</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getDonationCategories()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {getDonationCategories().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budgets Tab */}
      {activeTab === 'budgets' && (
        <div className="space-y-6">
          {/* Budget Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Total Budget</h3>
                <FiDollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-3xl font-semibold text-gray-900">
                {formatCurrency(budgets.reduce((sum, budget) => sum + budget.annualAmount, 0))}
              </p>
              <p className="text-sm text-gray-500 mt-2">Annual budget allocation</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Spent</h3>
                <FiTrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-3xl font-semibold text-gray-900">
                {formatCurrency(expenses.reduce((sum, expense) => sum + expense.amount, 0))}
              </p>
              <p className="text-sm text-gray-500 mt-2">Total expenses this year</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Remaining</h3>
                <FiTrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-3xl font-semibold text-gray-900">
                {formatCurrency(
                  budgets.reduce((sum, budget) => sum + budget.annualAmount, 0) -
                  expenses.reduce((sum, expense) => sum + expense.amount, 0)
                )}
              </p>
              <p className="text-sm text-gray-500 mt-2">Available budget</p>
            </div>
          </div>

          {/* Budget Management */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Budget Categories</h2>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    setShowBudgetForm(true);
                  }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FiPlus className="mr-2" />
                  Add Budget
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Annual Budget
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Spent
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remaining
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {budgets.map((budget) => {
                    const spent = expenses
                      .filter(expense => expense.category === budget.category)
                      .reduce((sum, expense) => sum + expense.amount, 0);
                    const remaining = budget.annualAmount - spent;
                    const percentUsed = (spent / budget.annualAmount) * 100;

                    return (
                      <tr key={budget.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{budget.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(budget.annualAmount)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatCurrency(spent)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${remaining < 0 ? 'text-red-600' : 'text-gray-900'}`}>
                            {formatCurrency(remaining)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${
                                percentUsed > 90 ? 'bg-red-600' : percentUsed > 75 ? 'bg-yellow-500' : 'bg-green-600'
                              }`}
                              style={{ width: `${Math.min(percentUsed, 100)}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{Math.round(percentUsed)}% used</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => {
                              setSelectedItem(budget);
                              setShowBudgetForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBudget(budget.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Budget vs Actual Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Budget vs Actual Spending</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={calculateBudgetVsActual()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="budgeted" name="Budgeted" fill="#8884d8" />
                  <Bar dataKey="actual" name="Actual" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Donation Form Modal */}
      {showDonationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Record New Donation</h2>
              <button onClick={() => setShowDonationForm(false)} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <AdvancedDonationForm 
                onSave={(donationData) => {
                  setDonations([...donations, { ...donationData, id: Date.now() }]);
                  setShowDonationForm(false);
                }}
                onCancel={() => setShowDonationForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Add New Expense</h2>
              <button onClick={() => setShowExpenseForm(false)} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <ExpenseForm 
                onSave={(expenseData) => {
                  setExpenses([...expenses, { ...expenseData, id: Date.now() }]);
                  setShowExpenseForm(false);
                }}
                onCancel={() => setShowExpenseForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Budget Form Modal */}
      {showBudgetForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                {selectedItem ? 'Edit Budget' : 'Add New Budget'}
              </h2>
              <button onClick={() => setShowBudgetForm(false)} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>
            <div className="p-6">
              <BudgetForm 
                budget={selectedItem}
                onSave={(budgetData) => {
                  if (budgetData.id) {
                    setBudgets(budgets.map(budget => 
                      budget.id === budgetData.id ? budgetData : budget
                    ));
                  } else {
                    setBudgets([...budgets, { ...budgetData, id: Date.now() }]);
                  }
                  setShowBudgetForm(false);
                  setSelectedItem(null);
                }}
                onCancel={() => {
                  setShowBudgetForm(false);
                  setSelectedItem(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Financial; 