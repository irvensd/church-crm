import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaTrash, FaCheck, FaRegClock, FaUserPlus, FaArrowRight } from 'react-icons/fa';

const FollowUpWorkflow = ({ members, onClose, onSave }) => {
  const [workflowSteps, setWorkflowSteps] = useState([
    {
      id: 1,
      name: 'Welcome Email',
      description: 'Send automated welcome email when a new member joins',
      delay: 0,
      type: 'email',
      template: 'welcome_email',
      active: true
    },
    {
      id: 2,
      name: 'Follow-up Call',
      description: 'Schedule a call with the new member',
      delay: 3,
      type: 'task',
      assignee: 'pastor',
      active: true
    },
    {
      id: 3,
      name: 'Welcome Packet',
      description: 'Mail a welcome packet with church information',
      delay: 5,
      type: 'task',
      assignee: 'admin',
      active: true
    },
    {
      id: 4,
      name: 'Invite to Small Group',
      description: 'Send email inviting to join a small group',
      delay: 7,
      type: 'email',
      template: 'small_group_invite',
      active: true
    },
    {
      id: 5,
      name: 'Check-in Call',
      description: 'Call to check how they are settling in',
      delay: 14,
      type: 'task',
      assignee: 'staff',
      active: true
    }
  ]);

  const [newMembers, setNewMembers] = useState([]);
  const [activeWorkflows, setActiveWorkflows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Filter members who joined in the last 30 days
  useEffect(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recent = members.filter(member => {
      const joinDate = new Date(member.joinDate);
      return joinDate >= thirtyDaysAgo;
    }).sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate));
    
    setNewMembers(recent);
    
    // Simulate active workflows for demo purposes
    const workflows = recent.map(member => {
      const joinDate = new Date(member.joinDate);
      const daysSinceJoining = Math.floor((new Date() - joinDate) / (1000 * 60 * 60 * 24));
      
      const completedSteps = workflowSteps
        .filter(step => step.active && step.delay <= daysSinceJoining)
        .map(step => ({
          ...step,
          completed: Math.random() > 0.3, // Randomly mark some as completed for demo
          dueDate: new Date(joinDate.getTime() + step.delay * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }));
      
      const pendingSteps = workflowSteps
        .filter(step => step.active && step.delay > daysSinceJoining)
        .map(step => ({
          ...step,
          completed: false,
          dueDate: new Date(joinDate.getTime() + step.delay * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }));
      
      return {
        memberId: member.id,
        memberName: member.name,
        memberPhoto: member.photoUrl,
        joinDate: member.joinDate,
        steps: [...completedSteps, ...pendingSteps].sort((a, b) => a.delay - b.delay)
      };
    });
    
    setActiveWorkflows(workflows);
  }, [members, workflowSteps]);

  const handleEditStep = (step) => {
    setCurrentStep(step);
    setIsEditing(true);
  };

  const handleSaveStep = (e) => {
    e.preventDefault();
    
    if (currentStep.id) {
      // Update existing step
      setWorkflowSteps(workflowSteps.map(step => 
        step.id === currentStep.id ? currentStep : step
      ));
    } else {
      // Add new step
      const newId = Math.max(...workflowSteps.map(s => s.id), 0) + 1;
      setWorkflowSteps([...workflowSteps, { ...currentStep, id: newId }]);
    }
    
    setCurrentStep(null);
    setIsEditing(false);
  };

  const handleDeleteStep = (stepId) => {
    setWorkflowSteps(workflowSteps.filter(step => step.id !== stepId));
  };

  const handleAddStep = () => {
    setCurrentStep({
      name: '',
      description: '',
      delay: 1,
      type: 'email',
      template: '',
      assignee: '',
      active: true
    });
    setIsEditing(true);
  };

  const handleToggleActive = (stepId) => {
    setWorkflowSteps(workflowSteps.map(step => 
      step.id === stepId ? { ...step, active: !step.active } : step
    ));
  };

  const handleMarkStepComplete = (workflowIndex, stepId) => {
    const updatedWorkflows = [...activeWorkflows];
    const workflow = updatedWorkflows[workflowIndex];
    
    workflow.steps = workflow.steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    );
    
    setActiveWorkflows(updatedWorkflows);
    
    setSuccessMessage('Step marked as completed!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStepTypeIcon = (type) => {
    switch (type) {
      case 'email': return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Email</span>;
      case 'task': return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Task</span>;
      case 'sms': return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">SMS</span>;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <FaUserPlus className="mr-2" />
            Follow-Up Workflow
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          {isEditing ? (
            // Step editing form
            <form onSubmit={handleSaveStep} className="p-4 border rounded-lg bg-gray-50 mb-6">
              <h3 className="text-lg font-medium mb-4">
                {currentStep.id ? 'Edit Step' : 'Add New Step'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Step Name</label>
                  <input
                    type="text"
                    value={currentStep.name}
                    onChange={(e) => setCurrentStep({...currentStep, name: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delay (Days After Joining)</label>
                  <input
                    type="number"
                    min="0"
                    value={currentStep.delay}
                    onChange={(e) => setCurrentStep({...currentStep, delay: parseInt(e.target.value)})}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Step Type</label>
                  <select
                    value={currentStep.type}
                    onChange={(e) => setCurrentStep({...currentStep, type: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="email">Email</option>
                    <option value="task">Task</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>
                
                {currentStep.type === 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Template</label>
                    <select
                      value={currentStep.template}
                      onChange={(e) => setCurrentStep({...currentStep, template: e.target.value})}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Template</option>
                      <option value="welcome_email">Welcome Email</option>
                      <option value="follow_up">Follow-up Email</option>
                      <option value="small_group_invite">Small Group Invitation</option>
                      <option value="event_invite">Event Invitation</option>
                    </select>
                  </div>
                )}
                
                {currentStep.type === 'task' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                    <select
                      value={currentStep.assignee}
                      onChange={(e) => setCurrentStep({...currentStep, assignee: e.target.value})}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Assignee</option>
                      <option value="pastor">Pastor</option>
                      <option value="admin">Admin Staff</option>
                      <option value="staff">Church Staff</option>
                      <option value="deacon">Deacon</option>
                      <option value="elder">Elder</option>
                    </select>
                  </div>
                )}
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={currentStep.description}
                    onChange={(e) => setCurrentStep({...currentStep, description: e.target.value})}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={currentStep.active}
                      onChange={() => setCurrentStep({...currentStep, active: !currentStep.active})}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(null);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Step
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Workflow Steps Panel */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium">Workflow Steps</h3>
                  <button
                    onClick={handleAddStep}
                    className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <FaPlus className="mr-1" />
                    Add Step
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-lg overflow-hidden border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Step</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timing</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {workflowSteps.map(step => (
                        <tr key={step.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{step.name}</div>
                            <div className="text-sm text-gray-500">{step.description}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {getStepTypeIcon(step.type)}
                            <div className="text-sm text-gray-500 mt-1">
                              {step.type === 'email' ? step.template : step.type === 'task' ? `Assigned to: ${step.assignee}` : ''}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-700">
                              <FaRegClock className="mr-1" />
                              {step.delay === 0 ? 'Immediately' : `${step.delay} day${step.delay !== 1 ? 's' : ''} after joining`}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              step.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {step.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleToggleActive(step.id)}
                              className={`mr-2 text-sm ${step.active ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}`}
                            >
                              {step.active ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              onClick={() => handleEditStep(step)}
                              className="mr-2 text-blue-600 hover:text-blue-800"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteStep(step.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Active Workflows Panel */}
              <div>
                <h3 className="text-lg font-medium mb-3">Active Follow-Up Workflows</h3>
                
                {successMessage && (
                  <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
                    {successMessage}
                  </div>
                )}
                
                {activeWorkflows.length > 0 ? (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-6">
                    {activeWorkflows.map((workflow, index) => (
                      <div key={workflow.memberId} className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center mb-4">
                          {workflow.memberPhoto ? (
                            <img 
                              src={workflow.memberPhoto} 
                              alt={workflow.memberName}
                              className="h-12 w-12 rounded-full mr-4 object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                              <FaUserPlus className="text-blue-500" />
                            </div>
                          )}
                          <div>
                            <h4 className="font-medium">{workflow.memberName}</h4>
                            <div className="text-sm text-gray-500">
                              Joined: {formatDate(workflow.joinDate)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {workflow.steps.map(step => (
                            <div 
                              key={step.id} 
                              className={`flex items-center justify-between p-3 rounded-lg ${
                                step.completed 
                                  ? 'bg-green-50 border border-green-100' 
                                  : 'bg-gray-50 border border-gray-100'
                              }`}
                            >
                              <div className="flex items-center">
                                <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                                  step.completed 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'bg-blue-100 text-blue-600'
                                }`}>
                                  {step.completed ? <FaCheck /> : <FaRegClock />}
                                </div>
                                <div>
                                  <div className="font-medium">{step.name}</div>
                                  <div className="text-sm text-gray-500">
                                    Due: {formatDate(step.dueDate)} • {getStepTypeIcon(step.type)}
                                  </div>
                                </div>
                              </div>
                              
                              {!step.completed && (
                                <button
                                  onClick={() => handleMarkStepComplete(index, step.id)}
                                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center"
                                >
                                  <FaCheck className="mr-1" />
                                  Mark Complete
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
                    No active follow-up workflows. New members will automatically be enrolled.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowUpWorkflow;