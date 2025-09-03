import React, { useState } from 'react';
import { Bell, Clock, TrendingUp, AlertCircle, CheckCircle, Info, Building2 } from 'lucide-react';

function RecentUpdates() {
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      message: "Property Comparison and Document Generator tools removed for a streamlined experience", 
      time: "Just now", 
      type: "info",
      category: "tool",
      priority: "medium"
    },
    { 
      id: 2, 
      message: "Compliance Checker tool removed to simplify the tools section", 
      time: "10 minutes ago", 
      type: "info",
      category: "tool",
      priority: "medium"
    },
    { 
      id: 3, 
      message: "Rent Calculator is now fully interactive and functional", 
      time: "30 minutes ago", 
      type: "info",
      category: "tool",
      priority: "high"
    },
    { 
      id: 4, 
      message: "South Delhi commercial property demand at all-time high", 
      time: "1 hour ago", 
      type: "trend",
      category: "market",
      priority: "high"
    },
    { 
      id: 5, 
      message: "Delhi government announces new property compliance guidelines", 
      time: "3 hours ago", 
      type: "alert",
      category: "compliance",
      priority: "high"
    },
    { 
      id: 6, 
      message: "User interface improvements for better accessibility", 
      time: "1 day ago", 
      type: "info",
      category: "tool",
      priority: "medium"
    },
    { 
      id: 7, 
      message: "New properties added in Connaught Place", 
      time: "2 days ago", 
      type: "info",
      category: "property",
      priority: "medium"
    },
    { 
      id: 8, 
      message: "Market trends updated for Delhi", 
      time: "3 days ago", 
      type: "trend",
      category: "market",
      priority: "high"
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.category === filter;
    const matchesSearch = notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'trend':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-indigo-600 shadow-2xl border-b border-indigo-500/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-1">Recent Updates</h1>
                <p className="text-indigo-100 font-medium">Stay informed with latest market updates and notifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-bold text-gray-900">Filter Updates</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('property')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'property' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Properties
                </button>
                <button
                  onClick={() => setFilter('market')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'market' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Market
                </button>
                <button
                  onClick={() => setFilter('compliance')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'compliance' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Compliance
                </button>
                <button
                  onClick={() => setFilter('tool')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'tool' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Tools
                </button>
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Bell className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Updates</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last updated: 2 hours ago</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-xl border-l-4 ${getPriorityColor(notification.priority)} bg-gray-50 hover:bg-gray-100 transition-colors`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">{notification.message}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{notification.time}</span>
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              notification.category === 'property' ? 'bg-blue-100 text-blue-700' :
                              notification.category === 'market' ? 'bg-green-100 text-green-700' :
                              notification.category === 'compliance' ? 'bg-orange-100 text-orange-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {notification.category}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              notification.priority === 'high' ? 'bg-red-100 text-red-700' :
                              notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {notification.priority}
                            </span>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No updates found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Update Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">{notifications.length}</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Total Updates</h4>
            <p className="text-sm text-gray-600">All notifications and updates</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">
                {notifications.filter(n => n.type === 'trend').length}
              </span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Market Trends</h4>
            <p className="text-sm text-gray-600">Market-related updates</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-orange-600">
                {notifications.filter(n => n.priority === 'high').length}
              </span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">High Priority</h4>
            <p className="text-sm text-gray-600">Important updates</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentUpdates; 