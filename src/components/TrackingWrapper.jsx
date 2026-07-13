import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../lib/analytics';

/**
 * Wrapper component that tracks page views on the public site.
 * Does NOT track admin pages (those start with /Oscar.admin).
 */
function TrackingWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Only track public pages, not admin pages
    if (!location.pathname.startsWith('/Oscar.admin')) {
      trackPageView(location.pathname);
    }
  }, [location.pathname]);

  return children;
}

export default TrackingWrapper;