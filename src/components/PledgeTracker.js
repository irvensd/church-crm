import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave, FaPlus, FaTrash, FaCheck, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

const PledgeTracker = ({ members, onClose, onSave, existingPledges = [] }) => {
  const [pledges, setPledges] = useState(existingPledges);
  const [newPledge, setNewPledge] = useState({
    memberId: '',
    amount: '',
    campaign: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    frequency: 'one-time',
    status: 'active',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([
    'Building Fund', 
    'Mission Trip', 
    'Annual Giving', 
    'Youth Ministry',
    'Community Outreach'
  ]);
  const [newCampaign, setNewCampaign] = useState('');
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [filterCampaign, setFilterCampaign] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPledge({
      ...newPledge,
      [name]: value,
    });
  };

  const handleAddCampaign = () => {
    if (newCampaign.trim() && !campaigns.includes(newCampaign.trim())) {
      setCampaigns([...campaigns, newCampaign.trim()]);
      setNewPledge({
        ...newPledge,
        campaign: newCampaign.trim(),
      });
      setNewCampaign('');
      setShowAddCampaign(false);
    }
  };

  const handleAddPledge = () => {
    if (!newPledge.memberId) {
      alert('Please select a member');
      return;
    }

    if (!newPledge.amount || isNaN(newPledge.amount) || parseFloat(newPledge.amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!newPledge.campaign) {
      alert('Please select or enter a campaign');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const selectedMember = members.find(m => m.id.toString() === newPledge.memberId.toString());
      
      const pledgeEntry = {
        id: Date.now(),
        memberId: newPledge.memberId,
        memberName: selectedMember.name,
        amount: parseFloat(newPledge.amount),
        campaign: newPledge.campaign,
        startDate: newPledge.startDate,
        endDate: newPledge.endDate || null,
        frequency: newPledge.frequency,
        status: newPledge.status,
        notes: newPledge.notes,
        amountPaid: 0,
        lastPaymentDate: null,
      };

      const updatedPledges = [...pledges, pledgeEntry];
      setPledges(updatedPledges);
      
      // Reset form
      setNewPledge({
        memberId: '',
        amount: '',
        campaign: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        frequency: 'one-time',
        status: 'active',
        notes: '',
      });
      
      setIsLoading(false);
      
      // Notify parent component
      onSave(updatedPledges);
    }, 500);
  };

  const handleDeletePledge = (pledgeId) => {
    if (window.confirm('Are you sure you want to delete this pledge?')) {
      const updatedPledges = pledges.filter(pledge => pledge.id !== pledgeId);
      setPledges(updatedPledges);
      onSave(updatedPledges);
    }
  };

  const handleUpdatePledgeStatus = (pledgeId, newStatus) => {
    const updatedPledges = pledges.map(pledge => 
      pledge.id === pledgeId ? { ...pledge, status: newStatus } : pledge
    );
    setPledges(updatedPledges);
    onSave(updatedPledges);
  };

  const handleRecordPayment = (pledgeId, paymentAmount) => {
    if (isNaN(paymentAmount) || parseFloat(paymentAmount) <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }

    const updatedPledges = pledges.map(pledge => {
      if (pledge.id === pledgeId) {
        const newAmountPaid = (pledge.amountPaid || 0) + parseFloat(paymentAmount);
        const newStatus = newAmountPaid >= pledge.amount ? 'fulfilled' : pledge.status;
        
        return {
          ...pledge,
          amountPaid: newAmountPaid,
          lastPaymentDate: new Date().toISOString().split('T')[0],
          status: newStatus,
        };
      }
      return pledge;
    });

    setPledges(updatedPledges);
    onSave(updatedPledges);
  };

  // Filter pledges based on selected filters
  const filteredPledges = pledges.filter(pledge => {
    const matchesCampaign = !filterCampaign || pledge.campaign === filterCampaign;
    const matchesStatus = !filterStatus || pledge.status === filterStatus;
    return matchesCampaign && matchesStatus;
  });

  // Calculate campaign totals
  const campaignTotals = campaigns.map(campaign => {
    const campaignPledges = pledges.filter(p => p.campaign === campaign);
    const totalPledged = campaignPledges.reduce((sum, p) => sum + p.amount, 0);
    const totalPaid = campaignPledges.reduce((sum, p) => sum + (p.amountPaid || 0), 0);
    
    return {
      name: campaign,
      totalPledged,
      totalPaid,
      count: campaignPledges.length,
    };
  }).filter(c => c.count > 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Pledge Tracker</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Pledged</p>
              <p className="text-2xl font-bold">${pledges.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Received</p>
              <p className="text-2xl font-bold">${pledges.reduce((sum, p) => sum + (p.amountPaid || 0), 0).toLocaleString()}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Active Pledges</p>
              <p className="text-2xl font-bold">{pledges.filter(p => p.status === 'active').length}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-medium mb-4">Add New Pledge</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member</label>
                <select
                  name="memberId"
                  value={newPledge.memberId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select Member --</option>
                  {members.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                <input
                  type="number"
                  name="amount"
                  value={newPledge.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign</label>
                {showAddCampaign ? (
                  <div className="flex">
                    <input
                      type="text"
                      value={newCampaign}
                      onChange={(e) => setNewCampaign(e.target.value)}
                      placeholder="Enter new campaign name"
                      className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleAddCampaign}
                      disabled={!newCampaign.trim()}
                      className="px-3 py-2 bg-green-500 text-white rounded-r-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    <select
                      name="campaign"
                      value={newPledge.campaign}
                      onChange={handleInputChange}
                      className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Select Campaign --</option>
                      {campaigns.map(campaign => (
                        <option key={campaign} value={campaign}>{campaign}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => setShowAddCampaign(true)}
                      className="px-3 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
                    >
                      New
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select
                  name="frequency"
                  value={newPledge.frequency}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="one-time">One-time</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={newPledge.startDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
                <input
                  type="date"
                  name="endDate"
                  value={newPledge.endDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={newPledge.notes}
                onChange={handleInputChange}
                rows="2"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddPledge}
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FaPlus className="mr-2" />
                )}
                Add Pledge
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Campaign Summary</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pledges</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Pledged</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Received</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaignTotals.map((campaign, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{campaign.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{campaign.count}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${campaign.totalPledged.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${campaign.totalPaid.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${Math.min(100, (campaign.totalPaid / campaign.totalPledged) * 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {Math.round((campaign.totalPaid / campaign.totalPledged) * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Pledge List</h3>
              <div className="flex space-x-4">
                <select
                  value={filterCampaign}
                  onChange={(e) => setFilterCampaign(e.target.value)}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Campaigns</option>
                  {campaigns.map(campaign => (
                    <option key={campaign} value={campaign}>{campaign}</option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="fulfilled">Fulfilled</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            
            {filteredPledges.length > 0 ? (
              <div className="space-y-4">
                {filteredPledges.map(pledge => (
                  <div key={pledge.id} className="border rounded-lg overflow-hidden">
                    <div className={`p-4 ${
                      pledge.status === 'active' ? 'bg-blue-50' : 
                      pledge.status === 'fulfilled' ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{pledge.memberName}</h4>
                          <div className="text-sm text-gray-600">{pledge.campaign}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">${pledge.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">{pledge.frequency}</div>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Started: {new Date(pledge.startDate).toLocaleDateString()}
                          {pledge.endDate && ` • Ends: ${new Date(pledge.endDate).toLocaleDateString()}`}
                        </div>
                        <div className={`px-2 py-1 text-xs rounded-full ${
                          pledge.status === 'active' ? 'bg-blue-100 text-blue-800' : 
                          pledge.status === 'fulfilled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {pledge.status.charAt(0).toUpperCase() + pledge.status.slice(1)}
                        </div>
                      </div>
                      {pledge.amountPaid > 0 && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${Math.min(100, (pledge.amountPaid / pledge.amount) * 100)}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>${pledge.amountPaid.toLocaleString()} paid</span>
                            <span>{Math.round((pledge.amountPaid / pledge.amount) * 100)}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4 bg-white">
                      {pledge.notes && (
                        <div className="mb-3 text-sm text-gray-600">
                          <div className="font-medium mb-1">Notes:</div>
                          <p>{pledge.notes}</p>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          {pledge.status === 'active' && (
                            <>
                              <button
                                onClick={() => {
                                  const amount = prompt('Enter payment amount:');
                                  if (amount) handleRecordPayment(pledge.id, amount);
                                }}
                                className="flex items-center px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                              >
                                <FaMoneyBillWave className="mr-1" />
                                Record Payment
                              </button>
                              <button
                                onClick={() => handleUpdatePledgeStatus(pledge.id, 'fulfilled')}
                                className="flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                              >
                                <FaCheck className="mr-1" />
                                Mark Fulfilled
                              </button>
                              <button
                                onClick={() => handleUpdatePledgeStatus(pledge.id, 'cancelled')}
                                className="flex items-center px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeletePledge(pledge.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 border rounded-lg">
                <FaChartLine className="mx-auto text-4xl mb-2" />
                <p>No pledges found with the selected filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PledgeTracker; 