import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import TrackingWrapper from './components/TrackingWrapper';
import ErrorBoundary from './components/ErrorBoundary';
import {
  AdminLogin,
  AdminLayout,
  AdminDashboard,
  AnalyticsPage,
  UserManagement,
  SecurityPage,
  ConfigPage,
  MediaPage,
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
    <ErrorBoundary>
      <BrowserRouter>
        <TrackingWrapper>
          <Routes>
          {/* ===== PRIVATE ADMIN ROUTES ===== */}
          <Route path="/Oscar.admin" element={<AdminLogin />} />

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
            <Route path="media" element={<MediaPage />} />
            <Route path="security" element={<SecurityPage />} />
            <Route path="config" element={<ConfigPage />} />
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/*" element={<App />} />
          </Routes>
        </TrackingWrapper>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
