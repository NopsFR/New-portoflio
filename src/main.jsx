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

function RequireAuth({ children }) {
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
            {/* Admin login page */}
            <Route path="/Oscar.admin" element={<AdminLogin />} />
            
            {/* Admin sub-routes — wrapped in Auth + Layout */}
            <Route
              path="/Oscar.admin/dashboard"
              element={<RequireAuth><AdminLayout><AdminDashboard /></AdminLayout></RequireAuth>}
            />
            <Route
              path="/Oscar.admin/analytics"
              element={<RequireAuth><AdminLayout><AnalyticsPage /></AdminLayout></RequireAuth>}
            />
            <Route
              path="/Oscar.admin/users"
              element={<RequireAuth><AdminLayout><UserManagement /></AdminLayout></RequireAuth>}
            />
            <Route
              path="/Oscar.admin/media"
              element={<RequireAuth><AdminLayout><MediaPage /></AdminLayout></RequireAuth>}
            />
            <Route
              path="/Oscar.admin/security"
              element={<RequireAuth><AdminLayout><SecurityPage /></AdminLayout></RequireAuth>}
            />
            <Route
              path="/Oscar.admin/config"
              element={<RequireAuth><AdminLayout><ConfigPage /></AdminLayout></RequireAuth>}
            />

            {/* Public portfolio */}
            <Route path="/*" element={<App />} />
          </Routes>
        </TrackingWrapper>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);