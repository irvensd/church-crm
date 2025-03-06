import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave, FaUserFriends, FaChevronRight, FaCheckCircle, FaHourglassHalf, FaCalendarAlt, FaClipboardList } from 'react-icons/fa';

const MemberJourney = ({ member, members, onClose, onSave }) => {
  const [journey, setJourney] = useState({
    memberId: member?.id || '',
    mentorId: member?.mentorId || '',
    stage: member?.journeyStage || 'welcome',
    startDate: member?.journeyStartDate || new Date().toISOString().split('T')[0],
    notes: member?.journeyNotes || '',
    completedSteps: member?.completedJourneySteps || [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Define journey stages
  const journeyStages = [
    { id: 'welcome', name: 'Welcome', description: 'Initial welcome and introduction to the church' },
    { id: 'connect', name: 'Connect', description: 'Connected to a small group or ministry' },
    { id: 'grow', name: 'Grow', description: 'Participating in discipleship or Bible study' },
    { id: 'serve', name: 'Serve', description: 'Serving in a ministry or volunteer role' },
    { id: 'integrated', name: 'Integrated', description: 'Fully integrated into church community' }
  ];

  // Define journey steps for each stage
  const journeySteps = {
    welcome: [
      { id: 'welcome_call', name: 'Welcome Call', description: 'Initial phone call to welcome new member' },
      { id: 'welcome_packet', name: 'Welcome Packet', description: 'Provide welcome materials and information' },
      { id: 'church_tour', name: 'Church Tour', description: 'Tour of the church facilities' },
      { id: 'pastor_meeting', name: 'Meet with Pastor', description: 'Introductory meeting with a pastor' }
    ],
    connect: [
      { id: 'small_group', name: 'Small Group', description: 'Connected to a small group' },
      { id: 'ministry_intro', name: 'Ministry Introduction', description: 'Introduction to church ministries' },
      { id: 'fellowship_event', name: 'Fellowship Event', description: 'Attended a fellowship event' }
    ],
    grow: [
      { id: 'new_member_class', name: 'New Member Class', description: 'Completed new member orientation' },
      { id: 'bible_study', name: 'Bible Study', description: 'Participating in Bible study' },
      { id: 'discipleship', name: 'Discipleship', description: 'One-on-one discipleship meetings' }
    ],
    serve: [
      { id: 'spiritual_gifts', name: 'Spiritual Gifts Assessment', description: 'Completed spiritual gifts assessment' },
      { id: 'ministry_placement', name: 'Ministry Placement', description: 'Placed in a ministry role' },
      { id: 'volunteer_training', name: 'Volunteer Training', description: 'Completed volunteer training' }
    ],
    integrated: [
      { id: 'regular_attendance', name: 'Regular Attendance', description: 'Attending services regularly' },
      { id: 'giving', name: 'Regular Giving', description: 'Established pattern of giving' },
      { id: 'leadership', name: 'Leadership Development', description: 'Participating in leadership development' }
    ]
  };

  // Get potential mentors (leaders, deacons, elders, pastors)
  const potentialMentors = members.filter(m => 
    m.id !== member.id && 
    m.status === 'active' && 
    ['leader', 'deacon', 'elder', 'pastor'].includes(m.role)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJourney({
      ...journey,
      [name]: value
    });
  };

  const handleStageChange = (stage) => {
    setJourney({
      ...journey,
      stage
    });
  };

  const handleStepToggle = (stepId) => {
    const updatedSteps = journey.completedSteps.includes(stepId)
      ? journey.completedSteps.filter(id => id !== stepId)
      : [...journey.completedSteps, stepId];
    
    setJourney({
      ...journey,
      completedSteps: updatedSteps
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave({
        ...member,
        mentorId: journey.mentorId,
        journeyStage: journey.stage,
        journeyStartDate: journey.startDate,
        journeyNotes: journey.notes,
        completedJourneySteps: journey.completedSteps
      });
      
      setIsLoading(false);
      setSuccessMessage('Journey updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  // Calculate progress percentage for current stage
  const calculateStageProgress = () => {
    const stepsForCurrentStage = journeySteps[journey.stage] || [];
    if (stepsForCurrentStage.length === 0) return 0;
    
    const completedStepsInStage = stepsForCurrentStage.filter(
      step => journey.completedSteps.includes(step.id)
    ).length;
    
    return Math.round((completedStepsInStage / stepsForCurrentStage.length) * 100);
  };

  // Calculate overall journey progress
  const calculateOverallProgress = () => {
    const allSteps = Object.values(journeySteps).flat();
    if (allSteps.length === 0) return 0;
    
    const completedSteps = allSteps.filter(
      step => journey.completedSteps.includes(step.id)
    ).length;
    
    return Math.round((completedSteps / allSteps.length) * 100);
  };

  const stageProgress = calculateStageProgress();
  const overallProgress = calculateOverallProgress();
  const currentStageIndex = journeyStages.findIndex(stage => stage.id === journey.stage);
  const mentor = potentialMentors.find(m => m.id.toString() === journey.mentorId.toString());

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            Member Journey: {member.name}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign Mentor</label>
                <select
                  name="mentorId"
                  value={journey.mentorId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a Mentor</option>
                  {potentialMentors.map(mentor => (
                    <option key={mentor.id} value={mentor.id}>
                      {mentor.name} ({mentor.role.charAt(0).toUpperCase() + mentor.role.slice(1)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Journey Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={journey.startDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Stage</label>
                <div className="flex flex-wrap gap-2">
                  {journeyStages.map((stage, index) => (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => handleStageChange(stage.id)}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                        journey.stage === stage.id
                          ? 'bg-blue-500 text-white'
                          : index < currentStageIndex
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {index > 0 && <FaChevronRight className="mr-1 text-xs" />}
                      {stage.name}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {journeyStages.find(stage => stage.id === journey.stage)?.description}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Journey Steps</label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">
                    {journeyStages.find(stage => stage.id === journey.stage)?.name} Stage Steps
                  </h3>
                  <div className="space-y-2">
                    {journeySteps[journey.stage]?.map(step => (
                      <div 
                        key={step.id} 
                        className={`flex items-center p-2 rounded ${
                          journey.completedSteps.includes(step.id) ? 'bg-green-50' : 'bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          id={step.id}
                          checked={journey.completedSteps.includes(step.id)}
                          onChange={() => handleStepToggle(step.id)}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <label htmlFor={step.id} className="flex-1 cursor-pointer">
                          <div className="font-medium">{step.name}</div>
                          <div className="text-sm text-gray-500">{step.description}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={journey.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add notes about the member's journey..."
                ></textarea>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-medium mb-4">Journey Progress</h3>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span>{overallProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-blue-600" 
                      style={{ width: `${overallProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Current Stage Progress</span>
                    <span>{stageProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full bg-green-600" 
                      style={{ width: `${stageProgress}%` }}
                    ></div>
                  </div>
                </div>

                {mentor && (
                  <div className="mb-4">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Assigned Mentor</h4>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      {mentor.photoUrl ? (
                        <img 
                          src={mentor.photoUrl} 
                          alt={mentor.name} 
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                          <FaUserFriends className="text-gray-600" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{mentor.name}</div>
                        <div className="text-sm text-gray-500">
                          {mentor.role.charAt(0).toUpperCase() + mentor.role.slice(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <FaCalendarAlt className="text-blue-500 mr-2" />
                    <span>Started: {new Date(journey.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaHourglassHalf className="text-yellow-500 mr-2" />
                    <span>Current Stage: {journeyStages.find(stage => stage.id === journey.stage)?.name}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaClipboardList className="text-green-500 mr-2" />
                    <span>Completed Steps: {journey.completedSteps.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            {successMessage && (
              <div className="flex items-center text-green-600 mr-auto">
                <FaCheckCircle className="mr-1" />
                {successMessage}
              </div>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Save Journey
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberJourney; 