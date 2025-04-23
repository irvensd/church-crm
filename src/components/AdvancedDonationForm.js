import React, { useState, useEffect } from 'react';
import { FiX, FiCheck, FiDollarSign, FiUser, FiCalendar, FiTag, FiCreditCard, FiRepeat, FiFileText, FiGift, FiPercent, FiLock, FiPlus } from 'react-icons/fi';
import { generateDummyMembers } from '../utils/dummyData';

const AdvancedDonationForm = ({ donation, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    donor: { name: '', email: '', memberId: '' },
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'tithe',
    method: 'cash',
    recurring: false,
    notes: '',
    // New fields
    pledgeAmount: '',
    pledgeFrequency: 'monthly',
    taxDeductible: true,
    designation: '',
    paymentProcessor: 'stripe',
    receiptEmail: true,
    anonymous: false,
    matchingGift: false,
    matchingCompany: '',
    campaign: '',
    event: '',
    fund: 'general',
    splitDonation: false,
    splits: []
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMemberSearch, setShowMemberSearch] = useState(false);

  // Enhanced donation categories
  const categories = [
    { id: 'tithe', name: 'Tithe', description: 'Regular tithe (10% of income)' },
    { id: 'offering', name: 'General Offering', description: 'General church offering' },
    { id: 'missions', name: 'Missions', description: 'Support for missions work' },
    { id: 'building', name: 'Building Fund', description: 'Church building and maintenance' },
    { id: 'youth', name: 'Youth Ministry', description: 'Youth programs and activities' },
    { id: 'children', name: 'Children\'s Ministry', description: 'Children\'s programs and activities' },
    { id: 'benevolence', name: 'Benevolence Fund', description: 'Helping those in need' },
    { id: 'special', name: 'Special Offering', description: 'Special events and projects' },
    { id: 'other', name: 'Other', description: 'Other designated giving' }
  ];

  // Enhanced payment methods
  const paymentMethods = [
    { id: 'cash', name: 'Cash', requiresProcessing: true },
    { id: 'check', name: 'Check', requiresProcessing: true },
    { id: 'credit', name: 'Credit Card', requiresProcessing: false },
    { id: 'debit', name: 'Debit Card', requiresProcessing: false },
    { id: 'online', name: 'Online Payment', requiresProcessing: false },
    { id: 'bank', name: 'Bank Transfer', requiresProcessing: true },
    { id: 'text', name: 'Text-to-Give', requiresProcessing: false },
    { id: 'app', name: 'Mobile App', requiresProcessing: false },
    { id: 'crypto', name: 'Cryptocurrency', requiresProcessing: false }
  ];

  // Payment processors
  const paymentProcessors = [
    { id: 'stripe', name: 'Stripe', supportsRecurring: true },
    { id: 'paypal', name: 'PayPal', supportsRecurring: true },
    { id: 'square', name: 'Square', supportsRecurring: true },
    { id: 'venmo', name: 'Venmo', supportsRecurring: false },
    { id: 'cashapp', name: 'Cash App', supportsRecurring: false }
  ];

  // Pledge frequencies
  const pledgeFrequencies = [
    { id: 'weekly', name: 'Weekly' },
    { id: 'biweekly', name: 'Bi-weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'quarterly', name: 'Quarterly' },
    { id: 'annually', name: 'Annually' }
  ];

  // Funds
  const funds = [
    { id: 'general', name: 'General Fund' },
    { id: 'missions', name: 'Missions Fund' },
    { id: 'building', name: 'Building Fund' },
    { id: 'youth', name: 'Youth Fund' },
    { id: 'benevolence', name: 'Benevolence Fund' }
  ];

  // Load members for donor selection
  useEffect(() => {
    setMembers(generateDummyMembers());
  }, []);

  // Initialize form with donation data if editing
  useEffect(() => {
    if (donation) {
      setFormData({
        ...donation,
        date: new Date(donation.date).toISOString().split('T')[0]
      });
    }
  }, [donation]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle donor selection
  const handleDonorSelect = (member) => {
    setFormData(prev => ({
      ...prev,
      donor: {
        name: member.name,
        email: member.email,
        memberId: member.id
      }
    }));
    setShowMemberSearch(false);
  };

  // Handle split donation changes
  const handleSplitChange = (index, field, value) => {
    const newSplits = [...formData.splits];
    newSplits[index] = {
      ...newSplits[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      splits: newSplits
    }));
  };

  // Add a new split
  const addSplit = () => {
    setFormData(prev => ({
      ...prev,
      splits: [...prev.splits, { fund: '', amount: '', percentage: '' }]
    }));
  };

  // Remove a split
  const removeSplit = (index) => {
    setFormData(prev => ({
      ...prev,
      splits: prev.splits.filter((_, i) => i !== index)
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.donor.name) {
      newErrors.donorName = 'Donor name is required';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    if (formData.splitDonation && formData.splits.length === 0) {
      newErrors.splits = 'At least one split is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Convert amount to number
      const processedData = {
        ...formData,
        amount: parseFloat(formData.amount),
        splits: formData.splits.map(split => ({
          ...split,
          amount: parseFloat(split.amount),
          percentage: parseFloat(split.percentage)
        }))
      };
      
      // Call the save function
      onSave(processedData);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {donation ? 'Edit Donation' : 'Add New Donation'}
          </h2>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Donor Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donor Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="donorName"
                  value={formData.donor.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    donor: { ...prev.donor, name: e.target.value }
                  }))}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter donor name"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowMemberSearch(true)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              </div>
              {errors.donorName && (
                <p className="mt-1 text-sm text-red-600">{errors.donorName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donor Email
              </label>
              <input
                type="email"
                name="donorEmail"
                value={formData.donor.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  donor: { ...prev.donor, email: e.target.value }
                }))}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter donor email"
                required
              />
            </div>
          </div>
          
          {/* Amount and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Payment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <select
                name="method"
                value={formData.method}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {paymentMethods.map(method => (
                  <option key={method.id} value={method.id}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Processor
              </label>
              <select
                name="paymentProcessor"
                value={formData.paymentProcessor}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {paymentProcessors.map(processor => (
                  <option key={processor.id} value={processor.id}>
                    {processor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Date and Recurring Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-400" />
                </div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="recurring"
                  name="recurring"
                  type="checkbox"
                  checked={formData.recurring}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="recurring" className="ml-2 block text-sm text-gray-900">
                  Recurring Donation
                </label>
              </div>
              
              {formData.recurring && (
                <div className="mt-2">
                  <select
                    name="pledgeFrequency"
                    value={formData.pledgeFrequency}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    {pledgeFrequencies.map(frequency => (
                      <option key={frequency.id} value={frequency.id}>
                        {frequency.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          
          {/* Split Donation */}
          <div>
            <div className="flex items-center mb-2">
              <input
                id="splitDonation"
                name="splitDonation"
                type="checkbox"
                checked={formData.splitDonation}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="splitDonation" className="ml-2 block text-sm text-gray-900">
                Split Donation
              </label>
            </div>
            
            {formData.splitDonation && (
              <div className="space-y-4">
                {formData.splits.map((split, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fund
                      </label>
                      <select
                        value={split.fund}
                        onChange={(e) => handleSplitChange(index, 'fund', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        {funds.map(fund => (
                          <option key={fund.id} value={fund.id}>
                            {fund.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount
                      </label>
                      <input
                        type="number"
                        value={split.amount}
                        onChange={(e) => handleSplitChange(index, 'amount', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    
                    <div className="flex items-end space-x-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Percentage
                        </label>
                        <input
                          type="number"
                          value={split.percentage}
                          onChange={(e) => handleSplitChange(index, 'percentage', e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="0"
                          min="0"
                          max="100"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSplit(index)}
                        className="px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        <FiX className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addSplit}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiPlus className="mr-2 h-4 w-4" />
                  Add Split
                </button>
              </div>
            )}
          </div>
          
          {/* Additional Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="taxDeductible"
                  name="taxDeductible"
                  type="checkbox"
                  checked={formData.taxDeductible}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="taxDeductible" className="ml-2 block text-sm text-gray-900">
                  Tax Deductible
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="receiptEmail"
                  name="receiptEmail"
                  type="checkbox"
                  checked={formData.receiptEmail}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="receiptEmail" className="ml-2 block text-sm text-gray-900">
                  Send Receipt via Email
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="anonymous"
                  name="anonymous"
                  type="checkbox"
                  checked={formData.anonymous}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-900">
                  Anonymous Donation
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="matchingGift"
                  name="matchingGift"
                  type="checkbox"
                  checked={formData.matchingGift}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="matchingGift" className="ml-2 block text-sm text-gray-900">
                  Matching Gift
                </label>
              </div>
              
              {formData.matchingGift && (
                <div>
                  <input
                    type="text"
                    name="matchingCompany"
                    value={formData.matchingCompany}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Matching Company Name"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
                <FiFileText className="text-gray-400" />
              </div>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Add any additional notes..."
              ></textarea>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Saving...' : (donation ? 'Update Donation' : 'Add Donation')}
            </button>
          </div>
        </form>
        
        {/* Member Search Modal */}
        {showMemberSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-medium">Select Donor</h3>
                <button 
                  onClick={() => setShowMemberSearch(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX />
                </button>
              </div>
              
              <div className="p-4 border-b">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="Search members..."
                />
              </div>
              
              <div className="overflow-y-auto max-h-[60vh]">
                {members
                  .filter(member => 
                    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    member.email.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map(member => (
                    <div
                      key={member.id}
                      onClick={() => handleDonorSelect(member)}
                      className="p-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedDonationForm; 