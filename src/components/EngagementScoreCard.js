import React from 'react';
import { FaStar, FaChartLine, FaCalendarCheck, FaComments, FaHandHoldingUsd, FaUsers } from 'react-icons/fa';

const EngagementScoreCard = ({ member, attendanceRecords, communicationLogs, pledges }) => {
  // Calculate engagement score based on various factors
  const calculateEngagementScore = () => {
    let score = 0;
    const factors = [];
    
    // Base score for active status
    if (member.status === 'active') {
      score += 10;
      factors.push({ name: 'Active Status', points: 10, icon: <FaUsers className="text-blue-500" /> });
    }
    
    // Score for recent attendance
    const memberAttendance = attendanceRecords.filter(record => 
      record.attendees && record.attendeeIds && record.attendeeIds.includes(member.id)
    );
    
    if (memberAttendance.length > 0) {
      const attendancePoints = Math.min(memberAttendance.length * 5, 25);
      score += attendancePoints;
      factors.push({ 
        name: 'Event Attendance', 
        points: attendancePoints, 
        icon: <FaCalendarCheck className="text-green-500" />,
        detail: `${memberAttendance.length} events`
      });
    }
    
    // Score for recent communications
    const memberCommunications = communicationLogs.filter(log => log.memberId === member.id);
    
    if (memberCommunications.length > 0) {
      const communicationPoints = Math.min(memberCommunications.length * 3, 15);
      score += communicationPoints;
      factors.push({ 
        name: 'Recent Communications', 
        points: communicationPoints, 
        icon: <FaComments className="text-purple-500" />,
        detail: `${memberCommunications.length} communications`
      });
    }
    
    // Score for financial contributions
    if (member.totalDonations) {
      const donationAmount = parseFloat(member.totalDonations);
      let donationPoints = 0;
      
      if (donationAmount > 0) {
        if (donationAmount < 100) donationPoints = 5;
        else if (donationAmount < 500) donationPoints = 10;
        else if (donationAmount < 1000) donationPoints = 15;
        else donationPoints = 20;
        
        score += donationPoints;
        factors.push({ 
          name: 'Financial Contributions', 
          points: donationPoints, 
          icon: <FaHandHoldingUsd className="text-yellow-500" />,
          detail: `$${donationAmount.toLocaleString()}`
        });
      }
    }
    
    // Score for active pledges
    const memberPledges = pledges.filter(pledge => 
      pledge.memberId === member.id && pledge.status === 'active'
    );
    
    if (memberPledges.length > 0) {
      const pledgePoints = Math.min(memberPledges.length * 5, 15);
      score += pledgePoints;
      factors.push({ 
        name: 'Active Pledges', 
        points: pledgePoints, 
        icon: <FaHandHoldingUsd className="text-green-500" />,
        detail: `${memberPledges.length} pledges`
      });
    }
    
    // Score for membership duration
    if (member.joinDate) {
      const joinDate = new Date(member.joinDate);
      const now = new Date();
      const membershipMonths = (now.getFullYear() - joinDate.getFullYear()) * 12 + 
                              now.getMonth() - joinDate.getMonth();
      
      let loyaltyPoints = 0;
      if (membershipMonths >= 60) loyaltyPoints = 20; // 5+ years
      else if (membershipMonths >= 36) loyaltyPoints = 15; // 3+ years
      else if (membershipMonths >= 24) loyaltyPoints = 10; // 2+ years
      else if (membershipMonths >= 12) loyaltyPoints = 5; // 1+ year
      
      if (loyaltyPoints > 0) {
        score += loyaltyPoints;
        factors.push({ 
          name: 'Membership Duration', 
          points: loyaltyPoints, 
          icon: <FaUsers className="text-indigo-500" />,
          detail: membershipMonths < 12 ? 
            `${membershipMonths} months` : 
            `${Math.floor(membershipMonths / 12)} years, ${membershipMonths % 12} months`
        });
      }
    }
    
    return { score, factors };
  };

  const { score, factors } = calculateEngagementScore();
  
  // Determine engagement level
  const getEngagementLevel = (score) => {
    if (score >= 70) return { label: 'Very High', color: 'text-green-600' };
    if (score >= 50) return { label: 'High', color: 'text-blue-600' };
    if (score >= 30) return { label: 'Medium', color: 'text-yellow-600' };
    if (score >= 15) return { label: 'Low', color: 'text-orange-600' };
    return { label: 'Very Low', color: 'text-red-600' };
  };
  
  const engagementLevel = getEngagementLevel(score);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Engagement Score</h3>
        <div className="flex items-center">
          <span className={`text-2xl font-bold ${engagementLevel.color}`}>{score}</span>
          <span className="text-sm text-gray-500 ml-2">/ 100</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              score >= 70 ? 'bg-green-600' : 
              score >= 50 ? 'bg-blue-600' : 
              score >= 30 ? 'bg-yellow-500' : 
              score >= 15 ? 'bg-orange-500' : 'bg-red-600'
            }`} 
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <FaStar className={engagementLevel.color} />
        <span className={`ml-2 font-medium ${engagementLevel.color}`}>
          {engagementLevel.label} Engagement
        </span>
      </div>
      
      <h4 className="font-medium text-sm text-gray-700 mb-2">Contributing Factors</h4>
      <div className="space-y-2">
        {factors.map((factor, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
            <div className="flex items-center">
              {factor.icon}
              <span className="ml-2 text-sm">{factor.name}</span>
              {factor.detail && (
                <span className="ml-2 text-xs text-gray-500">({factor.detail})</span>
              )}
            </div>
            <span className="font-medium text-sm">+{factor.points} pts</span>
          </div>
        ))}
        
        {factors.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <FaChartLine className="mx-auto text-2xl mb-2" />
            <p className="text-sm">No engagement data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EngagementScoreCard; 