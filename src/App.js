import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Events from './pages/Events';
import Giving from './pages/Giving';
import Analytics from './pages/Analytics';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import ChurchProfile from './pages/ChurchProfile';
import LandingPage from './pages/LandingPage';
import PastoralCare from './pages/PastoralCare';
import Footer from './components/Footer';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages instead of importing them directly
const SmallGroups = lazy(() => import('./pages/SmallGroups'));
const Calendar = lazy(() => import('./pages/Calendar'));
const Financial = lazy(() => import('./pages/Financial'));
const HelpSupport = lazy(() => import('./pages/HelpSupport'));
const SystemStatus = lazy(() => import('./pages/SystemStatus'));
const Integrations = lazy(() => import('./pages/Integrations'));
const BackupRecovery = lazy(() => import('./pages/BackupRecovery'));
const Tasks = lazy(() => import('./pages/Tasks'));
const SermonCollaboration = lazy(() => import('./pages/SermonCollaboration'));
const MinistryAnalytics = lazy(() => import('./pages/MinistryAnalytics'));
const ChurchHealthAssessment = lazy(() => import('./pages/ChurchHealthAssessment'));
const WhyCongrevia = lazy(() => import('./pages/WhyCongrevia'));
const RecentActivities = lazy(() => import('./pages/RecentActivities'));
const Schedule = lazy(() => import('./pages/Schedule'));
const Support = lazy(() => import('./pages/Support'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear any user session data if needed
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    
    // Update the logged in state
    setIsLoggedIn(false);
    
    // The router will automatically redirect to the landing page
    // since the isLoggedIn state is now false
  };

  useEffect(() => {
    // Set the document title with a slight delay to ensure it updates
    document.title = "Congrevia - Church Management Simplified";
    
    // Add a backup mechanism to ensure title is set
    const titleInterval = setInterval(() => {
      if (document.title !== "Congrevia - Church Management Simplified") {
        document.title = "Congrevia - Church Management Simplified";
      }
    }, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(titleInterval);
  }, []);

  // Dashboard layout with sidebar and header
  const DashboardLayout = ({ children }) => (
    <div className="flex h-screen bg-white">
      <aside className={`fixed top-0 left-0 h-full transition-all duration-300 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        <Sidebar onToggle={handleSidebarToggle} onLogout={handleLogout} />
      </aside>
      
      <div className={`flex flex-col flex-1 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 bg-white mt-14">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );

  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><LoadingSpinner /></div>}>
          {isLoggedIn ? (
            <div className="flex h-screen bg-gray-100">
              <Sidebar onLogout={handleLogout} />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar onLogout={handleLogout} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pt-16">
                  <ErrorBoundary>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/members" element={<Members />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/giving" element={<Giving />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/messages" element={<Messages />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/church-profile" element={<ChurchProfile />} />
                      <Route path="/pastoral-care" element={<PastoralCare />} />
                      <Route path="/small-groups" element={<SmallGroups />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/financial" element={<Financial />} />
                      <Route path="/help-support" element={<HelpSupport />} />
                      <Route path="/system-status" element={<SystemStatus />} />
                      <Route path="/integrations" element={<Integrations />} />
                      <Route path="/backup-recovery" element={<BackupRecovery />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/sermon-collaboration" element={<SermonCollaboration />} />
                      <Route path="/ministry-analytics" element={<MinistryAnalytics />} />
                      <Route path="/church-health-assessment" element={<ChurchHealthAssessment />} />
                      <Route path="/why-congrevia" element={<WhyCongrevia />} />
                      <Route path="/recent-activities" element={<RecentActivities />} />
                      <Route path="/schedule" element={<Schedule />} />
                    </Routes>
                  </ErrorBoundary>
                </main>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
              <Route path="/why-congrevia" element={<WhyCongrevia />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/support" element={<Support />} />
              <Route path="/help-support" element={<HelpSupport />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App; 