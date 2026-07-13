import React, { useState, useEffect } from 'react';
import { getAnalyticsSummary, getRecentPageViews, getVisitors } from '../../lib/analytics';
import { getSession } from '../../lib/auth';
import {
  Eye,
  Users,
  TrendingUp,
  Globe,
  Clock,
  Monitor,
  Smartphone,
  Activity,
} from 'lucide-react';

function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [recentViews, setRecentViews] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [time, setTime] = useState(new Date());
  const session = getSession();

  useEffect(() => {
    loadData();
    const interval = setInterval(() => {
      setTime(new Date());
      loadData();
    }, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  function loadData() {
    setSummary(getAnalyticsSummary());
    setRecentViews(getRecentPageViews(10));
    setVisitors(getVisitors());
  }

  const statsCards = [
    {
      label: 'Total Page Views',
      value: summary?.totalPageViews || 0,
      icon: Eye,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'border-blue-400/30',
    },
    {
      label: 'Unique Visitors',
      value: summary?.totalUniqueVisitors || 0,
      icon: Users,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
      border: 'border-green-400/30',
    },
    {
      label: "Today's Views",
      value: summary?.todayStats?.views || 0,
      icon: TrendingUp,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      border: 'border-purple-400/30',
    },
    {
      label: "Today's Visitors",
      value: summary?.todayStats?.uniqueVisitors || 0,
      icon: Activity,
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
      border: 'border-yellow-400/30',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-mono font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-500 font-mono text-sm mt-1">
          Welcome back, {session?.email || 'Admin'} — Last update: {time.toLocaleTimeString()}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, i) => (
          <div
            key={i}
            className={`bg-[#0d0d14] border ${stat.border} rounded-lg p-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                {stat.label}
              </span>
              <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <p className={`text-3xl font-mono font-bold ${stat.color}`}>
              {stat.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Page Views */}
        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <h2 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#00ff41]" />
            Recent Page Views
          </h2>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {recentViews.length === 0 ? (
              <p className="text-gray-600 font-mono text-sm text-center py-8">
                No page views recorded yet
              </p>
            ) : (
              recentViews.map((view, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-[#050508] border border-gray-800 rounded px-4 py-3"
                >
                  <div>
                    <p className="text-gray-300 font-mono text-sm">{view.path}</p>
                    <p className="text-gray-600 font-mono text-[10px]">
                      {new Date(view.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span className="text-gray-500 font-mono text-[10px]">
                    {view.referrer.split('/')[2] || 'Direct'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Browser & Device Distribution */}
        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <h2 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#00ff41]" />
            Traffic Distribution
          </h2>

          {/* Browsers */}
          <div className="mb-6">
            <h3 className="text-gray-400 font-mono text-xs uppercase tracking-wider mb-3 flex items-center gap-1">
              <Monitor className="w-3 h-3" /> Browsers
            </h3>
            <div className="space-y-2">
              {Object.entries(summary?.browserDistribution || {}).length === 0 ? (
                <p className="text-gray-600 font-mono text-sm">No data yet</p>
              ) : (
                Object.entries(summary?.browserDistribution || {})
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([browser, count]) => (
                    <div key={browser} className="flex items-center justify-between">
                      <span className="text-gray-300 font-mono text-sm">{browser}</span>
                      <span className="text-[#00ff41] font-mono text-sm">{count}</span>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Devices */}
          <div>
            <h3 className="text-gray-400 font-mono text-xs uppercase tracking-wider mb-3 flex items-center gap-1">
              <Smartphone className="w-3 h-3" /> Devices
            </h3>
            <div className="space-y-2">
              {Object.entries(summary?.deviceDistribution || {}).length === 0 ? (
                <p className="text-gray-600 font-mono text-sm">No data yet</p>
              ) : (
                Object.entries(summary?.deviceDistribution || {})
                  .sort((a, b) => b[1] - a[1])
                  .map(([device, count]) => (
                    <div key={device} className="flex items-center justify-between">
                      <span className="text-gray-300 font-mono text-sm">{device}</span>
                      <span className="text-[#00ff41] font-mono text-sm">{count}</span>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Visitor Quick List */}
      <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
        <h2 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-[#00ff41]" />
          Visitor Overview ({visitors.length} total)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-3 px-4 text-gray-400 font-mono text-xs uppercase">Visitor</th>
                <th className="py-3 px-4 text-gray-400 font-mono text-xs uppercase">Visits</th>
                <th className="py-3 px-4 text-gray-400 font-mono text-xs uppercase">Device</th>
                <th className="py-3 px-4 text-gray-400 font-mono text-xs uppercase">Browser</th>
                <th className="py-3 px-4 text-gray-400 font-mono text-xs uppercase">First Visit</th>
                <th className="py-3 px-4 text-gray-400 font-mono text-xs uppercase">Last Visit</th>
              </tr>
            </thead>
            <tbody>
              {visitors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-600 font-mono text-sm">
                    No visitors recorded yet
                  </td>
                </tr>
              ) : (
                visitors.slice(0, 10).map((visitor) => (
                  <tr key={visitor.visitorId} className="border-b border-gray-800/50 hover:bg-gray-800/20">
                    <td className="py-3 px-4 text-gray-300 font-mono text-xs">
                      {visitor.visitorId.substring(0, 12)}...
                    </td>
                    <td className="py-3 px-4 text-[#00ff41] font-mono text-xs">{visitor.visitCount}</td>
                    <td className="py-3 px-4 text-gray-400 font-mono text-xs">{visitor.device}</td>
                    <td className="py-3 px-4 text-gray-400 font-mono text-xs">{visitor.browser}</td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-xs">
                      {new Date(visitor.firstVisit).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-xs">
                      {new Date(visitor.lastVisit).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;