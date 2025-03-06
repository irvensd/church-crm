// Generate random dates within a range
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

// Generate random donation amount
const randomDonation = () => {
  const amounts = [0, 50, 100, 250, 500, 750, 1000, 1500, 2000, 2500, 3000];
  return amounts[Math.floor(Math.random() * amounts.length)];
};

// Generate random phone number
const randomPhone = () => {
  return `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
};

// Generate random address
const randomAddress = () => {
  const streets = ['Main St', 'Oak Ave', 'Maple Rd', 'Washington Blvd', 'Church St', 'Park Ave', 'Lake Dr', 'Pine St'];
  const cities = ['Springfield', 'Riverdale', 'Lakeside', 'Maplewood', 'Oakville', 'Brookfield', 'Fairview', 'Greenville'];
  const states = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];
  
  return `${Math.floor(Math.random() * 9000) + 100} ${streets[Math.floor(Math.random() * streets.length)]}, ${cities[Math.floor(Math.random() * cities.length)]}, ${states[Math.floor(Math.random() * states.length)]} ${Math.floor(Math.random() * 90000) + 10000}`;
};

// Add journey data to some members
const addJourneyData = (members) => {
  // Get IDs of mentors (leaders, deacons, elders, pastors)
  const mentorIds = members
    .filter(m => ['leader', 'deacon', 'elder', 'pastor'].includes(m.role))
    .map(m => m.id);
  
  // Add journey data to new members (joined in the last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  return members.map(member => {
    const joinDate = new Date(member.joinDate);
    
    // Only add journey data to recent members
    if (joinDate >= sixMonthsAgo && member.status === 'active' && member.role === 'member') {
      const stages = ['welcome', 'connect', 'grow', 'serve', 'integrated'];
      const randomStageIndex = Math.floor(Math.random() * 3); // Only use first 3 stages for new members
      const stage = stages[randomStageIndex];
      
      // Random mentor
      const mentorId = mentorIds[Math.floor(Math.random() * mentorIds.length)];
      
      // Random completed steps
      const stepsPerStage = {
        welcome: ['welcome_call', 'welcome_packet', 'church_tour', 'pastor_meeting'],
        connect: ['small_group', 'ministry_intro', 'fellowship_event'],
        grow: ['new_member_class', 'bible_study', 'discipleship']
      };
      
      const completedSteps = [];
      
      // Complete all steps for previous stages
      for (let i = 0; i < randomStageIndex; i++) {
        completedSteps.push(...stepsPerStage[stages[i]]);
      }
      
      // Complete some steps for current stage
      const currentStageSteps = stepsPerStage[stage];
      const numCompletedCurrentStage = Math.floor(Math.random() * (currentStageSteps.length + 1));
      for (let i = 0; i < numCompletedCurrentStage; i++) {
        completedSteps.push(currentStageSteps[i]);
      }
      
      return {
        ...member,
        mentorId,
        journeyStage: stage,
        journeyStartDate: member.joinDate,
        journeyNotes: `${member.name} is progressing well through their journey.`,
        completedJourneySteps: completedSteps
      };
    }
    
    return member;
  });
};

// Generate 30 dummy members
export const generateDummyMembers = () => {
  const firstNames = ['John', 'Jane', 'Robert', 'Emily', 'Michael', 'Sarah', 'David', 'Lisa', 'William', 'Mary', 
                      'James', 'Jennifer', 'Charles', 'Patricia', 'Thomas', 'Linda', 'Daniel', 'Barbara', 'Matthew', 'Elizabeth',
                      'Anthony', 'Susan', 'Donald', 'Jessica', 'Steven', 'Margaret', 'Paul', 'Karen', 'Andrew', 'Nancy'];
  
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor',
                     'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson',
                     'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King'];
  
  // Ensure we have at least this many of each role type
  const roleMinimums = {
    'member': 10,
    'leader': 5,
    'deacon': 5,
    'elder': 5,
    'pastor': 5
  };
  
  const members = [];
  let id = 1;
  
  // First, create the minimum required for each role
  Object.entries(roleMinimums).forEach(([role, count]) => {
    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const name = `${firstName} ${lastName}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
      const status = Math.random() > 0.2 ? 'active' : 'inactive';
      
      const joinDate = randomDate(new Date(2020, 0, 1), new Date());
      const lastDonation = Math.random() > 0.3 ? randomDate(new Date(2022, 0, 1), new Date()) : '';
      const totalDonations = randomDonation();
      
      const tagIds = [];
      if (Math.random() > 0.5) tagIds.push(1); // Donor
      if (Math.random() > 0.7) tagIds.push(2); // Volunteer
      if (Math.random() > 0.9) tagIds.push(3); // Board Member
      if (new Date(joinDate) > new Date(new Date().setMonth(new Date().getMonth() - 3))) tagIds.push(4); // New Member
      
      const photoId = Math.floor(Math.random() * 70) + 1;
      const photoUrl = `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${photoId}.jpg`;
      
      const birthday = randomDate(new Date(1960, 0, 1), new Date(2000, 11, 31));
      const phone = randomPhone();
      const address = randomAddress();
      
      members.push({
        id: id++,
        name,
        email,
        status,
        role,
        joinDate,
        lastDonation,
        totalDonations,
        tagIds,
        photoUrl,
        birthday,
        phone,
        address,
        notes: Math.random() > 0.7 ? `Notes for ${name}` : '',
      });
    }
  });
  
  // Add journey data to some members
  return addJourneyData(members);
}; 