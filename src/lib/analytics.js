// Private Admin Analytics Module
// Tracks: web views, unique visitors, page views, referrers, device info

const ANALYTICS_KEY = 'oscar_admin_analytics';
const TRACKING_ENABLED_KEY = 'oscar_tracking_enabled';

/**
 * Initialize analytics storage if not exists
 */
function initStorage() {
  if (!localStorage.getItem(ANALYTICS_KEY)) {
    const initialData = {
      totalPageViews: 0,
      totalUniqueVisitors: 0,
      pageViews: [],       // { path, timestamp, referrer, userAgent }
      visitors: [],        // { visitorId, firstVisit, lastVisit, visitCount, device, browser, os }
      dailyStats: {},      // { 'YYYY-MM-DD': { views: n, uniqueVisitors: n } }
      referrers: {},       // { referrer: count }
      pages: {},           // { path: count }
      browsers: {},        // { browser: count }
      devices: {},         // { device: count }
      screenSizes: {},     // { 'WxH': count }
    };
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(initialData));
  }
}

/**
 * Parse user agent string for browser, OS, device info
 */
function parseUserAgent(ua) {
  const info = { browser: 'Unknown', os: 'Unknown', device: 'Desktop' };

  if (!ua) return info;

  // Browser detection
  if (ua.includes('Firefox')) info.browser = 'Firefox';
  else if (ua.includes('Edg')) info.browser = 'Edge';
  else if (ua.includes('Chrome')) info.browser = 'Chrome';
  else if (ua.includes('Safari')) info.browser = 'Safari';
  else if (ua.includes('Opera')) info.browser = 'Opera';

  // OS detection
  if (ua.includes('Windows')) info.os = 'Windows';
  else if (ua.includes('Mac')) info.os = 'macOS';
  else if (ua.includes('Linux')) info.os = 'Linux';
  else if (ua.includes('Android')) info.os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) info.os = 'iOS';

  // Device detection
  if (ua.includes('Mobile')) info.device = 'Mobile';
  else if (ua.includes('Tablet') || ua.includes('iPad')) info.device = 'Tablet';

  return info;
}

/**
 * Generate or retrieve a unique visitor ID
 */
function getVisitorId() {
  let visitorId = localStorage.getItem('oscar_visitor_id');
  if (!visitorId) {
    visitorId = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('oscar_visitor_id', visitorId);
  }
  return visitorId;
}

/**
 * Check if tracking is enabled
 */
export function isTrackingEnabled() {
  const enabled = localStorage.getItem(TRACKING_ENABLED_KEY);
  return enabled === null ? true : enabled === 'true';
}

/**
 * Enable or disable tracking
 */
export function setTrackingEnabled(enabled) {
  localStorage.setItem(TRACKING_ENABLED_KEY, enabled.toString());
}

/**
 * Track a page view
 */
export function trackPageView(path) {
  if (!isTrackingEnabled()) return;

  initStorage();

  const analytics = JSON.parse(localStorage.getItem(ANALYTICS_KEY));
  const visitorId = getVisitorId();
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const ua = navigator.userAgent;
  const agentInfo = parseUserAgent(ua);
  const referrer = document.referrer || 'Direct';

  // Increment total page views
  analytics.totalPageViews++;

  // Add page view entry
  analytics.pageViews.push({
    path: path,
    timestamp: now.toISOString(),
    referrer: referrer,
    userAgent: ua,
    visitorId: visitorId,
  });

  // Track page hits
  analytics.pages[path] = (analytics.pages[path] || 0) + 1;

  // Track referrers
  const refKey = referrer.split('/')[2] || referrer;
  analytics.referrers[refKey] = (analytics.referrers[refKey] || 0) + 1;

  // Track browser
  analytics.browsers[agentInfo.browser] = (analytics.browsers[agentInfo.browser] || 0) + 1;

  // Track device
  analytics.devices[agentInfo.device] = (analytics.devices[agentInfo.device] || 0) + 1;

  // Track screen size
  const screenSize = `${window.screen.width}x${window.screen.height}`;
  analytics.screenSizes[screenSize] = (analytics.screenSizes[screenSize] || 0) + 1;

  // Daily stats
  if (!analytics.dailyStats[today]) {
    analytics.dailyStats[today] = { views: 0, uniqueVisitors: 0 };
  }
  analytics.dailyStats[today].views++;

  // Track unique visitors
  const existingVisitor = analytics.visitors.find(v => v.visitorId === visitorId);

  if (!existingVisitor) {
    // New visitor
    analytics.visitors.push({
      visitorId: visitorId,
      firstVisit: now.toISOString(),
      lastVisit: now.toISOString(),
      visitCount: 1,
      device: agentInfo.device,
      browser: agentInfo.browser,
      os: agentInfo.os,
      screenSize: screenSize,
      referrer: referrer,
      firstPath: path,
      lastPath: path,
    });
    analytics.totalUniqueVisitors++;
    analytics.dailyStats[today].uniqueVisitors++;
  } else {
    // Returning visitor
    existingVisitor.lastVisit = now.toISOString();
    existingVisitor.visitCount++;
    existingVisitor.lastPath = path;
    existingVisitor.browser = agentInfo.browser;
    existingVisitor.os = agentInfo.os;
    existingVisitor.device = agentInfo.device;
  }

  // Keep only last 1000 page views to prevent storage overflow
  if (analytics.pageViews.length > 1000) {
    analytics.pageViews = analytics.pageViews.slice(-1000);
  }

  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
}

/**
 * Get all analytics data
 */
export function getAnalytics() {
  initStorage();
  return JSON.parse(localStorage.getItem(ANALYTICS_KEY));
}

/**
 * Get analytics summary
 */
export function getAnalyticsSummary() {
  const analytics = getAnalytics();
  return {
    totalPageViews: analytics.totalPageViews,
    totalUniqueVisitors: analytics.totalUniqueVisitors,
    todayStats: analytics.dailyStats[new Date().toISOString().split('T')[0]] || { views: 0, uniqueVisitors: 0 },
    topPages: Object.entries(analytics.pages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10),
    topReferrers: Object.entries(analytics.referrers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10),
    browserDistribution: analytics.browsers,
    deviceDistribution: analytics.devices,
    dailyStats: analytics.dailyStats,
  };
}

/**
 * Clear all analytics data
 */
export function clearAnalytics() {
  localStorage.removeItem(ANALYTICS_KEY);
  initStorage();
}

/**
 * Export analytics as JSON
 */
export function exportAnalytics() {
  return JSON.stringify(getAnalytics(), null, 2);
}

/**
 * Get recent page views (last 50)
 */
export function getRecentPageViews(limit = 50) {
  const analytics = getAnalytics();
  return analytics.pageViews.slice(-limit).reverse();
}

/**
 * Get visitor list
 */
export function getVisitors() {
  const analytics = getAnalytics();
  return analytics.visitors.sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit));
}