// Generate dummy small groups data
export const generateDummySmallGroups = () => {
  return [
    {
      id: 1,
      name: "Sunday Morning Bible Study",
      description: "A weekly Bible study group that meets on Sunday mornings to discuss scripture and its application to daily life.",
      type: "bible-study",
      meetingDay: "Sunday",
      meetingTime: "09:00",
      location: "Church Library",
      leader: {
        id: 101,
        name: "John Davis",
        email: "john.davis@example.com",
        phone: "(555) 123-4567"
      },
      members: [
        { id: 201, name: "Sarah Johnson", email: "sarah.j@example.com", photoUrl: "https://randomuser.me/api/portraits/women/1.jpg" },
        { id: 202, name: "Michael Smith", email: "msmith@example.com", photoUrl: "https://randomuser.me/api/portraits/men/2.jpg" },
        { id: 203, name: "Emily Wilson", email: "emily.w@example.com", photoUrl: "https://randomuser.me/api/portraits/women/3.jpg" },
        { id: 204, name: "David Brown", email: "dbrown@example.com", photoUrl: "https://randomuser.me/api/portraits/men/4.jpg" }
      ],
      status: "active",
      imageUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Women's Prayer Circle",
      description: "A supportive community of women who gather to pray, share, and encourage one another in their faith journey.",
      type: "prayer",
      meetingDay: "Tuesday",
      meetingTime: "19:30",
      location: "Fellowship Hall",
      leader: {
        id: 102,
        name: "Mary Wilson",
        email: "mary.wilson@example.com",
        phone: "(555) 234-5678"
      },
      members: [
        { id: 205, name: "Jennifer Adams", email: "jennifer@example.com", photoUrl: "https://randomuser.me/api/portraits/women/5.jpg" },
        { id: 206, name: "Lisa Thompson", email: "lisa.t@example.com", photoUrl: "https://randomuser.me/api/portraits/women/6.jpg" },
        { id: 207, name: "Rebecca Clark", email: "rebecca@example.com", photoUrl: "https://randomuser.me/api/portraits/women/7.jpg" },
        { id: 208, name: "Amanda White", email: "amanda.w@example.com", photoUrl: "https://randomuser.me/api/portraits/women/8.jpg" },
        { id: 209, name: "Jessica Martin", email: "jmartin@example.com", photoUrl: "https://randomuser.me/api/portraits/women/9.jpg" }
      ],
      status: "active",
      imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Young Adults Fellowship",
      description: "A group for young adults (ages 18-30) to connect, grow spiritually, and build meaningful relationships.",
      type: "fellowship",
      meetingDay: "Friday",
      meetingTime: "20:00",
      location: "Church Youth Room",
      leader: {
        id: 103,
        name: "Daniel Roberts",
        email: "daniel.r@example.com",
        phone: "(555) 345-6789"
      },
      members: [
        { id: 210, name: "Ryan Johnson", email: "ryan.j@example.com", photoUrl: "https://randomuser.me/api/portraits/men/10.jpg" },
        { id: 211, name: "Tyler Smith", email: "tyler@example.com", photoUrl: "https://randomuser.me/api/portraits/men/11.jpg" },
        { id: 212, name: "Sophia Garcia", email: "sophia@example.com", photoUrl: "https://randomuser.me/api/portraits/women/12.jpg" },
        { id: 213, name: "Emma Davis", email: "emma@example.com", photoUrl: "https://randomuser.me/api/portraits/women/13.jpg" }
      ],
      status: "active",
      imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Men's Bible Study",
      description: "A group for men to study scripture, discuss faith challenges, and support one another in their spiritual growth.",
      type: "men",
      meetingDay: "Thursday",
      meetingTime: "06:30",
      location: "Church Conference Room",
      leader: {
        id: 104,
        name: "Robert Thompson",
        email: "robert.t@example.com",
        phone: "(555) 456-7890"
      },
      members: [
        { id: 214, name: "James Wilson", email: "james@example.com", photoUrl: "https://randomuser.me/api/portraits/men/14.jpg" },
        { id: 215, name: "William Clark", email: "william@example.com", photoUrl: "https://randomuser.me/api/portraits/men/15.jpg" },
        { id: 216, name: "Thomas Lee", email: "thomas@example.com", photoUrl: "https://randomuser.me/api/portraits/men/16.jpg" }
      ],
      status: "active",
      imageUrl: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Children's Ministry Team",
      description: "A team dedicated to planning and implementing children's programs and activities.",
      type: "ministry",
      meetingDay: "Monday",
      meetingTime: "18:00",
      location: "Children's Wing",
      leader: {
        id: 105,
        name: "Susan Miller",
        email: "susan.m@example.com",
        phone: "(555) 567-8901"
      },
      members: [
        { id: 217, name: "Patricia Adams", email: "patricia@example.com", photoUrl: "https://randomuser.me/api/portraits/women/17.jpg" },
        { id: 218, name: "Linda Martin", email: "linda@example.com", photoUrl: "https://randomuser.me/api/portraits/women/18.jpg" },
        { id: 219, name: "Elizabeth White", email: "elizabeth@example.com", photoUrl: "https://randomuser.me/api/portraits/women/19.jpg" },
        { id: 220, name: "Barbara Thompson", email: "barbara@example.com", photoUrl: "https://randomuser.me/api/portraits/women/20.jpg" }
      ],
      status: "active",
      imageUrl: "https://images.unsplash.com/photo-1536337005238-94b997371b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "Senior Adults Fellowship",
      description: "A group for seniors to enjoy fellowship, spiritual growth, and social activities together.",
      type: "fellowship",
      meetingDay: "Wednesday",
      meetingTime: "14:00",
      location: "Fellowship Hall",
      leader: {
        id: 106,
        name: "Richard Johnson",
        email: "richard.j@example.com",
        phone: "(555) 678-9012"
      },
      members: [
        { id: 221, name: "Margaret Davis", email: "margaret@example.com", photoUrl: "https://randomuser.me/api/portraits/women/21.jpg" },
        { id: 222, name: "Charles Wilson", email: "charles@example.com", photoUrl: "https://randomuser.me/api/portraits/men/22.jpg" },
        { id: 223, name: "Dorothy Smith", email: "dorothy@example.com", photoUrl: "https://randomuser.me/api/portraits/women/23.jpg" },
        { id: 224, name: "Joseph Brown", email: "joseph@example.com", photoUrl: "https://randomuser.me/api/portraits/men/24.jpg" },
        { id: 225, name: "Betty Miller", email: "betty@example.com", photoUrl: "https://randomuser.me/api/portraits/women/25.jpg" }
      ],
      status: "active",
      imageUrl: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      name: "Youth Group",
      description: "A group for teenagers to grow in faith, build friendships, and have fun in a safe environment.",
      type: "youth",
      meetingDay: "Wednesday",
      meetingTime: "19:00",
      location: "Youth Center",
      leader: {
        id: 107,
        name: "Jason Adams",
        email: "jason.a@example.com",
        phone: "(555) 789-0123"
      },
      members: [
        { id: 226, name: "Andrew Clark", email: "andrew@example.com", photoUrl: "https://randomuser.me/api/portraits/men/26.jpg" },
        { id: 227, name: "Olivia Johnson", email: "olivia@example.com", photoUrl: "https://randomuser.me/api/portraits/women/27.jpg" },
        { id: 228, name: "Ethan Wilson", email: "ethan@example.com", photoUrl: "https://randomuser.me/api/portraits/men/28.jpg" },
        { id: 229, name: "Ava Smith", email: "ava@example.com", photoUrl: "https://randomuser.me/api/portraits/women/29.jpg" },
        { id: 230, name: "Noah Brown", email: "noah@example.com", photoUrl: "https://randomuser.me/api/portraits/men/30.jpg" },
        { id: 231, name: "Isabella Davis", email: "isabella@example.com", photoUrl: "https://randomuser.me/api/portraits/women/31.jpg" }
      ],
      status: "active",
      imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 8,
      name: "Worship Team",
      description: "A ministry team dedicated to planning and leading worship services.",
      type: "ministry",
      meetingDay: "Thursday",
      meetingTime: "19:00",
      location: "Sanctuary",
      leader: {
        id: 108,
        name: "Michelle Thompson",
        email: "michelle.t@example.com",
        phone: "(555) 890-1234"
      },
      members: [
        { id: 232, name: "Christopher Martin", email: "christopher@example.com", photoUrl: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 233, name: "Sophia White", email: "sophia.w@example.com", photoUrl: "https://randomuser.me/api/portraits/women/33.jpg" },
        { id: 234, name: "Matthew Johnson", email: "matthew@example.com", photoUrl: "https://randomuser.me/api/portraits/men/34.jpg" },
        { id: 235, name: "Emma Clark", email: "emma.c@example.com", photoUrl: "https://randomuser.me/api/portraits/women/35.jpg" }
      ],
      status: "active",
      imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];
}; 