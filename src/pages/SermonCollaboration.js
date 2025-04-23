import React, { useState } from 'react';
import { 
  FiBook, 
  FiCalendar, 
  FiEdit3, 
  FiFolder, 
  FiImage, 
  FiLink, 
  FiMessageSquare,
  FiPaperclip,
  FiShare2,
  FiUsers
} from 'react-icons/fi';
import PageLayout from '../components/PageLayout';

const SermonCollaboration = () => {
  const [activeTab, setActiveTab] = useState('planning');
  
  // Sample sermon series data
  const [sermonSeries] = useState([
    {
      id: 1,
      title: "Walking in Faith",
      description: "A journey through Hebrews 11",
      startDate: "2024-03-01",
      endDate: "2024-04-15",
      sermons: [
        {
          id: 101,
          title: "Faith Defined",
          scripture: "Hebrews 11:1-3",
          date: "2024-03-03",
          notes: "Introduction to faith...",
          status: "completed"
        },
        {
          id: 102,
          title: "Faith of Abel",
          scripture: "Hebrews 11:4",
          date: "2024-03-10",
          notes: "Exploring Abel's sacrifice...",
          status: "in-progress"
        }
      ]
    }
  ]);

  // Sample resources
  const [resources] = useState([
    {
      id: 1,
      type: "illustration",
      title: "The Lighthouse",
      category: "Faith",
      content: "A story about guidance in darkness..."
    },
    {
      id: 2,
      type: "quote",
      title: "C.S. Lewis on Faith",
      category: "Faith",
      content: "Faith is the art of holding on..."
    }
  ]);

  const renderPlanning = () => (
    <div className="space-y-6">
      {/* Calendar View */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Sermon Calendar</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            New Series
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermonSeries.map(series => (
            <div key={series.id} className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900">{series.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{series.description}</p>
              <div className="mt-4 space-y-2">
                {series.sermons.map(sermon => (
                  <div key={sermon.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{sermon.title}</p>
                      <p className="text-xs text-gray-500">{sermon.scripture}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      sermon.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {sermon.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Library */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Resource Library</h3>
          <div className="flex space-x-2">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
              Add Resource
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
              Import
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(resource => (
            <div key={resource.id} className="border rounded-lg p-4">
              <div className="flex items-start">
                <div className={`p-2 rounded-lg ${
                  resource.type === 'illustration' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  {resource.type === 'illustration' ? <FiImage /> : <FiMessageSquare />}
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900">{resource.title}</h4>
                  <p className="text-sm text-gray-600">{resource.category}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">{resource.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCollaboration = () => (
    <div className="space-y-6">
      {/* Collaborative Features */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Team Collaboration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-4">
              <FiUsers className="text-blue-600" size={20} />
              <h4 className="ml-2 font-medium text-gray-900">Team Members</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  PM
                </div>
                <span className="ml-2 text-sm text-gray-700">Pastor Mike</span>
              </div>
              {/* Add more team members */}
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-4">
              <FiMessageSquare className="text-green-600" size={20} />
              <h4 className="ml-2 font-medium text-gray-900">Comments</h4>
            </div>
            <div className="space-y-3">
              <div className="text-sm text-gray-700">
                <p className="font-medium">Pastor Sarah:</p>
                <p>Great illustration for next week's sermon!</p>
              </div>
              {/* Add more comments */}
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-4">
              <FiPaperclip className="text-purple-600" size={20} />
              <h4 className="ml-2 font-medium text-gray-900">Attachments</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <FiFolder className="text-gray-400" size={16} />
                <span className="ml-2 text-sm text-gray-700">Sermon Notes.pdf</span>
              </div>
              {/* Add more attachments */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PageLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sermon Collaboration</h1>
        <p className="text-gray-600 mt-1">Plan, prepare, and collaborate on sermons</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('planning')}
            className={`${
              activeTab === 'planning'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Planning
          </button>
          <button
            onClick={() => setActiveTab('collaboration')}
            className={`${
              activeTab === 'collaboration'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Collaboration
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'planning' && renderPlanning()}
      {activeTab === 'collaboration' && renderCollaboration()}
    </PageLayout>
  );
};

export default SermonCollaboration;
