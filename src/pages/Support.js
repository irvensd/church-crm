import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiMail, 
  FiPhone, 
  FiMessageSquare, 
  FiHelpCircle,
  FiBook,
  FiVideo,
  FiFileText,
  FiChevronDown,
  FiChevronUp,
  FiCheck
} from 'react-icons/fi';

const Support = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', contactForm);
    setSubmitted(true);
    // Reset form after submission
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password."
    },
    {
      question: "Can I import data from another church management system?",
      answer: "Yes! Congrevia offers comprehensive data migration services. Schedule a migration consultation, and our team will guide you through the process of transferring your data from your current system."
    },
    {
      question: "Is my church's data secure with Congrevia?",
      answer: "Absolutely. We use industry-standard encryption and security protocols to protect your data. All information is stored on secure servers with regular backups, and we never share your data with third parties without your explicit permission."
    },
    {
      question: "How often are new features added to Congrevia?",
      answer: "We release updates and new features on a monthly basis. Our development roadmap is influenced by customer feedback, so we encourage you to share your suggestions with our support team."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) as well as ACH bank transfers for annual plans. We also offer special payment arrangements for churches with unique financial situations."
    }
  ];
  
  const resources = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of setting up your church in Congrevia",
      icon: <FiBook className="text-indigo-500" size={24} />,
      link: "#"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step visual guides for all major features",
      icon: <FiVideo className="text-indigo-500" size={24} />,
      link: "#"
    },
    {
      title: "Feature Documentation",
      description: "Detailed explanations of all Congrevia features",
      icon: <FiFileText className="text-indigo-500" size={24} />,
      link: "#"
    },
    {
      title: "Administrator Guide",
      description: "Best practices for church administrators",
      icon: <FiHelpCircle className="text-indigo-500" size={24} />,
      link: "#"
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
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Message Sent!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for reaching out to our support team. We'll get back to you within 24 hours.
          </p>
          <div className="max-w-md mx-auto bg-indigo-50 rounded-lg p-6 mb-8">
            <p className="text-gray-700 mb-2">
              <strong>While you wait:</strong>
            </p>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-start">
                <FiCheck className="text-indigo-600 mt-1 mr-2 flex-shrink-0" />
                <span>Check out our <a href="#" className="text-indigo-600 hover:underline">knowledge base</a> for immediate answers</span>
              </li>
              <li className="flex items-start">
                <FiCheck className="text-indigo-600 mt-1 mr-2 flex-shrink-0" />
                <span>Browse our <a href="#" className="text-indigo-600 hover:underline">video tutorials</a> for visual guidance</span>
              </li>
              <li className="flex items-start">
                <FiCheck className="text-indigo-600 mt-1 mr-2 flex-shrink-0" />
                <span>Review our <a href="#" className="text-indigo-600 hover:underline">FAQs</a> for common questions</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors">
              Return to Home
            </Link>
            <Link to="/why-congrevia" className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
              Learn More About Congrevia
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
      
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">How Can We Help You?</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our support team is here to ensure your success with Congrevia. Choose an option below to get the help you need.
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
        <div className="flex border-b">
          <button
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'contact'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Support
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'faq'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('faq')}
          >
            Frequently Asked Questions
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'resources'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('resources')}
          >
            Support Resources
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'contact' && (
            <div>
              <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                        <FiMail className="text-indigo-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Email Support</h3>
                        <p className="text-gray-600">support@congrevia.com</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Response time: Within 24 hours
                    </p>
                  </div>
                  
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                        <FiPhone className="text-indigo-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Phone Support</h3>
                        <p className="text-gray-600">(555) 123-4567</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Available Monday-Friday, 9am-5pm EST
                    </p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="John Smith"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="john@yourchurch.org"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject*
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Please describe your issue or question in detail..."
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {activeTab === 'faq' && (
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <button
                      className="flex justify-between items-center w-full text-left"
                      onClick={() => toggleFaq(index)}
                    >
                      <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                      {expandedFaq === index ? (
                        <FiChevronUp className="text-indigo-500 flex-shrink-0" />
                      ) : (
                        <FiChevronDown className="text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <p className="mt-3 text-gray-600">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Don't see your question here?</p>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Contact Our Support Team
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'resources' && (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.link}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow flex items-start"
                  >
                    <div className="mr-4 mt-1">{resource.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">{resource.title}</h3>
                      <p className="text-gray-600 text-sm">{resource.description}</p>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="mt-12 bg-indigo-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Need Personalized Training?</h3>
                <p className="text-gray-600 mb-6">
                  We offer custom training sessions for your church staff. Our experts can guide you through setting up and using Congrevia effectively for your specific ministry needs.
                </p>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Request Training Session
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support; 