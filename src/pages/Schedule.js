import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMessageSquare,
  FiCheck,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';

const Schedule = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    churchName: '',
    churchSize: '',
    currentSystem: '',
    preferredDate: '',
    preferredTime: '',
    additionalInfo: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [showFaq, setShowFaq] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      churchName: '',
      churchSize: '',
      currentSystem: '',
      preferredDate: '',
      preferredTime: '',
      additionalInfo: ''
    });
  };
  
  const toggleFaq = (index) => {
    setShowFaq(showFaq === index ? null : index);
  };
  
  const faqs = [
    {
      question: "How long does the migration process take?",
      answer: "The migration timeline varies depending on the size of your church and the complexity of your data. Typically, migrations take between 1-3 weeks. During our consultation, we'll provide a more accurate timeline based on your specific needs."
    },
    {
      question: "What information do I need to prepare for the migration?",
      answer: "To ensure a smooth migration, we recommend having access to your current system's export features, a list of all data types you want to migrate (members, groups, donations, etc.), and any custom fields or categories you've created."
    },
    {
      question: "Will my data be secure during the migration?",
      answer: "Absolutely. We use industry-standard encryption and security protocols throughout the migration process. Your data is never stored on unsecured servers, and we sign a data processing agreement before beginning the migration."
    },
    {
      question: "Can I continue using my current system during migration?",
      answer: "Yes, you can continue using your current system during most of the migration process. We'll coordinate with you to determine a brief transition period (usually 24-48 hours) when we'll need to freeze data entry to complete the final migration."
    },
    {
      question: "What if I have custom data that doesn't fit Congrevia's standard fields?",
      answer: "Congrevia offers extensive customization options. During the consultation, we'll discuss your custom data needs and develop a plan to map your existing custom fields to Congrevia's platform or create new custom fields as needed."
    }
  ];
  
  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8">
          <Link to="/why-congrevia" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
            <FiArrowLeft className="mr-2" />
            Back to Why Choose Congrevia
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-green-600" size={30} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Consultation Scheduled!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your interest in migrating to Congrevia. One of our migration specialists will contact you within 1 business day to confirm your consultation.
          </p>
          <div className="max-w-md mx-auto bg-indigo-50 rounded-lg p-6 mb-8">
            <p className="text-gray-700 mb-2">
              <strong>Next Steps:</strong>
            </p>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-start">
                <FiCheck className="text-indigo-600 mt-1 mr-2 flex-shrink-0" />
                <span>Check your email for a confirmation message</span>
              </li>
              <li className="flex items-start">
                <FiCheck className="text-indigo-600 mt-1 mr-2 flex-shrink-0" />
                <span>Prepare any questions you have about the migration process</span>
              </li>
              <li className="flex items-start">
                <FiCheck className="text-indigo-600 mt-1 mr-2 flex-shrink-0" />
                <span>Gather information about your current church management system</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors">
              Return to Home
            </Link>
            <Link to="/support" className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link to="/why-congrevia" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
          <FiArrowLeft className="mr-2" />
          Back to Why Choose Congrevia
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-8 text-white">
              <h1 className="text-2xl font-bold mb-2">Schedule Your Migration Consultation</h1>
              <p className="opacity-90">
                Let our experts guide you through a seamless transition to Congrevia
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="John Smith"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="john@yourchurch.org"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="churchName" className="block text-sm font-medium text-gray-700 mb-1">
                    Church Name*
                  </label>
                  <input
                    type="text"
                    id="churchName"
                    name="churchName"
                    value={formData.churchName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Grace Community Church"
                  />
                </div>
                
                <div>
                  <label htmlFor="churchSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Church Size
                  </label>
                  <select
                    id="churchSize"
                    name="churchSize"
                    value={formData.churchSize}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select church size</option>
                    <option value="1-50">1-50 members</option>
                    <option value="51-100">51-100 members</option>
                    <option value="101-250">101-250 members</option>
                    <option value="251-500">251-500 members</option>
                    <option value="501-1000">501-1000 members</option>
                    <option value="1000+">1000+ members</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="currentSystem" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Church Management System
                  </label>
                  <input
                    type="text"
                    id="currentSystem"
                    name="currentSystem"
                    value={formData.currentSystem}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="e.g., Planning Center, Breeze, etc."
                  />
                </div>
                
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Consultation Date*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiClock className="text-gray-400" />
                    </div>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Select a time</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <FiMessageSquare className="text-gray-400" />
                  </div>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={4}
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Tell us about any specific migration concerns or questions you have..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Schedule Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Right Column - Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">What to Expect</h2>
            <ul className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <span className="text-indigo-600 text-sm font-medium">1</span>
                </div>
                <div>
                  <h3 className="text-gray-700 font-medium">Initial Consultation</h3>
                  <p className="text-gray-600 text-sm">
                    A 30-minute call to discuss your current system and migration needs
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <span className="text-indigo-600 text-sm font-medium">2</span>
                </div>
                <div>
                  <h3 className="text-gray-700 font-medium">Custom Migration Plan</h3>
                  <p className="text-gray-600 text-sm">
                    We'll create a tailored plan for your church's specific needs
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <span className="text-indigo-600 text-sm font-medium">3</span>
                </div>
                <div>
                  <h3 className="text-gray-700 font-medium">Data Migration</h3>
                  <p className="text-gray-600 text-sm">
                    Our team handles the technical work of moving your data
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <span className="text-indigo-600 text-sm font-medium">4</span>
                </div>
                <div>
                  <h3 className="text-gray-700 font-medium">Training & Launch</h3>
                  <p className="text-gray-600 text-sm">
                    We'll help you get started with your new Congrevia system
                  </p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    {showFaq === index ? (
                      <FiChevronUp className="text-indigo-500 flex-shrink-0" />
                    ) : (
                      <FiChevronDown className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {showFaq === index && (
                    <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule; 