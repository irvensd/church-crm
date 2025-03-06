import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiPlus, 
  FiTrash2, 
  FiX, 
  FiFilter, 
  FiCalendar, 
  FiClock,
  FiChevronDown,
  FiCheck,
  FiArrowLeft
} from 'react-icons/fi';

const Tasks = () => {
  // State for tasks
  const [tasks, setTasks] = useState([]);
  
  // State for new task input
  const [newTask, setNewTask] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  
  // State for filtering and sorting
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, priority, alphabetical
  
  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('dashboardTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dashboardTasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Handle task completion toggle
  const toggleTaskCompletion = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  // Handle task deletion
  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  
  // Handle adding a new task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    
    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority: newTaskPriority,
      dueDate: newTaskDueDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    
    setTasks(prevTasks => [...prevTasks, newTaskObj]);
    setNewTask('');
    setNewTaskPriority('medium');
    setNewTaskDueDate('');
    setShowAddTask(false);
  };
  
  // Get filtered and sorted tasks
  const getFilteredAndSortedTasks = () => {
    let filteredTasks = [...tasks];
    
    // Apply filter
    if (filter === 'active') {
      filteredTasks = filteredTasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filteredTasks = filteredTasks.filter(task => task.completed);
    }
    
    // Apply sorting
    filteredTasks.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return (priorityOrder[a.priority] || 99) - (priorityOrder[b.priority] || 99);
      } else if (sortBy === 'alphabetical') {
        return a.text.localeCompare(b.text);
      } else if (sortBy === 'dueDate') {
        return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
      }
      return 0;
    });
    
    return filteredTasks;
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };
  
  // Get task counts
  const getTaskCounts = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    
    return { total, completed, active };
  };
  
  const taskCounts = getTaskCounts();
  const filteredAndSortedTasks = getFilteredAndSortedTasks();
  
  return (
    <div className="h-full">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <Link to="/" className="mr-4 text-gray-500 hover:text-gray-700">
              <FiArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
          </div>
          <p className="text-gray-600 mt-1">Manage your tasks and to-dos</p>
        </div>
        <button
          onClick={() => setShowAddTask(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiPlus size={18} className="mr-2" />
          <span>Add Task</span>
        </button>
      </div>
      
      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
              <FiCheck size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="text-xl font-semibold">{taskCounts.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
              <FiCheck size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-xl font-semibold">{taskCounts.completed}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
              <FiClock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-xl font-semibold">{taskCounts.active}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters and Sorting */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Filter:</span>
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-sm ${
                  filter === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1.5 text-sm ${
                  filter === 'active' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1.5 text-sm ${
                  filter === 'completed' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-md px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Add Task Form */}
      {showAddTask && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800">Add New Task</h3>
            <button 
              onClick={() => setShowAddTask(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX size={20} />
            </button>
          </div>
          
          <form onSubmit={addTask}>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1" htmlFor="taskText">
                Task Description
              </label>
              <input
                id="taskText"
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1" htmlFor="taskPriority">
                  Priority
                </label>
                <select
                  id="taskPriority"
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1" htmlFor="taskDueDate">
                  Due Date
                </label>
                <input
                  id="taskDueDate"
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowAddTask(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Tasks List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {filteredAndSortedTasks.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredAndSortedTasks.map((task) => (
              <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors group">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <input 
                      type="checkbox" 
                      checked={task.completed} 
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-base ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                        {task.text}
                      </p>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                      {task.priority && (
                        <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                      )}
                      {task.dueDate && (
                        <span className="text-xs flex items-center text-gray-500">
                          <FiCalendar size={12} className="mr-1" />
                          Due: {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
              <FiCheck size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No tasks found</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? "You don't have any tasks yet. Add a new task to get started." 
                : filter === 'active'
                  ? "You don't have any active tasks."
                  : "You don't have any completed tasks."}
            </p>
            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="mt-4 text-blue-500 hover:text-blue-700"
              >
                View all tasks
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Bulk Actions */}
      {filteredAndSortedTasks.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <div>
            <button
              onClick={() => setTasks(prevTasks => prevTasks.map(task => ({ ...task, completed: true })))}
              className="text-sm text-gray-600 hover:text-gray-800 mr-4"
            >
              Mark all as completed
            </button>
            <button
              onClick={() => setTasks(prevTasks => prevTasks.filter(task => !task.completed))}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Clear completed
            </button>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete all tasks?')) {
                setTasks([]);
              }
            }}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Delete all
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasks; 