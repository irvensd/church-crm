import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiUsers, FiCalendar, FiMessageSquare, FiDollarSign, 
  FiBarChart2, FiHeart, FiCheck, FiArrowRight,
  FiMenu, FiX, FiChevronDown,
  FiShield, 
  FiGlobe, 
  FiSmartphone, 
  FiLifeBuoy, 
  FiClock, 
  FiAward,
  FiPlay
} from 'react-icons/fi';

const LandingPage = ({ onLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [showDemoModal, setShowDemoModal] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (onLogin) onLogin();
    navigate('/dashboard');
  };

  // Features data
  const features = [
    {
      icon: <FiUsers className="h-10 w-10 text-indigo-600" />,
      title: "Member Management",
      description: "Easily track and manage your church members, visitors, and volunteers."
    },
    {
      icon: <FiCalendar className="h-10 w-10 text-indigo-600" />,
      title: "Events & Calendar",
      description: "Plan, schedule, and manage all your church events in one place."
    },
    {
      icon: <FiMessageSquare className="h-10 w-10 text-indigo-600" />,
      title: "Communication Tools",
      description: "Connect with your congregation through email, SMS, and push notifications."
    },
    {
      icon: <FiDollarSign className="h-10 w-10 text-indigo-600" />,
      title: "Financial Management",
      description: "Track donations, manage budgets, and generate financial reports."
    },
    {
      icon: <FiBarChart2 className="h-10 w-10 text-indigo-600" />,
      title: "Analytics & Insights",
      description: "Gain valuable insights into your church's growth and ministry effectiveness."
    },
    {
      icon: <FiHeart className="h-10 w-10 text-indigo-600" />,
      title: "Pastoral Care",
      description: "Streamline pastoral care with follow-up reminders and prayer request management."
    }
  ];

  // Pricing plans
  const pricingPlans = [
    {
      name: "Basic",
      price: "$49",
      period: "per month",
      description: "Perfect for small churches",
      features: [
        "Up to 200 member profiles",
        "Basic event management",
        "Email communication",
        "Simple donation tracking",
        "Standard reports",
        "Email support"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Standard",
      price: "$99",
      period: "per month",
      description: "Ideal for growing churches",
      features: [
        "Up to 500 member profiles",
        "Advanced event management",
        "Email & SMS communication",
        "Complete financial management",
        "Ministry analytics",
        "Priority support"
      ],
      cta: "Most Popular",
      highlighted: true
    },
    {
      name: "Premium",
      price: "$199",
      period: "per month",
      description: "For large, multi-staff churches",
      features: [
        "Unlimited member profiles",
        "Advanced event management",
        "Multi-channel communication",
        "Complete financial suite",
        "Advanced analytics & insights",
        "Pastoral care tools",
        "24/7 priority support"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "How much does Congrevia cost?",
      answer: "Congrevia offers three pricing tiers starting at $49/month for our Basic plan. We also offer a 14-day free trial."
    },
    {
      question: "Can I import my existing church database?",
      answer: "Yes! Congrevia makes it easy to import your existing data from spreadsheets or other church management systems."
    },
    {
      question: "Is Congrevia secure?",
      answer: "Absolutely. We use bank-level encryption to protect your data, regular security audits, and strict access controls."
    },
    {
      question: "Do you offer training for our staff?",
      answer: "Yes, all plans include access to our knowledge base and video tutorials. Our Standard and Premium plans also include personalized training."
    },
    {
      question: "Can Congrevia integrate with our church website?",
      answer: "Yes, Congrevia offers integrations with popular church website platforms, allowing you to sync events, display giving options, and more."
    }
  ];

  // Scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Handle demo request
  const handleDemoRequest = (e) => {
    e.preventDefault();
    setShowDemoModal(true);
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <span className="text-indigo-600 font-bold text-2xl">Congrevia</span>
              <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-md">CMS</span>
            </div>
            
            <div className="-mr-2 -my-2 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <span className="sr-only">Open menu</span>
                <FiMenu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            <nav className="hidden md:flex space-x-10">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                FAQ
              </button>
            </nav>
            
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <button 
                onClick={handleLogin}
                className="whitespace-nowrap text-base font-medium text-gray-600 hover:text-gray-900"
              >
                Sign in
              </button>
              <button
                onClick={() => scrollToSection('demo')}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-blue-600 font-bold text-xl">Congrevia</span>
                </div>
                <div className="-mr-2">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                  >
                    <span className="sr-only">Close menu</span>
                    <FiX className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <button
                    onClick={() => scrollToSection('features')}
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  >
                    <span className="ml-3 text-base font-medium text-gray-900">
                      Features
                    </span>
                  </button>
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  >
                    <span className="ml-3 text-base font-medium text-gray-900">
                      Pricing
                    </span>
                  </button>
                  <button
                    onClick={() => scrollToSection('testimonials')}
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  >
                    <span className="ml-3 text-base font-medium text-gray-900">
                      Testimonials
                    </span>
                  </button>
                  <button
                    onClick={() => scrollToSection('faq')}
                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  >
                    <span className="ml-3 text-base font-medium text-gray-900">
                      FAQ
                    </span>
                  </button>
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div>
                <button
                  onClick={() => scrollToSection('demo')}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Get Started
                </button>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{' '}
                  <button
                    onClick={handleLogin}
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Modernized */}
      <div className="relative bg-gradient-to-br from-indigo-50 to-white overflow-hidden py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Simplify Your</span>
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Church Management</span>
              </h1>
              <p className="mt-4 text-lg text-gray-600 sm:mt-6 sm:text-xl max-w-xl mx-auto lg:mx-0">
                Congrevia helps you focus on your ministry by streamlining attendance, giving, member management, and communication in one intuitive platform.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                <button
                  onClick={() => scrollToSection('demo')}
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                >
                  Get Started
                </button>
                <button
                  onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white shadow-sm hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                >
                  <FiPlay className="mr-2" /> Watch Demo
                </button>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-500 flex items-center justify-center lg:justify-start">
                  <FiCheck className="text-green-500 mr-2" /> No credit card required
                  <span className="mx-2">•</span>
                  <FiCheck className="text-green-500 mr-2" /> Free 14-day trial
                </p>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative mx-auto max-w-md lg:max-w-full">
                <img
                  className="w-full h-auto rounded-lg shadow-lg"
                  src="/sample.png"
                  alt="Church management dashboard"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-100 to-transparent opacity-10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Churches Choose Congrevia Section - Updated with Feature Grid */}
      <div id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Churches Choose Congrevia
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Designed specifically for churches, Congrevia offers everything you need to manage your congregation effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1: Modern Dashboard */}
            <div className="bg-indigo-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <div className="text-indigo-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Modern Dashboard</h3>
              <p className="text-gray-600">
                Intuitive, customizable dashboard that gives you a real-time overview of your church's key metrics.
              </p>
            </div>
            
            {/* Feature 2: Member Management */}
            <div className="bg-indigo-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <div className="text-indigo-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Member Management</h3>
              <p className="text-gray-600">
                Comprehensive member profiles, attendance tracking, and engagement tools to nurture your congregation.
              </p>
            </div>
            
            {/* Feature 3: Group Management */}
            <div className="bg-indigo-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <div className="text-indigo-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Group Management</h3>
              <p className="text-gray-600">
                Organize and manage small groups, ministries, and teams with powerful collaboration tools.
              </p>
            </div>
            
            {/* Feature 4: Events & Calendar */}
            <div className="bg-indigo-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <div className="text-indigo-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Events & Calendar</h3>
              <p className="text-gray-600">
                Streamlined event planning, room scheduling, and registration management for all church activities.
              </p>
            </div>
            
            {/* Feature 5: Mass Messages */}
            <div className="bg-indigo-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <div className="text-indigo-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Mass Messages</h3>
              <p className="text-gray-600">
                Send targeted communications via email, SMS, and push notifications to keep everyone informed.
              </p>
            </div>
            
            {/* Feature 6: Financial Management */}
            <div className="bg-indigo-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <div className="text-indigo-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Financial Management</h3>
              <p className="text-gray-600">
                Track donations, manage budgets, and generate financial reports with ease and transparency.
              </p>
            </div>
            
            {/* Feature 7: Church Analytics */}
            <div className="bg-indigo-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <div className="text-indigo-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Church Analytics</h3>
              <p className="text-gray-600">
                Gain valuable insights with advanced analytics and reporting on attendance, giving, and growth trends.
              </p>
            </div>
            
            {/* Feature 8: Sermon Collaboration */}
            <div className="bg-indigo-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <div className="text-indigo-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sermon Collaboration</h3>
              <p className="text-gray-600">
                Plan, write, and share sermons with your team using our collaborative sermon preparation tools.
              </p>
            </div>
            
            {/* Feature 9: Pastoral Tools */}
            <div className="bg-indigo-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
              <div className="text-indigo-600 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Pastoral Tools</h3>
              <p className="text-gray-600">
                Specialized tools for pastoral care, visitation tracking, prayer requests, and counseling notes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section - Updated */}
      <div id="pricing" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Choose the plan that's right for your church
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Basic Plan */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <h3 className="text-2xl font-medium text-gray-900">Basic</h3>
                <p className="mt-4 text-gray-500">Perfect for small churches</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">$49</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Up to 200 member profiles</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Basic event management</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Email communication</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Simple donation tracking</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Standard reports</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Email support</p>
                  </li>
                </ul>
                <div className="mt-8">
                  <button className="w-full bg-white border border-indigo-600 rounded-md py-3 px-8 text-base font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            
            {/* Standard Plan */}
            <div className="bg-white rounded-2xl shadow-md border border-indigo-100 overflow-hidden relative hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 inset-x-0 h-2 bg-indigo-600"></div>
              <div className="absolute top-5 right-5">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  Popular
                </span>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-medium text-gray-900">Standard</h3>
                <p className="mt-4 text-gray-500">Ideal for growing churches</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">$99</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Up to 500 member profiles</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Advanced event management</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Email & SMS communication</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Complete financial management</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Ministry analytics</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Priority support</p>
                  </li>
                </ul>
                <div className="mt-8">
                  <button className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            
            {/* Premium Plan */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-8">
                <h3 className="text-2xl font-medium text-gray-900">Premium</h3>
                <p className="mt-4 text-gray-500">For established churches</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">$199</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <ul className="mt-8 space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Unlimited member profiles</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Complete event management</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Multi-channel communication</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Advanced financial tools</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Custom reporting</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-indigo-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">Dedicated account manager</p>
                  </li>
                </ul>
                <div className="mt-8">
                  <button className="w-full bg-white border border-indigo-600 rounded-md py-3 px-8 text-base font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-base text-gray-500">
              All plans include a 14-day free trial. No credit card required.
            </p>
            <p className="mt-4">
              <button onClick={() => scrollToSection('demo')} className="text-indigo-600 font-medium hover:text-indigo-500">
                Contact us for custom enterprise pricing →
              </button>
            </p>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section - Updated */}
      <div id="testimonials" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Loved by Church Leaders
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Hear what pastors and ministry leaders are saying about Congrevia.
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 relative">
              <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              <blockquote className="mt-8 text-lg text-gray-700 leading-relaxed">
                "Congrevia has completely transformed how we manage our church. The intuitive interface and powerful features have saved our staff countless hours."
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl">
                    PJ
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-base font-medium text-gray-900">Pastor James Wilson</div>
                  <div className="text-sm text-indigo-600">Grace Community Church</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 relative">
              <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              <blockquote className="mt-8 text-lg text-gray-700 leading-relaxed">
                "The financial management tools in Congrevia have given us incredible insights into our giving patterns. We can now make better-informed ministry decisions."
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl">
                    SM
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-base font-medium text-gray-900">Sarah Martinez</div>
                  <div className="text-sm text-indigo-600">Executive Pastor, Hillside Fellowship</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 relative">
              <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              <blockquote className="mt-8 text-lg text-gray-700 leading-relaxed">
                "As a small church with limited staff, Congrevia has been a game-changer. It's like having an extra admin person on our team!"
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl">
                    DT
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-base font-medium text-gray-900">David Thompson</div>
                  <div className="text-sm text-indigo-600">Lead Pastor, New Life Church</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div id="faq" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">FAQ</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently asked questions
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Find answers to common questions about Congrevia.
            </p>
          </div>
          
          <div className="mt-12">
            <dl className="space-y-6 divide-y divide-gray-200">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <dt className="text-lg font-medium text-gray-900">How much does Congrevia cost?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Congrevia offers three pricing tiers starting at $49/month for our Basic plan. We also offer a 14-day free trial so you can try before you buy.
                </dd>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <dt className="text-lg font-medium text-gray-900">Can I import my existing church database?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes! Congrevia makes it easy to import your existing data from spreadsheets or other church management systems. Our team can help with the migration process.
                </dd>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <dt className="text-lg font-medium text-gray-900">Is Congrevia secure?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Absolutely. We use industry-standard encryption and security practices to protect your data. Your information is backed up regularly and stored securely.
                </dd>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <dt className="text-lg font-medium text-gray-900">Do you offer support?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes, all plans include access to our support team. Premium plans include dedicated support with faster response times.
                </dd>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <dt className="text-lg font-medium text-gray-900">Can I try Congrevia before committing?</dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes, we offer a 14-day free trial with full access to all features. No credit card required to start your trial.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div id="demo" className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Ready to simplify your church management?
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Get started with Congrevia today and see how our platform can help your church thrive.
                </p>
                
                <form onSubmit={handleDemoRequest} className="mt-8 space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Request a Demo
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-500 text-center">
                    Or <button onClick={handleLogin} className="font-medium text-blue-600 hover:text-blue-500">sign in</button> to your account
                  </div>
                </form>
              </div>
              
              <div className="hidden lg:block relative h-full">
                <img 
                  src="/sample4.png" 
                  alt="Church management dashboard" 
                  className="absolute inset-0 w-full h-full object-contain p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Congrevia</h3>
              <p className="text-gray-300 text-sm">
                Simplifying church management for communities of all sizes.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><button onClick={() => scrollToSection('features')}>Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')}>Pricing</button></li>
                <li><a href="#">Security</a></li>
                <li><a href="#">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} Congrevia. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.748 1.15.748.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Demo Request Success Modal */}
      {showDemoModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <FiCheck className="h-6 w-6 text-green-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Demo Request Received!
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Thank you for your interest in Congrevia. One of our team members will contact you shortly to schedule your personalized demo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => setShowDemoModal(false)}
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
