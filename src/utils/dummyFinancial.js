import { generateDummyMembers } from './dummyData';

// Generate dummy donations data
export const generateDummyDonations = () => {
  const donations = [];
  const categories = ['tithe', 'offering', 'missions', 'building', 'youth', 'other'];
  const methods = ['cash', 'check', 'credit', 'online', 'bank transfer'];
  const donors = [
    { name: 'John Smith', email: 'john.smith@example.com' },
    { name: 'Sarah Johnson', email: 'sarah.j@example.com' },
    { name: 'Michael Brown', email: 'mbrown@example.com' },
    { name: 'Emily Davis', email: 'emily.davis@example.com' },
    { name: 'David Wilson', email: 'dwilson@example.com' },
    { name: 'Jennifer Taylor', email: 'jtaylor@example.com' },
    { name: 'Robert Martinez', email: 'rmartinez@example.com' },
    { name: 'Lisa Anderson', email: 'landerson@example.com' },
    { name: 'James Thomas', email: 'jthomas@example.com' },
    { name: 'Patricia White', email: 'pwhite@example.com' }
  ];
  
  // Generate 50 random donations
  for (let i = 0; i < 50; i++) {
    const donor = donors[Math.floor(Math.random() * donors.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const method = methods[Math.floor(Math.random() * methods.length)];
    const amount = Math.floor(Math.random() * 1000) + 10; // Random amount between $10 and $1010
    const recurring = Math.random() > 0.7; // 30% chance of being recurring
    
    // Random date in the last 6 months
    const date = new Date();
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 6));
    date.setDate(Math.floor(Math.random() * 28) + 1);
    
    donations.push({
      id: `donation-${i}`,
      donor,
      amount,
      date: date.toISOString(),
      category,
      method,
      recurring,
      notes: recurring ? 'Monthly recurring donation' : ''
    });
  }
  
  return donations;
};

// Generate dummy expenses data
export const generateDummyExpenses = () => {
  const expenses = [];
  const categories = ['utilities', 'salaries', 'maintenance', 'supplies', 'events', 'missions', 'other'];
  const payees = [
    'Electric Company',
    'Water Services',
    'Internet Provider',
    'Office Supplies Inc.',
    'Building Maintenance Co.',
    'Staff Payroll',
    'Mission Trip Expenses',
    'Youth Camp',
    'Worship Equipment',
    'Cleaning Services'
  ];
  
  // Generate 50 random expenses
  for (let i = 0; i < 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const payee = payees[Math.floor(Math.random() * payees.length)];
    const amount = Math.floor(Math.random() * 2000) + 50; // Random amount between $50 and $2050
    
    // Random date in the last 6 months
    const date = new Date();
    date.setMonth(date.getMonth() - Math.floor(Math.random() * 6));
    date.setDate(Math.floor(Math.random() * 28) + 1);
    
    expenses.push({
      id: `expense-${i}`,
      description: `Payment to ${payee}`,
      amount,
      date: date.toISOString(),
      category,
      payee,
      notes: ''
    });
  }
  
  return expenses;
};

// Generate dummy budgets data
export const generateDummyBudgets = () => {
  const budgets = [];
  const categories = ['utilities', 'salaries', 'maintenance', 'supplies', 'events', 'missions', 'youth', 'worship'];
  
  // Generate budget items for each category
  categories.forEach((category, index) => {
    const annualAmount = (Math.floor(Math.random() * 50) + 10) * 1000; // Random amount between $10,000 and $60,000
    
    budgets.push({
      id: `budget-${index}`,
      category,
      annualAmount,
      monthlyAmount: annualAmount / 12,
      year: new Date().getFullYear(),
      notes: `Annual budget for ${category}`
    });
  });
  
  return budgets;
};

export default {
  generateDummyDonations,
  generateDummyExpenses,
  generateDummyBudgets
}; 