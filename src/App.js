import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ROLES } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';

// Lazy load all pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Members = lazy(() => import('./pages/Members'));
const Events = lazy(() => import('./pages/Events'));
const Giving = lazy(() => import('./pages/Giving'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Messages = lazy(() => import('./pages/Messages'));
const Settings = lazy(() => import('./pages/Settings'));
const ChurchProfile = lazy(() => import('./pages/ChurchProfile'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const PastoralCare = lazy(() => import('./pages/PastoralCare'));
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

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  const handleLogout = () => {
    // Clear any user session data if needed
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    localStorage.removeItem('church_crm_user');
    localStorage.removeItem('church_crm_settings');
    localStorage.removeItem('church_crm_recent_activities');
    localStorage.removeItem('church_crm_preferences');
    
    // Force a hard redirect to the landing page
    window.location.href = '/';
  };

  useEffect(() => {
    document.title = "Congrevia - Church Management Simplified";
    
    const titleInterval = setInterval(() => {
      if (document.title !== "Congrevia - Church Management Simplified") {
        document.title = "Congrevia - Church Management Simplified";
      }
    }, 1000);
    
    return () => clearInterval(titleInterval);
  }, []);

  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><LoadingSpinner /></div>}>
      {isAuthenticated ? (
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/why-congrevia" element={<WhyCongrevia />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/support" element={<Support />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 