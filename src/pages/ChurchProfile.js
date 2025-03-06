import React, { useState } from 'react';
import { FiCheck, FiX, FiArrowRight, FiArrowUp, FiArrowDown, FiCreditCard } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

function ChurchProfile() {
  const [churchData, setChurchData] = useState({
    name: 'Grace Community Church',
    address: '123 Faith Street, Cityville, ST 12345',
    phone: '(555) 123-4567',
    email: 'info@gracecommunity.org',
    website: 'www.gracecommunity.org',
    mission: 'To love God, love people, and make disciples of Jesus Christ.',
    vision: 'To be a vibrant community of believers transforming our city through the gospel.',
    pastorName: 'Pastor John Smith',
    foundingYear: '1985',
  });
  
  const [logoUrl, setLogoUrl] = useState('https://placehold.co/400x200?text=Church+Logo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [currentPlan, setCurrentPlan] = useState('Premium'); // Options: 'Basic', 'Standard', 'Premium'
  const [activeTab, setActiveTab] = useState('profile'); // Options: 'profile', 'plan'
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingPlanChange, setPendingPlanChange] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: churchData
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChurchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    if (e.target.files[0]) {
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(e.target.files[0]);
      setLogoUrl(previewUrl);
    }
  };

  const onSubmit = (data) => {
    setChurchData(data);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const isFeatureAvailable = (feature) => {
    switch (feature) {
      case 'member-management':
      case 'events-calendar':
      case 'basic-communication':
      case 'email-support':
        return true; // Available on all plans
      case 'financial-management':
      case 'advanced-reporting':
      case 'email-campaigns':
        return currentPlan === 'Standard' || currentPlan === 'Premium';
      case 'pastoral-tools':
      case 'api-access':
      case 'dedicated-support':
        return currentPlan === 'Premium';
      default:
        return false;
    }
  };

  const handlePlanChange = (newPlan) => {
    setPendingPlanChange(newPlan);
    setShowConfirmDialog(true);
  };

  const confirmPlanChange = () => {
    if (pendingPlanChange) {
      setCurrentPlan(pendingPlanChange);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
    setShowConfirmDialog(false);
  };

  const cancelPlanChange = () => {
    setPendingPlanChange(null);
    setShowConfirmDialog(false);
  };

  console.log("Rendering ChurchProfile component");

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Church Profile</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'profile' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Profile Information
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'plan' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('plan')}
        >
          Subscription Plan
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <span className="font-bold">Success!</span> Your changes have been saved.
        </div>
      )}
      
      {/* Profile Information Tab */}
      {activeTab === 'profile' && (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Church Name
                  </label>
                  <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                    id="name"
                    type="text"
                    name="name"
                    value={churchData.name}
                    onChange={handleInputChange}
                    {...register("name", { required: "Church name is required" })}
                  />
                  {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    Address
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address"
                    type="text"
                    name="address"
                    value={churchData.address}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="tel"
                    name="phone"
                    value={churchData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={churchData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
                    Website
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="website"
                    type="url"
                    name="website"
                    value={churchData.website}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Church Logo
                  </label>
                  <div className="mb-2">
                    <img
                      src={logoUrl}
                      alt="Church Logo"
                      className="max-w-full max-h-40 object-contain"
                    />
                  </div>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mission">
                    Mission Statement
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="mission"
                    name="mission"
                    rows="3"
                    value={churchData.mission}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vision">
                    Vision Statement
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="vision"
                    name="vision"
                    rows="3"
                    value={churchData.vision}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pastorName">
                    Pastor's Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="pastorName"
                    type="text"
                    name="pastorName"
                    value={churchData.pastorName}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foundingYear">
                    Founding Year
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="foundingYear"
                    type="number"
                    name="foundingYear"
                    value={churchData.foundingYear}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
          
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Preview</h3>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="flex items-center mb-6">
                <img
                  src={logoUrl}
                  alt="Church Logo"
                  className="w-24 h-24 object-contain mr-6"
                />
                <div>
                  <h2 className="text-xl font-bold">{churchData.name}</h2>
                  <p className="text-gray-700">{churchData.address}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold mb-2">Contact Information</h4>
                  <p className="mb-1"><span className="font-bold">Phone:</span> {churchData.phone}</p>
                  <p className="mb-1"><span className="font-bold">Email:</span> {churchData.email}</p>
                  <p className="mb-1"><span className="font-bold">Website:</span> {churchData.website}</p>
                  <p className="mb-1"><span className="font-bold">Pastor:</span> {churchData.pastorName}</p>
                  <p className="mb-1"><span className="font-bold">Founded:</span> {churchData.foundingYear}</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Mission</h4>
                  <p className="mb-4">{churchData.mission}</p>
                  <h4 className="text-lg font-bold mb-2">Vision</h4>
                  <p>{churchData.vision}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Subscription Plan Tab */}
      {activeTab === 'plan' && (
        <div>
          {/* Current Plan Summary */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Current Plan</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentPlan === 'Premium' ? 'bg-purple-100 text-purple-800' : 
                currentPlan === 'Standard' ? 'bg-blue-100 text-blue-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {currentPlan}
              </span>
            </div>
            
            <div className="mt-4">
              <p className="text-gray-600">
                Your {currentPlan} plan renews on {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}.
              </p>
              <p className="text-gray-600 mt-2">
                Monthly billing: ${currentPlan === 'Premium' ? '149' : currentPlan === 'Standard' ? '79' : '49'}/month
              </p>
            </div>
          </div>
          
          {/* Available Plans */}
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Plans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Basic Plan */}
            <div className={`bg-white rounded-lg shadow p-6 border-2 ${currentPlan === 'Basic' ? 'border-green-500' : 'border-transparent'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Basic</h3>
                <span className="text-2xl font-bold text-gray-900">$49</span>
              </div>
              <p className="text-gray-600 mb-4">Perfect for small churches just getting started.</p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>Up to 200 members</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>Member management</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>Event calendar</span>
                </li>
                <li className="flex items-center">
                  <FiX className="text-red-500 mr-2" />
                  <span className="text-gray-400">Financial management</span>
                </li>
                <li className="flex items-center">
                  <FiX className="text-red-500 mr-2" />
                  <span className="text-gray-400">Pastoral care tools</span>
                </li>
              </ul>
              
              {currentPlan === 'Basic' ? (
                <button className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-medium" disabled>
                  Current Plan
                </button>
              ) : (
                <button 
                  onClick={() => handlePlanChange('Basic')}
                  className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 flex items-center justify-center"
                >
                  <FiArrowDown className="mr-2" /> Downgrade
                </button>
              )}
            </div>
            
            {/* Standard Plan */}
            <div className={`bg-white rounded-lg shadow p-6 border-2 ${currentPlan === 'Standard' ? 'border-blue-500' : 'border-transparent'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Standard</h3>
                <span className="text-2xl font-bold text-gray-900">$79</span>
              </div>
              <p className="text-gray-600 mb-4">Great for growing churches with more needs.</p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>Up to 500 members</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>All Basic features</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>Financial management</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>Advanced reporting</span>
                </li>
                <li className="flex items-center">
                  <FiX className="text-red-500 mr-2" />
                  <span className="text-gray-400">Pastoral care tools</span>
                </li>
              </ul>
              
              {currentPlan === 'Standard' ? (
                <button className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-medium" disabled>
                  Current Plan
                </button>
              ) : currentPlan === 'Basic' ? (
                <button 
                  onClick={() => handlePlanChange('Standard')}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 flex items-center justify-center"
                >
                  <FiArrowUp className="mr-2" /> Upgrade
                </button>
              ) : (
                <button 
                  onClick={() => handlePlanChange('Standard')}
                  className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 flex items-center justify-center"
                >
                  <FiArrowDown className="mr-2" /> Downgrade
                </button>
              )}
            </div>
            
            {/* Premium Plan */}
            <div className={`bg-white rounded-lg shadow p-6 border-2 ${currentPlan === 'Premium' ? 'border-purple-500' : 'border-transparent'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Premium</h3>
                <span className="text-2xl font-bold text-gray-900">$149</span>
              </div>
              <p className="text-gray-600 mb-4">For larger churches with comprehensive needs.</p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>Unlimited members</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>All Standard features</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>Pastoral care tools</span>
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" />
                  <span>Dedicated support</span>
                </li>
              </ul>
              
              {currentPlan === 'Premium' ? (
                <button className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md font-medium" disabled>
                  Current Plan
                </button>
              ) : (
                <button 
                  onClick={() => handlePlanChange('Premium')}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 flex items-center justify-center"
                >
                  <FiArrowUp className="mr-2" /> Upgrade
                </button>
              )}
            </div>
          </div>
          
          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Information</h2>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <FiCreditCard className="text-gray-500 mr-3 text-xl" />
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-gray-500">Expires 12/2025</p>
              </div>
              <button className="ml-auto text-blue-600 hover:text-blue-800 text-sm font-medium">
                Update
              </button>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Billing History</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 1, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$149.00</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                        <a href="#">View</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 1, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$149.00</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                        <a href="#">View</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mar 1, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$149.00</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                        <a href="#">View</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Change Plan</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to change to the {pendingPlanChange} plan?
                </p>
              </div>
              <div className="flex justify-center gap-4 mt-3">
                <button
                  onClick={cancelPlanChange}
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPlanChange}
                  className="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChurchProfile;
