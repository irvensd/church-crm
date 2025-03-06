import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiArrowRight, 
  FiSmartphone, 
  FiLifeBuoy, 
  FiBook, 
  FiRefreshCw,
  FiCheck,
  FiDownload,
  FiMessageSquare,
  FiUsers,
  FiStar
} from 'react-icons/fi';

const WhyCongrevia = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header - adjusted with more padding at the top and bottom */}
      <div className="mb-12 pt-8">
        <div className="flex items-center mb-4">
          <Link to="/" className="mr-4 text-gray-500 hover:text-gray-700">
            <FiArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Why Choose Congrevia?</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Discover how Congrevia stands out from other church management solutions with features designed specifically for modern ministry needs.
        </p>
      </div>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 mb-12 text-white">
        <h2 className="text-3xl font-bold mb-4">The Congrevia Difference</h2>
        <p className="text-xl opacity-90 mb-6">
          We've built Congrevia after studying what makes other church management systems fall short. Our platform is designed to be intuitive, powerful, and ministry-focused.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="flex items-start">
            <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
              <FiCheck size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Built for All Church Sizes</h3>
              <p className="opacity-80">From small congregations to multi-campus churches</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
              <FiCheck size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No Technical Expertise Required</h3>
              <p className="opacity-80">Intuitive design that anyone can use</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
              <FiCheck size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Ministry-First Approach</h3>
              <p className="opacity-80">Tools that support your calling, not complicate it</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-white bg-opacity-20 p-2 rounded-full mr-4">
              <FiCheck size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Affordable Pricing</h3>
              <p className="opacity-80">Plans that work with your church budget</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Competitive Advantages */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Our Competitive Advantages</h2>
        
        {/* Seamless Migration */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-blue-50 flex items-center justify-center md:w-48">
              <FiRefreshCw size={64} className="text-blue-500" />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Painless Transition</div>
              <h3 className="mt-1 text-xl font-semibold text-gray-900">Seamless Migration</h3>
              <p className="mt-2 text-gray-600">
                Switching to Congrevia is easy with our dedicated migration team. We'll handle the transfer of your data from any competitor platform, ensuring nothing gets lost in the process.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <FiCheck size={18} className="text-green-500 mr-2" />
                  <span className="text-gray-700">Free data migration for annual plans</span>
                </div>
                <div className="flex items-center">
                  <FiCheck size={18} className="text-green-500 mr-2" />
                  <span className="text-gray-700">Step-by-step migration assistance</span>
                </div>
                <div className="flex items-center">
                  <FiCheck size={18} className="text-green-500 mr-2" />
                  <span className="text-gray-700">Parallel system operation during transition</span>
                </div>
              </div>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  Schedule Migration Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Superior Mobile Experience */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-purple-50 flex items-center justify-center md:w-48">
              <FiSmartphone size={64} className="text-purple-500" />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Mobile-First Design</div>
              <h3 className="mt-1 text-xl font-semibold text-gray-900">Superior Mobile Experience</h3>
              <p className="mt-2 text-gray-600">
                Most church software has poor mobile interfaces. Congrevia is designed to be fully functional on any device, giving your team the freedom to manage ministry from anywhere.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <FiCheck size={18} className="text-green-500 mr-2" />
                  <span className="text-gray-700">Fully responsive design works on any device</span>
                </div>
                <div className="flex items-center">
                  <FiCheck size={18} className="text-green-500 mr-2" />
                  <span className="text-gray-700">Native iOS and Android apps</span>
                </div>
                <div className="flex items-center">
                  <FiCheck size={18} className="text-green-500 mr-2" />
                  <span className="text-gray-700">Offline mode for when you're on the go</span>
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
                  </svg>
                  App Store
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.94 5.5c.944-.945 2.56-.276 2.56 1.06V10l5.5-5.5a8.049 8.049 0 00-5.5-2.015c-2.1 0-3.5 1.6-2.56 2.515z" clipRule="evenodd" />
                  </svg>
                  Google Play
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Exceptional Support */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-green-50 flex items-center justify-center md:w-48">
              <FiLifeBuoy size={64} className="text-green-500" />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Always There For You</div>
              <h3 className="mt-1 text-xl font-semibold text-gray-900">Exceptional Support</h3>
              <p className="mt-2 text-gray-600">
                Our support team understands ministry. Get help when you need it through multiple channels, with dedicated account managers for larger churches.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <FiCheck size={18} className="text-green-500 mr-2" />
                  <span className="text-gray-700">Live chat support 7 days a week</span>
                </div>
                <div className="flex items-center">
                  <FiCheck size={18} className="text-green-500 mr-2" />
                  <span className="text-gray-700">Phone support during business hours</span>
                </div>
                <div className="flex items-center">
                  <FiCheck size={18} className="text-green-500 mr-2" />
                  <span className="text-gray-700">Dedicated account managers for premium plans</span>
                </div>
              </div>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                  <FiMessageSquare className="mr-2" size={16} />
                  Chat with Support
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Training Academy */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-yellow-50 flex items-center justify-center md:w-48">
              <FiBook size={64} className="text-yellow-500" />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Learn & Grow</div>
              <h3 className="mt-1 text-xl font-semibold text-gray-900">Training Academy</h3>
              <p className="mt-2 text-gray-600">
                Our comprehensive training resources ensure your team can maximize the platform's potential. From video tutorials to live webinars, we've got you covered.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <FiCheck size={18} className="text-green-500 mr-2" />
                  <span className="text-gray-700">On-demand video library with 100+ tutorials</span>
                </div>
                <div className="flex items-center">
                  <FiCheck size={18} className="text-green-500 mr-2" />
                  <span className="text-gray-700">Weekly live training webinars</span>
                </div>
                <div className="flex items-center">
                  <FiCheck size={18} className="text-green-500 mr-2" />
                  <span className="text-gray-700">Customized training for your staff</span>
                </div>
              </div>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700">
                  <FiBook className="mr-2" size={16} />
                  Explore Training Resources
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium mr-4">
                JD
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Pastor John Davis</h3>
                <p className="text-gray-600 text-sm">Grace Community Church</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-2">
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
            </div>
            <p className="text-gray-700">
              "Switching to Congrevia was the best decision we made. The migration was seamless, and the mobile app allows me to stay connected with our congregation even when I'm out visiting members."
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium mr-4">
                SM
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Sarah Mitchell</h3>
                <p className="text-gray-600 text-sm">Church Administrator</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-2">
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
              <FiStar className="fill-current" />
            </div>
            <p className="text-gray-700">
              "The support team at Congrevia is incredible. Whenever we have a question, they respond quickly and actually understand our ministry needs. The training resources have made onboarding our volunteers so much easier."
            </p>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-blue-600 rounded-xl p-8 text-white text-center mb-16">
        <h2 className="text-2xl font-bold mb-4">Ready to experience the Congrevia difference?</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Join thousands of churches that have transformed their ministry management with our platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50">
            Start Free Trial
          </button>
          <button className="px-6 py-3 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800">
            Schedule Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyCongrevia; 