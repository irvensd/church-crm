import React, { useState, useEffect } from 'react';
import { FiPlus, FiSearch, FiSend, FiPaperclip, FiSmile, FiUser, FiUsers, FiMessageSquare, FiFilter } from 'react-icons/fi';
import { generateDummyMessages } from '../utils/dummyMessages';
import PageLayout from '../components/PageLayout';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'direct', 'group'

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const dummyData = generateDummyMessages();
      setConversations(dummyData.conversations);
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      // Simulate API call to get messages for the selected conversation
      setIsLoading(true);
      setTimeout(() => {
        const dummyData = generateDummyMessages();
        const convo = dummyData.conversations.find(c => c.id === selectedConversation.id);
        setMessages(convo ? convo.messages : []);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedConversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const filteredConversations = conversations.filter(convo => {
    const matchesSearch = convo.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'unread') return matchesSearch && convo.unreadCount > 0;
    if (filter === 'direct') return matchesSearch && !convo.isGroup;
    if (filter === 'group') return matchesSearch && convo.isGroup;
    
    return matchesSearch;
  });

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <PageLayout 
      title="Messages" 
      subtitle="Communicate with your church members and groups"
      actions={
        <button 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <FiPlus className="mr-2" /> New Message
        </button>
      }
    >
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[calc(100vh-200px)]">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-1/3 border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <div className="flex mt-2 space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-xs rounded-full ${
                    filter === 'all' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 text-xs rounded-full ${
                    filter === 'unread' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Unread
                </button>
                <button
                  onClick={() => setFilter('direct')}
                  className={`px-3 py-1 text-xs rounded-full ${
                    filter === 'direct' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Direct
                </button>
                <button
                  onClick={() => setFilter('group')}
                  className={`px-3 py-1 text-xs rounded-full ${
                    filter === 'group' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Groups
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100%-73px)]">
              {isLoading ? (
                <div className="p-4 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">Loading conversations...</p>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-4 text-center">
                  <FiMessageSquare className="mx-auto text-gray-400 text-4xl mb-2" />
                  <p className="text-gray-600">No conversations found</p>
                </div>
              ) : (
                filteredConversations.map(convo => (
                  <div
                    key={convo.id}
                    onClick={() => setSelectedConversation(convo)}
                    className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                      selectedConversation?.id === convo.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="relative">
                        {convo.isGroup ? (
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <FiUsers />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                            {convo.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        {convo.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-medium text-gray-900">{convo.name}</h3>
                          <span className="text-xs text-gray-500">{formatTime(convo.lastMessage.timestamp)}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{convo.lastMessage.text}</p>
                      </div>
                      {convo.unreadCount > 0 && (
                        <div className="ml-2 bg-blue-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                          {convo.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Message Thread */}
          <div className="w-2/3 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    {selectedConversation.isGroup ? (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <FiUsers />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                        {selectedConversation.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{selectedConversation.name}</h3>
                      <p className="text-xs text-gray-500">
                        {selectedConversation.isGroup 
                          ? `${selectedConversation.members.length} members` 
                          : selectedConversation.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div>
                    {/* Additional actions like call, video, etc. could go here */}
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message, index) => {
                        const isMe = message.sender === 'me';
                        const showDate = index === 0 || 
                          formatDate(messages[index-1].timestamp) !== formatDate(message.timestamp);
                        
                        return (
                          <div key={message.id}>
                            {showDate && (
                              <div className="flex justify-center my-4">
                                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-500">
                                  {formatDate(message.timestamp)}
                                </span>
                              </div>
                            )}
                            <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                isMe ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                              }`}>
                                <p className="text-sm">{message.text}</p>
                                <span className={`text-xs ${isMe ? 'text-blue-200' : 'text-gray-500'} block text-right mt-1`}>
                                  {formatTime(message.timestamp)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex items-center">
                    <button 
                      type="button"
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <FiPaperclip />
                    </button>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button 
                      type="button"
                      className="p-2 text-gray-500 hover:text-gray-700 mr-2"
                    >
                      <FiSmile />
                    </button>
                    <button 
                      type="submit"
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                      disabled={!newMessage.trim()}
                    >
                      <FiSend />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <FiMessageSquare className="text-gray-300 text-6xl mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Select a conversation</h3>
                <p className="text-gray-500 max-w-md">
                  Choose a conversation from the list or start a new one to begin messaging.
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  <FiPlus className="inline mr-2" />
                  New Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Messages; 