// Create a new file for dummy events data
export const generateDummyEvents = () => {
  // Get current date
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  // Create a range of dates for events
  const pastDate1 = new Date(currentYear, currentMonth, now.getDate() - 10);
  const pastDate2 = new Date(currentYear, currentMonth, now.getDate() - 5);
  const pastDate3 = new Date(currentYear, currentMonth, now.getDate() - 2);
  
  const futureDate1 = new Date(currentYear, currentMonth, now.getDate() + 2);
  const futureDate2 = new Date(currentYear, currentMonth, now.getDate() + 5);
  const futureDate3 = new Date(currentYear, currentMonth, now.getDate() + 10);
  const futureDate4 = new Date(currentYear, currentMonth, now.getDate() + 15);
  const futureDate5 = new Date(currentYear, currentMonth, now.getDate() + 20);
  
  // Sunday service dates (next 4 Sundays)
  const sundays = [];
  for (let i = 0; i < 4; i++) {
    const d = new Date();
    d.setDate(d.getDate() + (7 - d.getDay()) % 7 + (i * 7));
    sundays.push(d);
  }
  
  return [
    // Regular weekly services
    ...sundays.map((sunday, index) => ({
      id: 100 + index,
      title: 'Sunday Worship Service',
      description: 'Weekly worship service with praise, prayer, and teaching.',
      startDate: new Date(sunday.setHours(10, 0, 0, 0)).toISOString(),
      endDate: new Date(sunday.setHours(12, 0, 0, 0)).toISOString(),
      location: 'Main Sanctuary',
      type: 'worship',
      recurring: true,
      recurrencePattern: 'weekly',
      attendees: 120 + Math.floor(Math.random() * 30),
      organizer: 'Pastor Johnson',
      status: 'confirmed'
    })),
    
    // Past events
    {
      id: 1,
      title: 'Men\'s Breakfast',
      description: 'Monthly men\'s fellowship breakfast with guest speaker.',
      startDate: new Date(pastDate1.setHours(8, 0, 0, 0)).toISOString(),
      endDate: new Date(pastDate1.setHours(10, 0, 0, 0)).toISOString(),
      location: 'Fellowship Hall',
      type: 'fellowship',
      recurring: true,
      recurrencePattern: 'monthly',
      attendees: 35,
      organizer: 'Deacon Wilson',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Youth Game Night',
      description: 'Fun evening of games and fellowship for teenagers.',
      startDate: new Date(pastDate2.setHours(18, 30, 0, 0)).toISOString(),
      endDate: new Date(pastDate2.setHours(21, 0, 0, 0)).toISOString(),
      location: 'Youth Room',
      type: 'youth',
      recurring: false,
      attendees: 28,
      organizer: 'Sarah Williams',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Prayer Meeting',
      description: 'Midweek prayer gathering for the congregation.',
      startDate: new Date(pastDate3.setHours(19, 0, 0, 0)).toISOString(),
      endDate: new Date(pastDate3.setHours(20, 0, 0, 0)).toISOString(),
      location: 'Prayer Chapel',
      type: 'prayer',
      recurring: true,
      recurrencePattern: 'weekly',
      attendees: 25,
      organizer: 'Elder Thomas',
      status: 'completed'
    },
    
    // Upcoming events
    {
      id: 4,
      title: 'Community Outreach',
      description: 'Serving meals at the local homeless shelter.',
      startDate: new Date(futureDate1.setHours(9, 0, 0, 0)).toISOString(),
      endDate: new Date(futureDate1.setHours(13, 0, 0, 0)).toISOString(),
      location: 'Hope Shelter',
      type: 'outreach',
      recurring: false,
      attendees: 15,
      organizer: 'Deacon Wilson',
      status: 'confirmed'
    },
    {
      id: 5,
      title: 'Bible Study',
      description: 'In-depth study of the Book of Romans.',
      startDate: new Date(futureDate2.setHours(19, 0, 0, 0)).toISOString(),
      endDate: new Date(futureDate2.setHours(20, 30, 0, 0)).toISOString(),
      location: 'Fellowship Hall',
      type: 'study',
      recurring: true,
      recurrencePattern: 'weekly',
      attendees: 40,
      organizer: 'Pastor Johnson',
      status: 'confirmed'
    },
    {
      id: 6,
      title: 'Women\'s Ministry Luncheon',
      description: 'Monthly gathering for women with lunch and guest speaker.',
      startDate: new Date(futureDate3.setHours(12, 0, 0, 0)).toISOString(),
      endDate: new Date(futureDate3.setHours(14, 0, 0, 0)).toISOString(),
      location: 'Fellowship Hall',
      type: 'fellowship',
      recurring: true,
      recurrencePattern: 'monthly',
      attendees: 45,
      organizer: 'Mary Johnson',
      status: 'confirmed'
    },
    {
      id: 7,
      title: 'Church Picnic',
      description: 'Annual church picnic with food, games, and fellowship.',
      startDate: new Date(futureDate4.setHours(11, 0, 0, 0)).toISOString(),
      endDate: new Date(futureDate4.setHours(16, 0, 0, 0)).toISOString(),
      location: 'City Park',
      type: 'fellowship',
      recurring: true,
      recurrencePattern: 'yearly',
      attendees: 150,
      organizer: 'Church Staff',
      status: 'confirmed'
    },
    {
      id: 8,
      title: 'Vacation Bible School',
      description: 'Week-long program for children with Bible lessons, crafts, and activities.',
      startDate: new Date(futureDate5.setHours(9, 0, 0, 0)).toISOString(),
      endDate: new Date(new Date(futureDate5).setDate(futureDate5.getDate() + 5)).toISOString(),
      location: 'Church Campus',
      type: 'children',
      recurring: false,
      attendees: 80,
      organizer: 'Children\'s Ministry Team',
      status: 'confirmed'
    },
    {
      id: 9,
      title: 'Choir Practice',
      description: 'Weekly rehearsal for the church choir.',
      startDate: new Date(futureDate1.setHours(18, 30, 0, 0)).toISOString(),
      endDate: new Date(futureDate1.setHours(20, 0, 0, 0)).toISOString(),
      location: 'Choir Room',
      type: 'music',
      recurring: true,
      recurrencePattern: 'weekly',
      attendees: 20,
      organizer: 'Music Director',
      status: 'confirmed'
    },
    {
      id: 10,
      title: 'Leadership Meeting',
      description: 'Monthly meeting for church leadership team.',
      startDate: new Date(futureDate2.setHours(18, 0, 0, 0)).toISOString(),
      endDate: new Date(futureDate2.setHours(20, 0, 0, 0)).toISOString(),
      location: 'Conference Room',
      type: 'meeting',
      recurring: true,
      recurrencePattern: 'monthly',
      attendees: 12,
      organizer: 'Pastor Johnson',
      status: 'confirmed'
    }
  ];
}; 