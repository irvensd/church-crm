export const generateDummyMessages = () => {
  // Generate random conversations with messages
  const conversations = [];
  
  // Sample names for conversations
  const names = [
    'John Smith',
    'Sarah Johnson',
    'Youth Ministry Team',
    'Worship Team',
    'Church Board',
    'Michael Brown',
    'Emily Davis',
    'Prayer Group',
    'Outreach Committee',
    'David Wilson'
  ];
  
  // Sample message texts
  const messageTexts = [
    'Hello, how are you doing?',
    'Can we meet tomorrow to discuss the upcoming event?',
    'I wanted to follow up on our conversation from Sunday.',
    'Please let me know if you need any help with the preparations.',
    'Thank you for your support!',
    'The meeting has been rescheduled to next Tuesday.',
    'I\'m looking forward to seeing everyone this weekend.',
    'Don\'t forget to bring your materials for the workshop.',
    'We need volunteers for the community outreach program.',
    'Just checking in to see how you\'re doing.'
  ];
  
  // Generate conversations
  for (let i = 0; i < 10; i++) {
    const isGroup = i % 3 === 0; // Every third conversation is a group
    const unreadCount = Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0;
    const online = Math.random() > 0.5;
    
    // Generate messages for this conversation
    const conversationMessages = [];
    const messageCount = Math.floor(Math.random() * 15) + 5;
    
    for (let j = 0; j < messageCount; j++) {
      const sender = Math.random() > 0.5 ? 'me' : 'other';
      const now = new Date();
      const timestamp = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Random time in the last week
      
      conversationMessages.push({
        id: `msg-${i}-${j}`,
        sender: sender,
        text: messageTexts[Math.floor(Math.random() * messageTexts.length)],
        timestamp: timestamp.toISOString(),
        read: sender === 'me' || Math.random() > 0.3
      });
    }
    
    // Sort messages by timestamp
    conversationMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    // Create the conversation
    conversations.push({
      id: `conv-${i}`,
      name: names[i],
      isGroup: isGroup,
      unreadCount: unreadCount,
      online: online,
      members: isGroup ? Array(Math.floor(Math.random() * 8) + 3).fill().map((_, idx) => ({ id: `member-${idx}`, name: `Member ${idx + 1}` })) : [],
      lastMessage: conversationMessages[conversationMessages.length - 1],
      messages: conversationMessages
    });
  }
  
  return { conversations };
};

export default generateDummyMessages;
