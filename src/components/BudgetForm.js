import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const BudgetForm = ({ budget, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    category: '',
    annualAmount: 0,
    monthlyAmount: 0,
    year: new Date().getFullYear(),
    notes: ''
  });

  const [errors, setErrors] = useState({});

  // Predefined budget categories
  const budgetCategories = [
    'utilities',
    'salaries',
    'maintenance',
    'missions',
    'ministry',
    'events',
    'education',
    'office supplies',
    'technology',
    'outreach',
    'worship',
    'youth',
    'children',
    'benevolence',
    'other'
  ];

  useEffect(() => {
    if (budget) {
      setFormData(budget);
    }
  }, [budget]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'annualAmount') {
      const annualAmount = parseFloat(value) || 0;
      setFormData({
        ...formData,
        annualAmount,
        monthlyAmount: annualAmount / 12
      });
    } else if (name === 'monthlyAmount') {
      const monthlyAmount = parseFloat(value) || 0;
      setFormData({
        ...formData,
        monthlyAmount,
        annualAmount: monthlyAmount * 12
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.annualAmount || formData.annualAmount <= 0) {
      newErrors.annualAmount = 'Annual amount must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {budget?.id ? 'Edit Budget' : 'Add New Budget'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              {budgetCategories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  name="annualAmount"
                  value={formData.annualAmount}
                  onChange={handleChange}
                  className={`w-full pl-7 pr-3 py-2 border rounded-md ${
                    errors.annualAmount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  step="0.01"
                  min="0"
                />
              </div>
              {errors.annualAmount && (
                <p className="mt-1 text-sm text-red-600">{errors.annualAmount}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input
                  type="number"
                  name="monthlyAmount"
                  value={formData.monthlyAmount.toFixed(2)}
                  onChange={handleChange}
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget Year
            </label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value={new Date().getFullYear() - 1}>
                {new Date().getFullYear() - 1}
              </option>
              <option value={new Date().getFullYear()}>
                {new Date().getFullYear()}
              </option>
              <option value={new Date().getFullYear() + 1}>
                {new Date().getFullYear() + 1}
              </option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Add any notes or details about this budget item..."
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              {budget?.id ? 'Update Budget' : 'Add Budget'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm; 