import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
 * Checks auth and redirects to login if not authenticated.
 * Only the single source of truth for auth gating.
 */
function ProtectedRoute({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/Oscar.admin" replace state={{ from: location }} />;
  }
  return children;
}

// Admin routes wrapped in ProtectedRoute
function AdminRoutes() {
  return (
    <ProtectedRoute>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="config" element={<ConfigPage />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <TrackingWrapper>
          <Routes>
            {/* ===== ADMIN ROUTES ===== */}
            <Route path="/Oscar.admin" element={<AdminLogin />} />
            <Route path="/Oscar.admin/*" element={<AdminRoutes />} />

            {/* ===== PUBLIC ROUTES ===== */}
            <Route path="/*" element={<App />} />
          </Routes>
        </TrackingWrapper>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);