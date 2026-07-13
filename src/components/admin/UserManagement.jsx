import React, { useState, useEffect } from 'react';
import { getVisitors } from '../../lib/analytics';
import {
  Users,
  Search,
  UserX,
  UserCheck,
  Clock,
  Monitor,
  Globe,
  MapPin,
  Filter,
  ChevronDown,
} from 'lucide-react';

function UserManagement() {
  const [visitors, setVisitors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [blockedVisitors, setBlockedVisitors] = useState([]);

  useEffect(() => {
    loadVisitors();
    loadBlocked();
  }, []);

  function loadVisitors() {
    setVisitors(getVisitors());
  }

  function loadBlocked() {
    const blocked = JSON.parse(localStorage.getItem('oscar_blocked_visitors') || '[]');
    setBlockedVisitors(blocked);
  }

  function blockVisitor(visitorId) {
    const blocked = [...blockedVisitors, { id: visitorId, blockedAt: new Date().toISOString() }];
    setBlockedVisitors(blocked);
    localStorage.setItem('oscar_blocked_visitors', JSON.stringify(blocked));
  }

  function unblockVisitor(visitorId) {
    const blocked = blockedVisitors.filter(v => v.id !== visitorId);
    setBlockedVisitors(blocked);
    localStorage.setItem('oscar_blocked_visitors', JSON.stringify(blocked));
  }

  function isBlocked(visitorId) {
    return blockedVisitors.some(v => v.id === visitorId);
  }

  const filteredVisitors = visitors.filter(v =>
    v.visitorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.browser.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.os.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Device breakdown
  const deviceBreakdown = {
    Desktop: visitors.filter(v => v.device === 'Desktop').length,
    Mobile: visitors.filter(v => v.device === 'Mobile').length,
    Tablet: visitors.filter(v => v.device === 'Tablet').length,
  };

  // Browser breakdown
  const browserBreakdown = visitors.reduce((acc, v) => {
    acc[v.browser] = (acc[v.browser] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-mono font-bold text-white">User Management</h1>
          <p className="text-gray-500 font-mono text-sm mt-1">
            Manage and monitor all visitors to your site
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-500 font-mono text-xs">
            {visitors.length} visitors tracked • {blockedVisitors.length} blocked
          </span>
          <button
            onClick={loadVisitors}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 font-mono text-xs hover:bg-gray-700 transition-all"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Visitor Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-400/10 border border-blue-400/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-blue-400">{visitors.length}</p>
              <p className="text-gray-500 font-mono text-[10px]">Total Visitors</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-400/10 border border-green-400/30 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-green-400">{deviceBreakdown.Desktop}</p>
              <p className="text-gray-500 font-mono text-[10px]">Desktop Users</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-400/10 border border-purple-400/30 flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-purple-400">{deviceBreakdown.Mobile + deviceBreakdown.Tablet}</p>
              <p className="text-gray-500 font-mono text-[10px]">Mobile Users</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-400/10 border border-red-400/30 flex items-center justify-center">
              <UserX className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-red-400">{blockedVisitors.length}</p>
              <p className="text-gray-500 font-mono text-[10px]">Blocked Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search visitors by ID, browser, device, or OS..."
          className="w-full bg-[#0d0d14] border border-gray-800 rounded-lg py-3 px-12 text-gray-300 font-mono text-sm placeholder-gray-600 focus:outline-none focus:border-[#00ff41]/50 focus:ring-1 focus:ring-[#00ff41]/20"
        />
      </div>

      {/* Visitors Table */}
      <div className="bg-[#0d0d14] border border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 bg-[#050508]">
                <th className="py-4 px-4 text-gray-400 font-mono text-xs uppercase">Status</th>
                <th className="py-4 px-4 text-gray-400 font-mono text-xs uppercase">Visitor ID</th>
                <th className="py-4 px-4 text-gray-400 font-mono text-xs uppercase">Visits</th>
                <th className="py-4 px-4 text-gray-400 font-mono text-xs uppercase">Device</th>
                <th className="py-4 px-4 text-gray-400 font-mono text-xs uppercase">Browser</th>
                <th className="py-4 px-4 text-gray-400 font-mono text-xs uppercase">OS</th>
                <th className="py-4 px-4 text-gray-400 font-mono text-xs uppercase">Screen</th>
                <th className="py-4 px-4 text-gray-400 font-mono text-xs uppercase">First Visit</th>
                <th className="py-4 px-4 text-gray-400 font-mono text-xs uppercase">Last Visit</th>
                <th className="py-4 px-4 text-gray-400 font-mono text-xs uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-gray-600 font-mono text-sm">
                    {searchTerm ? 'No visitors match your search' : 'No visitors recorded yet'}
                  </td>
                </tr>
              ) : (
                filteredVisitors.map((visitor) => (
                  <tr
                    key={visitor.visitorId}
                    className={`border-b border-gray-800/50 hover:bg-gray-800/20 cursor-pointer transition-all ${
                      isBlocked(visitor.visitorId) ? 'opacity-50' : ''
                    }`}
                    onClick={() => setSelectedVisitor(selectedVisitor === visitor.visitorId ? null : visitor.visitorId)}
                  >
                    <td className="py-3 px-4">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        isBlocked(visitor.visitorId) ? 'bg-red-500' : 'bg-[#00ff41]'
                      }`} />
                    </td>
                    <td className="py-3 px-4 text-gray-300 font-mono text-[11px]">
                      {visitor.visitorId.substring(0, 16)}...
                    </td>
                    <td className="py-3 px-4 text-[#00ff41] font-mono text-xs">{visitor.visitCount}</td>
                    <td className="py-3 px-4 text-gray-400 font-mono text-xs">{visitor.device}</td>
                    <td className="py-3 px-4 text-gray-400 font-mono text-xs">{visitor.browser}</td>
                    <td className="py-3 px-4 text-gray-400 font-mono text-xs">{visitor.os}</td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-xs">{visitor.screenSize}</td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-xs">
                      {new Date(visitor.firstVisit).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-xs">
                      {new Date(visitor.lastVisit).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          isBlocked(visitor.visitorId)
                            ? unblockVisitor(visitor.visitorId)
                            : blockVisitor(visitor.visitorId);
                        }}
                        className={`p-1.5 rounded text-xs font-mono transition-all ${
                          isBlocked(visitor.visitorId)
                            ? 'bg-green-900/20 text-green-400 hover:bg-green-900/40'
                            : 'bg-red-900/20 text-red-400 hover:bg-red-900/40'
                        }`}
                      >
                        {isBlocked(visitor.visitorId) ? (
                          <UserCheck className="w-3.5 h-3.5" />
                        ) : (
                          <UserX className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Browser Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <h3 className="text-white font-mono font-bold mb-4">Browser Distribution</h3>
          <div className="space-y-3">
            {Object.entries(browserBreakdown)
              .sort((a, b) => b[1] - a[1])
              .map(([browser, count]) => (
                <div key={browser}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 font-mono">{browser}</span>
                    <span className="text-[#00ff41] font-mono">{count}</span>
                  </div>
                  <div className="w-full bg-[#050508] rounded-full h-2">
                    <div
                      className="bg-[#00ff41]/50 h-2 rounded-full"
                      style={{ width: `${(count / visitors.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-[#0d0d14] border border-gray-800 rounded-lg p-5">
          <h3 className="text-white font-mono font-bold mb-4">Device Distribution</h3>
          <div className="space-y-3">
            {Object.entries(deviceBreakdown).map(([device, count]) => (
              <div key={device}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400 font-mono">{device}</span>
                  <span className="text-[#00ff41] font-mono">{count}</span>
                </div>
                <div className="w-full bg-[#050508] rounded-full h-2">
                  <div
                    className="bg-purple-400/50 h-2 rounded-full"
                    style={{ width: `${visitors.length > 0 ? (count / visitors.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;