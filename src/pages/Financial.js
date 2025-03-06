import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiPieChart, FiDownload, FiPlus, FiFilter, FiCalendar, FiSearch, FiChevronDown, FiChevronUp, FiCreditCard, FiUser, FiFileText, FiCheckCircle, FiX, FiEdit, FiTrash2, FiUpload, FiRefreshCw, FiPrinter, FiArrowUpRight, FiArrowDownRight, FiUsers } from 'react-icons/fi';
import { generateDummyDonations, generateDummyExpenses, generateDummyBudgets } from '../utils/dummyFinancial';
import DonationForm from '../components/DonationForm';
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
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'donations', 'expenses', 'budgets', 'reports', 'import'
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dateRange, setDateRange] = useState('month'); // 'week', 'month', 'quarter', 'year'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showRecurringOnly, setShowRecurringOnly] = useState(false);
  const [showPledgeTracker, setShowPledgeTracker] = useState(false);
  
  // Import & Migration state variables
  const [importSource, setImportSource] = useState('csv'); // 'csv', 'excel', 'quickbooks', 'churchtools', 'other'
  const [importFile, setImportFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState('idle'); // 'idle', 'uploading', 'mapping', 'processing', 'complete', 'error'
  const [mappedFields, setMappedFields] = useState({});

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
    
    const prevTotalTithes = prevMonthTithes;
    const prevTotalOfferings = prevMonthOfferings;
    const prevTotalExpenses = prevMonthExpenses;
    
    // Calculate percentage changes
    const titheChange = prevTotalTithes === 0 ? 100 : ((totalTithes - prevTotalTithes) / prevTotalTithes) * 100;
    const offeringChange = prevTotalOfferings === 0 ? 100 : ((totalOfferings - prevTotalOfferings) / prevTotalOfferings) * 100;
    const expenseChange = prevTotalExpenses === 0 ? 100 : ((totalExpenses - prevTotalExpenses) / prevTotalExpenses) * 100;
    
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

  // Get filtered donations based on search and category
  const getFilteredDonations = () => {
    return donations.filter(donation => {
      const matchesSearch = 
        donation.donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || donation.category === filterCategory;
      const matchesRecurring = showRecurringOnly ? donation.recurring : true;
      
      return matchesSearch && matchesCategory && matchesRecurring;
    });
  };

  // Get filtered expenses based on search and category
  const getFilteredExpenses = () => {
    return expenses.filter(expense => {
      const matchesSearch = 
        expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.payee.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
      
      return matchesSearch && matchesCategory;
    });
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
    
    // Convert to array and sort to prioritize tithes and offerings
    let result = Object.entries(categories).map(([name, amount]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: amount
    }));
    
    // Sort to ensure tithes and offerings appear first
    result.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      
      if (nameA === 'tithe') return -1;
      if (nameB === 'tithe') return 1;
      if (nameA === 'offering') return -1;
      if (nameB === 'offering') return 1;
      
      return b.value - a.value; // Otherwise sort by amount descending
    });
    
    return result;
  };

  // Get expense categories with totals
  const getExpenseCategories = () => {
    const categories = {};
    
    expenses.forEach(expense => {
      if (!categories[expense.category]) {
        categories[expense.category] = 0;
      }
      categories[expense.category] += expense.amount;
    });
    
    return Object.entries(categories).map(([name, amount]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: amount
    }));
  };

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
      
      const totalTithes = monthTithes;
      const totalOfferings = monthOfferings;
      const totalExpenses = monthExpenses;
      
      data.push({
        name: months[i],
        tithes: totalTithes,
        offerings: totalOfferings,
        expenses: totalExpenses,
        net: totalTithes + totalOfferings - totalExpenses
      });
    }
    
    return data;
  };

  // Get top donors
  const getTopDonors = () => {
    const donors = {};
    
    donations.forEach(donation => {
      const donorName = donation.donor.name;
      if (!donors[donorName]) {
        donors[donorName] = {
          name: donorName,
          email: donation.donor.email,
          totalAmount: 0,
          count: 0
        };
      }
      donors[donorName].totalAmount += donation.amount;
      donors[donorName].count += 1;
    });
    
    return Object.values(donors)
      .sort((a, b) => b.totalAmount - a.totalAmount)
      .slice(0, 5);
  };

  // Handle adding a new donation
  const handleAddDonation = () => {
    setSelectedItem(null);
    setShowDonationForm(true);
  };

  // Handle editing a donation
  const handleEditDonation = (donation) => {
    setSelectedItem(donation);
    setShowDonationForm(true);
  };

  // Handle deleting a donation
  const handleDeleteDonation = (donationId) => {
    setDonations(donations.filter(donation => donation.id !== donationId));
  };

  // Handle saving a donation
  const handleSaveDonation = (donationData) => {
    if (donationData.id) {
      // Update existing donation
      setDonations(donations.map(donation => 
        donation.id === donationData.id ? donationData : donation
      ));
    } else {
      // Add new donation with generated ID
      const newDonation = {
        ...donationData,
        id: `donation-${Date.now()}`
      };
      setDonations([newDonation, ...donations]);
    }
    
    setShowDonationForm(false);
  };

  // Handle adding a new expense
  const handleAddExpense = () => {
    setSelectedItem(null);
    setShowExpenseForm(true);
  };

  // Handle editing an expense
  const handleEditExpense = (expense) => {
    setSelectedItem(expense);
    setShowExpenseForm(true);
  };

  // Handle deleting an expense
  const handleDeleteExpense = (expenseId) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseId));
  };

  // Handle saving an expense
  const handleSaveExpense = (expenseData) => {
    if (expenseData.id) {
      // Update existing expense
      setExpenses(expenses.map(expense => 
        expense.id === expenseData.id ? expenseData : expense
      ));
    } else {
      // Add new expense with generated ID
      const newExpense = {
        ...expenseData,
        id: `expense-${Date.now()}`
      };
      setExpenses([newExpense, ...expenses]);
    }
    
    setShowExpenseForm(false);
  };

  // Handle adding a new budget
  const handleAddBudget = () => {
    setSelectedItem(null);
    setShowBudgetForm(true);
  };

  // Handle saving a budget
  const handleSaveBudget = (budgetData) => {
    if (budgetData.id) {
      // Update existing budget
      setBudgets(budgets.map(budget => 
        budget.id === budgetData.id ? budgetData : budget
      ));
    } else {
      // Add new budget with generated ID
      const newBudget = {
        ...budgetData,
        id: `budget-${Date.now()}`
      };
      setBudgets([...budgets, newBudget]);
    }
    
    setShowBudgetForm(false);
  };

  // Handle deleting a budget
  const handleDeleteBudget = (budgetId) => {
    setBudgets(budgets.filter(budget => budget.id !== budgetId));
  };

  // Calculate total budget
  const calculateTotalBudget = () => {
    return budgets.reduce((total, budget) => total + budget.annualAmount, 0);
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

  // Calculate summary for the overview tab
  const summary = calculateSummary();

  // Calculate total income, expenses, and net income for reports
  const totalIncome = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netIncome = totalIncome - totalExpenses;

  // Add this for the page actions
  const pageActions = (
    <>
      {activeTab === 'donations' && (
        <button
          onClick={handleAddDonation}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FiPlus className="mr-2" /> Add Tithe/Offering
        </button>
      )}
      
      {activeTab === 'expenses' && (
        <button
          onClick={handleAddExpense}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FiPlus className="mr-2" /> Add Expense
        </button>
      )}
      
      {activeTab === 'budgets' && (
        <button
          onClick={handleAddBudget}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FiPlus className="mr-2" /> Add Budget
        </button>
      )}
    </>
  );

  // Handle file upload for import
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImportFile(file);
      setImportStatus('uploading');
      
      // Simulate file upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setImportProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setImportStatus('mapping');
        }
      }, 300);
    }
  };
  
  // Handle import source change
  const handleImportSourceChange = (source) => {
    setImportSource(source);
    setImportFile(null);
    setImportProgress(0);
    setImportStatus('idle');
    setMappedFields({});
  };
  
  // Process import
  const processImport = () => {
    setImportStatus('processing');
    
    // Simulate processing
    setTimeout(() => {
      // For demo purposes, we'll just add some dummy data
      if (importSource === 'csv' || importSource === 'excel') {
        const newDonations = [
          {
            id: `imported-${Date.now()}-1`,
            donor: { name: 'Imported Donor 1', email: 'donor1@example.com' },
            amount: 250,
            date: new Date().toISOString(),
            category: 'tithe',
            method: 'check',
            recurring: false,
            notes: 'Imported from CSV'
          },
          {
            id: `imported-${Date.now()}-2`,
            donor: { name: 'Imported Donor 2', email: 'donor2@example.com' },
            amount: 500,
            date: new Date().toISOString(),
            category: 'offering',
            method: 'online',
            recurring: true,
            notes: 'Imported from CSV'
          }
        ];
        
        setDonations([...newDonations, ...donations]);
      }
      
      setImportStatus('complete');
    }, 2000);
  };
  
  // Reset import
  const resetImport = () => {
    setImportFile(null);
    setImportProgress(0);
    setImportStatus('idle');
    setMappedFields({});
  };

  // Generate monthly income data for reports
  const generateMonthlyIncomeData = () => {
    const currentYear = new Date().getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Group donations by month
    const monthlyData = Array(12).fill(0);
    
    donations.forEach(donation => {
      const donationDate = new Date(donation.date);
      if (donationDate.getFullYear() === currentYear) {
        const month = donationDate.getMonth();
        monthlyData[month] += donation.amount;
      }
    });
    
    return months.map((month, index) => ({
      name: month,
      income: monthlyData[index]
    }));
  };

  // Generate monthly expense data for reports
  const generateMonthlyExpenseData = () => {
    const currentYear = new Date().getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Group expenses by month
    const monthlyData = Array(12).fill(0);
    
    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      if (expenseDate.getFullYear() === currentYear) {
        const month = expenseDate.getMonth();
        monthlyData[month] += expense.amount;
      }
    });
    
    return months.map((month, index) => ({
      name: month,
      expenses: monthlyData[index]
    }));
  };

  // Generate combined income and expense data
  const generateCombinedMonthlyData = () => {
    const incomeData = generateMonthlyIncomeData();
    const expenseData = generateMonthlyExpenseData();
    
    return incomeData.map((item, index) => ({
      name: item.name,
      income: item.income,
      expenses: expenseData[index].expenses,
      net: item.income - expenseData[index].expenses
    }));
  };

  // Calculate donation statistics by category
  const calculateDonationsByCategory = () => {
    const categories = {};
    
    donations.forEach(donation => {
      if (!categories[donation.category]) {
        categories[donation.category] = 0;
      }
      categories[donation.category] += donation.amount;
    });
    
    return Object.entries(categories).map(([category, amount]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: amount
    }));
  };

  // Calculate expense statistics by category
  const calculateExpensesByCategory = () => {
    const categories = {};
    
    expenses.forEach(expense => {
      if (!categories[expense.category]) {
        categories[expense.category] = 0;
      }
      categories[expense.category] += expense.amount;
    });
    
    return Object.entries(categories).map(([category, amount]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: amount
    }));
  };

  // Calculate top donors
  const calculateTopDonors = () => {
    const donorMap = {};
    
    donations.forEach(donation => {
      const donorId = donation.donorId;
      if (!donorMap[donorId]) {
        donorMap[donorId] = {
          id: donorId,
          name: donation.donorName,
          total: 0,
          count: 0
        };
      }
      donorMap[donorId].total += donation.amount;
      donorMap[donorId].count += 1;
    });
    
    return Object.values(donorMap)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  };

  return (
    <PageLayout 
      title="Financial Management" 
      subtitle="Track donations, expenses, and manage your church's finances"
      actions={pageActions}
    >
      {/* Tabs Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('donations')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'donations'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tithes & Offerings
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'expenses'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setActiveTab('budgets')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'budgets'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Budgets
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reports'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Reports
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'import'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Import & Migrate
          </button>
        </nav>
      </div>
      
      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Financial Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Tithes */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <FiDollarSign className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Total Tithes</h3>
                      <div className="flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900">{formatCurrency(summary.totalTithes || 0)}</p>
                        <p className={`ml-2 text-sm ${summary.titheChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <span className="flex items-center">
                            {summary.titheChange >= 0 ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
                            {Math.abs(summary.titheChange || 0).toFixed(1)}%
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Total Offerings */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <FiDollarSign className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Total Offerings</h3>
                      <div className="flex items-baseline">
                        <p className="text-2xl font-semibold text-gray-900">{formatCurrency(summary.totalOfferings || 0)}</p>
                        <p className={`ml-2 text-sm ${summary.offeringChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <span className="flex items-center">
                            {summary.offeringChange >= 0 ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
                            {Math.abs(summary.offeringChange || 0).toFixed(1)}%
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Net Income */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${summary.netIncome >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      <FiDollarSign className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Net Income</h3>
                      <p className={`text-2xl font-semibold ${summary.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(summary.netIncome)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Income vs Expenses */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Income vs Expenses</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getMonthlyData()}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
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
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Giving Categories</h3>
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
                            <Cell key={`cell-${index}`} fill={
                              entry.name.toLowerCase() === 'tithe' ? '#0088FE' : 
                              entry.name.toLowerCase() === 'offering' ? '#00C49F' : 
                              COLORS[index % COLORS.length]} />
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
          
          {/* Reports Tab */}
          {activeTab === 'reports' && !isLoading && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Financial Reports</h2>
                <div className="flex items-center space-x-2">
                  <select 
                    className="border rounded-md px-3 py-2"
                    value={new Date().getFullYear()}
                  >
                    <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                    <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                    <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
                  </select>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <FiPrinter className="mr-2" /> Print Report
                  </button>
                </div>
              </div>
              
              {/* Financial Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <FiArrowUpRight className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
                      <p className="text-2xl font-semibold text-gray-900">{formatCurrency(totalIncome)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-red-100 text-red-600">
                      <FiArrowDownRight className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
                      <p className="text-2xl font-semibold text-gray-900">{formatCurrency(totalExpenses)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full ${netIncome >= 0 ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                      <FiDollarSign className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Net Income</h3>
                      <p className={`text-2xl font-semibold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(netIncome)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                      <FiUsers className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Total Donors</h3>
                      <p className="text-2xl font-semibold text-gray-900">
                        {new Set(donations.map(d => d.donorId)).size}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Income vs Expenses Chart */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Income vs Expenses</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={generateCombinedMonthlyData()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="income" name="Income" fill="#4ade80" />
                      <Bar dataKey="expenses" name="Expenses" fill="#f87171" />
                      <Line type="monotone" dataKey="net" name="Net" stroke="#6366f1" strokeWidth={2} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Donation Categories and Expense Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium mb-4">Donation Categories</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={calculateDonationsByCategory()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {calculateDonationsByCategory().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-medium mb-4">Expense Categories</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={calculateExpensesByCategory()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {calculateExpensesByCategory().map((entry, index) => (
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
              
              {/* Top Donors */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-medium">Top Donors</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Donor
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Donated
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Number of Donations
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Average Donation
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {calculateTopDonors().map((donor) => (
                        <tr key={donor.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatCurrency(donor.total)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{donor.count}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatCurrency(donor.total / donor.count)}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Monthly Breakdown */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-medium">Monthly Financial Breakdown</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Month
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Income
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expenses
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Net
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {generateCombinedMonthlyData().map((item) => (
                        <tr key={item.name} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-green-600">{formatCurrency(item.income)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-red-600">{formatCurrency(item.expenses)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${item.net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(item.net)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Import & Migrate Tab */}
          {activeTab === 'import' && !isLoading && (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Import & Migrate Financial Data</h2>
                <p className="text-gray-600 mb-6">
                  Easily import your financial data from other systems or spreadsheets. We support various formats to make your transition to Congrevia as smooth as possible.
                </p>
                
                {/* Import Source Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Select Import Source</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => handleImportSourceChange('csv')}
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        importSource === 'csv' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <FiFileText size={32} className={importSource === 'csv' ? 'text-blue-500' : 'text-gray-400'} />
                      <span className="mt-2 font-medium">CSV File</span>
                      <span className="text-xs text-gray-500 mt-1">Import from comma-separated values</span>
                    </button>
                    
                    <button
                      onClick={() => handleImportSourceChange('excel')}
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        importSource === 'excel' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <FiFileText size={32} className={importSource === 'excel' ? 'text-blue-500' : 'text-gray-400'} />
                      <span className="mt-2 font-medium">Excel File</span>
                      <span className="text-xs text-gray-500 mt-1">Import from Excel spreadsheets</span>
                    </button>
                    
                    <button
                      onClick={() => handleImportSourceChange('quickbooks')}
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        importSource === 'quickbooks' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <FiDollarSign size={32} className={importSource === 'quickbooks' ? 'text-blue-500' : 'text-gray-400'} />
                      <span className="mt-2 font-medium">QuickBooks</span>
                      <span className="text-xs text-gray-500 mt-1">Import from QuickBooks export</span>
                    </button>
                  </div>
                </div>
                
                {/* File Upload Section */}
                {importStatus === 'idle' && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FiUpload size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Your File</h3>
                    <p className="text-gray-500 mb-4">
                      {importSource === 'csv' && 'Upload a CSV file with your donation and financial records.'}
                      {importSource === 'excel' && 'Upload an Excel file with your donation and financial records.'}
                      {importSource === 'quickbooks' && 'Upload a QuickBooks export file.'}
                    </p>
                    <input
                      type="file"
                      id="fileUpload"
                      className="hidden"
                      accept={
                        importSource === 'csv' ? '.csv' :
                        importSource === 'excel' ? '.xlsx,.xls' :
                        '.csv,.xlsx,.xls,.txt,.json'
                      }
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="fileUpload"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                    >
                      <FiUpload className="mr-2" /> Select File
                    </label>
                    <p className="text-xs text-gray-500 mt-4">
                      Maximum file size: 10MB. {
                        importSource === 'csv' ? 'Supported format: .csv' :
                        importSource === 'excel' ? 'Supported formats: .xlsx, .xls' :
                        'Supported formats: .csv, .xlsx, .xls, .txt, .json'
                      }
                    </p>
                  </div>
                )}
                
                {/* Upload Progress */}
                {importStatus === 'uploading' && (
                  <div className="border rounded-lg p-8">
                    <h3 className="text-lg font-medium mb-4">Uploading File</h3>
                    <p className="text-gray-500 mb-2">
                      {importFile && importFile.name}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${importProgress}%` }}></div>
                    </div>
                    <p className="text-sm text-gray-500">{importProgress}% complete</p>
                  </div>
                )}
                
                {/* Processing */}
                {importStatus === 'mapping' && (
                  <div className="border rounded-lg p-8 text-center">
                    <h3 className="text-lg font-medium mb-4">Map Your Data Fields</h3>
                    <p className="text-gray-500 mb-6">
                      We've detected your file format. Click below to continue with the import process.
                    </p>
                    <button
                      onClick={processImport}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Continue Import
                    </button>
                  </div>
                )}
                
                {/* Processing */}
                {importStatus === 'processing' && (
                  <div className="border rounded-lg p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h3 className="text-lg font-medium mb-2">Processing Your Data</h3>
                    <p className="text-gray-500">
                      Please wait while we process and import your financial data...
                    </p>
                  </div>
                )}
                
                {/* Complete */}
                {importStatus === 'complete' && (
                  <div className="border rounded-lg p-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle size={24} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Import Complete!</h3>
                    <p className="text-gray-500 mb-6">
                      Your financial data has been successfully imported into Congrevia.
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={resetImport}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Import Another File
                      </button>
                      <button
                        onClick={() => setActiveTab('donations')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        View Imported Data
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Migration Assistance */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Need Help Migrating?</h2>
                <p className="text-gray-600 mb-6">
                  Our team can help you migrate your financial data from any system. We offer personalized assistance to ensure a smooth transition.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-2">Free Migration Consultation</h3>
                    <p className="text-gray-500 mb-4">
                      Schedule a call with our migration specialists to discuss your specific needs and get personalized guidance.
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Schedule Consultation
                    </button>
                  </div>
                  
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-2">Full-Service Migration</h3>
                    <p className="text-gray-500 mb-4">
                      Let our experts handle the entire migration process for you, ensuring all your historical data is properly transferred.
                    </p>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      Request Full-Service Migration
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* Donation Form Modal */}
      {showDonationForm && (
        <DonationForm 
          donation={selectedItem} 
          onSave={handleSaveDonation} 
          onCancel={() => setShowDonationForm(false)} 
        />
      )}
      
      {/* Expense Form Modal */}
      {showExpenseForm && (
        <ExpenseForm 
          expense={selectedItem} 
          onSave={handleSaveExpense} 
          onCancel={() => setShowExpenseForm(false)} 
        />
      )}
      
      {/* Budget Form Modal */}
      {showBudgetForm && (
        <BudgetForm 
          budget={selectedItem} 
          onSave={handleSaveBudget} 
          onCancel={() => setShowBudgetForm(false)} 
        />
      )}
    </PageLayout>
  );
};

export default Financial; 