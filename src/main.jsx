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
            {/* Admin */}
            <Route path="/Oscar.admin">
              {/* index = login page */}
              <Route index element={<AdminLogin />} />
              {/* layout wraps all sub-pages */}
              <Route
                element={
                  <RequireAuth>
                    <AdminLayout />
                  </RequireAuth>
                }
              >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="media" element={<MediaPage />} />
                <Route path="security" element={<SecurityPage />} />
                <Route path="config" element={<ConfigPage />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Route>
            </Route>

            {/* Public portfolio */}
            <Route path="/*" element={<App />} />
          </Routes>
        </TrackingWrapper>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);