import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import TrackingWrapper from './components/TrackingWrapper';
import {
  AdminLogin,
  AdminLayout,
  AdminDashboard,
  AnalyticsPage,
  UserManagement,
  SecurityPage,
  ConfigPage,
} from './components/admin';
import { isAuthenticated } from './lib/auth';
import './index.css';

/**
 * Protected route wrapper for admin pages.
 * Redirects to login if not authenticated.
 */
function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/Oscar.admin" replace />;
  }
  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TrackingWrapper>
        <Routes>
          {/* ===== PRIVATE ADMIN ROUTES ===== */}
          {/* Must come BEFORE the catch-all public route for proper matching */}
          {/* Login page at /Oscar.admin */}
          <Route path="/Oscar.admin" element={<AdminLogin />} />

          {/* Protected admin routes wrapped in AdminLayout */}
          <Route
            path="/Oscar.admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="security" element={<SecurityPage />} />
            <Route path="config" element={<ConfigPage />} />
            {/* Default redirect from /Oscar.admin/* to dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* ===== PUBLIC ROUTES ===== */}
          {/* The main portfolio - no admin links visible here */}
          {/* Catch-all must come LAST so admin routes match first */}
          <Route path="/*" element={<App />} />
        </Routes>
      </TrackingWrapper>
    </BrowserRouter>
  </React.StrictMode>
);