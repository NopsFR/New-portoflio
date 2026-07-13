import React, { useState, useEffect } from 'react';
import {
  getAnalytics,
  getAnalyticsSummary,
  clearAnalytics,
  exportAnalytics,
  isTrackingEnabled,
  setTrackingEnabled,
} from '../../lib/analytics';
import {
  Eye,
  Download,
  Trash2,
  BarChart3,
  Globe,
  Monitor,
  Smartphone,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [summary, setSummary] = useState(null);
  const [tracking, setTracking] = useState(true);

  useEffect(() => {
    loadData();
    setTracking(isTrackingEnabled());
  }, []);

  function loadData() {
    setAnalytics(getAnalytics());
    setSummary(getAnalyticsSummary());
  }

  function handleClear() {
    if (window.confirm('Are you sure you want to clear ALL analytics data? This cannot be undone.')) {
      clearAnalytics();
      loadData();
    }
  }

  function handleExport() {
    const data = exportAnalytics();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function toggleTracking() {
    const newState = !tracking;
    setTracking(newState);
    setTrackingEnabled(newState);
  }

  // Generate daily chart data for last 7 days
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    last7Days.push({
      date: key,
      label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      views: summary?.dailyStats?.[key]?.views || 0,
      visitors: summary?.dailyStats?.[key]?.uniqueVisitors || 0,
    });
  }

  const maxViews = Math.max(...last7Days.map(d => d.views), 1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-mono font-bold text-white">Analytics</h1>
          <p className="text-gray-500 font-mono text-sm mt-1">
            Detailed web traffic and visitor analytics
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Tracking Toggle */}
          <button
            onClick={toggleTracking}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs transition-all ${
              tracking
                ? 'bg-green-900/20 border border-green-700/50 text-green-400'
                : 'bg-red-900/20 border border-red-700/50 text-red-400'
            }`}
          >
            {tracking ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
            Tracking: {tracking ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 font-mono text-xs hover:bg-gray-700 transition-all"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-900/10 border border-red-800/30 text-red-400 font-mono text-xs hover:bg-red-900/20 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Clear Data
          </button>
          <button
            onClick={loadData}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 font-mono text-xs hover:bg-gray-700 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* 7 Day Chart */}
      <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-6">
        <h2 className="text-white font-mono font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#00ff41]" />
          Last 7 Days — Page Views
        </h2>
        <div className="flex items-end gap-4 h-48">
          {last7Days.map((day) => (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-gray-400 font-mono text-xs">{day.views}</span>
              <div
                className="w-full bg-[#00ff41]/20 border border-[#00ff41]/30 rounded-t min-h-[4px] transition-all duration-300 hover:bg-[#00ff41]/40"
                style={{
                  height: `${(day.views / maxViews) * 100}%`,
                }}
              />
              <span className="text-gray-500 font-mono text-[10px] whitespace-nowrap">
                {day.label.split(',')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-400" />
            Top Pages
          </h3>
          <div className="space-y-2">
            {summary?.topPages?.length === 0 ? (
              <p className="text-gray-600 font-mono text-sm">No data</p>
            ) : (
              summary?.topPages?.map(([page, count]) => (
                <div key={page} className="flex justify-between items-center bg-[#050508] rounded px-3 py-2">
                  <span className="text-gray-300 font-mono text-xs truncate mr-2">{page}</span>
                  <span className="text-[#00ff41] font-mono text-xs whitespace-nowrap">{count} views</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Referrers */}
        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" />
            Top Referrers
          </h3>
          <div className="space-y-2">
            {summary?.topReferrers?.length === 0 ? (
              <p className="text-gray-600 font-mono text-sm">No data</p>
            ) : (
              summary?.topReferrers?.map(([ref, count]) => (
                <div key={ref} className="flex justify-between items-center bg-[#050508] rounded px-3 py-2">
                  <span className="text-gray-300 font-mono text-xs truncate mr-2">{ref}</span>
                  <span className="text-[#00ff41] font-mono text-xs whitespace-nowrap">{count}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Screen Sizes */}
        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
            <Monitor className="w-4 h-4 text-yellow-400" />
            Screen Resolutions
          </h3>
          <div className="space-y-2">
            {Object.entries(analytics?.screenSizes || {}).length === 0 ? (
              <p className="text-gray-600 font-mono text-sm">No data</p>
            ) : (
              Object.entries(analytics?.screenSizes || {})
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([size, count]) => (
                  <div key={size} className="flex justify-between items-center bg-[#050508] rounded px-3 py-2">
                    <span className="text-gray-300 font-mono text-xs">{size}</span>
                    <span className="text-[#00ff41] font-mono text-xs">{count}</span>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      {/* Raw Data Count */}
      <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
        <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#00ff41]" />
          Storage Overview
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#050508] border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-3xl font-mono font-bold text-[#00ff41]">
              {analytics?.pageViews?.length || 0}
            </p>
            <p className="text-gray-500 font-mono text-xs mt-1">Total Page Views</p>
          </div>
          <div className="bg-[#050508] border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-3xl font-mono font-bold text-blue-400">
              {analytics?.visitors?.length || 0}
            </p>
            <p className="text-gray-500 font-mono text-xs mt-1">Tracked Visitors</p>
          </div>
          <div className="bg-[#050508] border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-3xl font-mono font-bold text-purple-400">
              {Object.keys(analytics?.pages || {}).length}
            </p>
            <p className="text-gray-500 font-mono text-xs mt-1">Pages Tracked</p>
          </div>
          <div className="bg-[#050508] border border-gray-800 rounded-lg p-4 text-center">
            <p className="text-3xl font-mono font-bold text-yellow-400">
              {Object.keys(analytics?.dailyStats || {}).length}
            </p>
            <p className="text-gray-500 font-mono text-xs mt-1">Days Recorded</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;