import React, { useState, useEffect } from 'react';
import { FiX, FiCheck, FiDollarSign, FiUser, FiCalendar, FiTag, FiCreditCard, FiRepeat, FiFileText } from 'react-icons/fi';
import { generateDummyMembers } from '../utils/dummyData';

const DonationForm = ({ donation, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    donor: { name: '', email: '' },
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'tithe',
    method: 'cash',
    recurring: false,
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMemberSearch, setShowMemberSearch] = useState(false);

  // Donation categories
  const categories = [
    { id: 'tithe', name: 'Tithe' },
    { id: 'offering', name: 'General Offering' },
    { id: 'missions', name: 'Missions' },
    { id: 'building', name: 'Building Fund' },
    { id: 'youth', name: 'Youth Ministry' },
    { id: 'children', name: 'Children\'s Ministry' },
    { id: 'benevolence', name: 'Benevolence Fund' },
    { id: 'special', name: 'Special Offering' },
    { id: 'other', name: 'Other' }
  ];

  // Payment methods
  const paymentMethods = [
    { id: 'cash', name: 'Cash' },
    { id: 'check', name: 'Check' },
    { id: 'credit', name: 'Credit Card' },
    { id: 'debit', name: 'Debit Card' },
    { id: 'online', name: 'Online Payment' },
    { id: 'bank', name: 'Bank Transfer' },
    { id: 'text', name: 'Text-to-Give' },
    { id: 'app', name: 'Mobile App' }
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'donorName' || name === 'donorEmail') {
      setFormData({
        ...formData,
        donor: {
          ...formData.donor,
          [name === 'donorName' ? 'name' : 'email']: value
        }
      });
    } else if (name === 'amount') {
      // Only allow numbers and decimal point
      const regex = /^[0-9]*\.?[0-9]*$/;
      if (value === '' || regex.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle donor selection
  const handleSelectDonor = (member) => {
    setFormData({
      ...formData,
      donor: {
        id: member.id,
        name: member.name,
        email: member.email
      }
    });
    setShowMemberSearch(false);
  };

  // Filter members based on search query
  const filteredMembers = members.filter(member => {
    if (!searchQuery) return true;
    
    return (
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    
    if (!formData.donor.id) {
      newErrors.donor = 'Please select a donor';
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
        amount: parseFloat(formData.amount)
      };
      
      // Call the save function
      onSave(processedData);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
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
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Donor Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Donor Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="text"
                name="donorName"
                value={formData.donor.name}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter donor name"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Donor Email
            </label>
            <input
              type="email"
              name="donorEmail"
              value={formData.donor.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter donor email"
              required
            />
          </div>
          
          {/* Amount */}
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
                min="0.01"
                step="0.01"
                required
              />
            </div>
          </div>
          
          {/* Date */}
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
          
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiTag className="text-gray-400" />
              </div>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCreditCard className="text-gray-400" />
              </div>
              <select
                name="method"
                value={formData.method}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                {paymentMethods.map(method => (
                  <option key={method.id} value={method.id}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Recurring */}
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
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {donation ? 'Update Donation' : 'Add Donation'}
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
              
              <div className="overflow-y-auto max-h-[50vh]">
                <ul className="divide-y divide-gray-200">
                  {filteredMembers.map(member => (
                    <li 
                      key={member.id}
                      className="p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleSelectDonor(member)}
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          {member.photoUrl ? (
                            <img src={member.photoUrl} alt={member.name} className="h-10 w-10 rounded-full" />
                          ) : (
                            <FiUser className="text-gray-500" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationForm; 