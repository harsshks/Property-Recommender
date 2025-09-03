import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building2, MessageCircle, Filter, Star, Check, AlertCircle, Send, X, Calculator, TrendingUp, Clock, Bell, Download, Share2, Bookmark, Eye, BarChart3, Calendar, Users, Home } from 'lucide-react';
import { mockProperties } from './data/mockproperties';
import { businessZoneMapping } from './data/businesszonemapping';
import MarketOverview from './components/MarketOverview';
import QuickTools from './components/QuickTools';
import RecentUpdates from './components/RecentUpdates';

function App() {
  const [properties, setProperties] = useState(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [searchQuery, setSearchQuery] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New properties added in Connaught Place", time: "2 hours ago", type: "info" },
    { id: 2, message: "Market trends updated for Delhi", time: "4 hours ago", type: "trend" },
    { id: 3, message: "Compliance regulations updated", time: "1 day ago", type: "alert" }
  ]);
  const [currentPage, setCurrentPage] = useState('home');
  const [marketStats, setMarketStats] = useState({
    totalProperties: 1247,
    avgRent: "₹45,000",
    marketGrowth: "+12.5%",
    activeUsers: 2341
  });

  // Filter properties based on search criteria
  useEffect(() => {
    let filtered = properties;

    if (searchQuery) {
      filtered = filtered.filter(prop => 
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (businessType && businessZoneMapping[businessType]) {
      filtered = filtered.filter(prop => 
        businessZoneMapping[businessType].includes(prop.zone) &&
        prop.permittedUses.some(use => 
          use.toLowerCase().includes(businessType.toLowerCase()) ||
          businessType.toLowerCase().includes(use.toLowerCase())
        )
      );
    }

    if (selectedZone) {
      filtered = filtered.filter(prop => prop.zone === selectedZone);
    }

    setFilteredProperties(filtered);
  }, [searchQuery, businessType, selectedZone, properties]);

  const getComplianceColor = (status, score) => {
    if (status === 'verified' && score >= 85) return 'text-green-600 bg-green-50';
    if (status === 'verified' && score >= 70) return 'text-yellow-600 bg-yellow-50';
    if (status === 'pending' || status === 'caution') return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getComplianceIcon = (status) => {
    if (status === 'verified') return <Check className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  const openChat = (property) => {
    setSelectedProperty(property);
    setShowChat(true);
    setChatMessages([
      {
        type: 'ai',
        message: `Hi! I'm here to help you with "${property.title}". You can ask me about zoning compliance, permitted uses, or any business-specific questions about this property.`
      }
    ]);
  };

  const handleChatSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { type: 'user', message: userMessage }]);
    setLoading(true);

    // Simulate AI response based on the query
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage, selectedProperty);
      setChatMessages(prev => [...prev, { type: 'ai', message: aiResponse }]);
      setLoading(false);
    }, 1000);
  };

  const generateAIResponse = (query, property) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('restaurant') || lowerQuery.includes('café') || lowerQuery.includes('food')) {
      if (property.zone === 'commercial' || property.zone === 'mixed') {
        return `✅ Great news! This ${property.zone} property is perfect for a restaurant/café. It's located in ${property.subZone} which allows food businesses. The space has ${property.size} which is suitable for dining operations. Compliance score: ${property.complianceScore}%.`;
      } else {
        return `❌ This property is in an ${property.zone} zone which doesn't allow restaurants. I recommend looking for commercial or mixed-use properties. Would you like me to show you suitable alternatives?`;
      }
    }
    
    if (lowerQuery.includes('manufacturing') || lowerQuery.includes('factory')) {
      if (property.zone === 'industrial') {
        return `✅ Perfect! This industrial property supports manufacturing activities. It's in ${property.subZone} with ${property.size} of space. Permitted uses include: ${property.permittedUses.join(', ')}. Compliance verified with ${property.complianceScore}% score.`;
      } else {
        return `❌ Manufacturing requires industrial zoning. This ${property.zone} property won't work for factory operations. Check out our industrial properties in Okhla or Mayapuri instead.`;
      }
    }
    
    if (lowerQuery.includes('office') || lowerQuery.includes('workspace')) {
      if (property.permittedUses.includes('office')) {
        return `✅ This property is excellent for office use! Located in ${property.subZone}, it offers ${property.size} with amenities like ${property.amenities.join(', ')}. Compliance status: ${property.complianceStatus} (${property.complianceScore}%).`;
      } else {
        return `❌ This property isn't zoned for office use. The permitted uses are: ${property.permittedUses.join(', ')}. Would you like to see office-suitable properties?`;
      }
    }
    
    if (lowerQuery.includes('compliance') || lowerQuery.includes('legal')) {
      const violations = property.violations.length > 0 ? 
        `Current issues: ${property.violations.join(', ')}` : 
        'No compliance violations found.';
      return `📋 Compliance Report for this property:\n• Status: ${property.complianceStatus}\n• Score: ${property.complianceScore}%\n• Zone: ${property.zone} (${property.subZone})\n• ${violations}\n• Last verified: ${property.lastVerified}`;
    }
    
    if (lowerQuery.includes('rent') || lowerQuery.includes('cost') || lowerQuery.includes('price')) {
      return `💰 Pricing Details:\n• Monthly rent: ${property.rent}\n• Size: ${property.size}\n• Rate per sq ft: ₹${Math.round(parseInt(property.rent.replace(/[₹,]/g, '')) / parseInt(property.size.replace(/[^0-9]/g, '')))} per sq ft\n• Security deposit typically 2-3 months rent\n• Additional costs may include maintenance, utilities`;
    }
    
    // Default response
    return `I can help you with questions about:\n• Zoning compliance for your business type\n• Permitted uses and restrictions\n• Pricing and rental details\n• Legal compliance status\n• Area amenities and transport\n\nWhat specific aspect would you like to know about "${property.title}"?`;
  };

  // Tools configuration
  const tools = [
    {
      id: 'calculator',
      name: 'Rent Calculator',
      icon: Calculator,
      description: 'Calculate monthly costs including rent, utilities, and maintenance',
      color: 'bg-blue-500',
    },
    {
      id: 'market-analysis',
      name: 'Market Analysis',
      icon: BarChart3,
      description: 'View market trends and property value analysis',
      color: 'bg-green-500',
    },
    {
      id: 'market-alerts',
      name: 'Market Alerts',
      icon: Bell,
      description: 'Set alerts for new properties and price changes',
      color: 'bg-indigo-500',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#0284c7] shadow-2xl border-b border-indigo-500/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Property Recommender</h1>
                <p className="text-indigo-100 font-medium">Smart Property Recommender for Commercial Use</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setCurrentPage('home')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'home' 
                    ? 'bg-white/20 text-white' 
                    : 'text-indigo-100 hover:bg-white/10'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">Home</span>
              </button>
              <button
                onClick={() => setCurrentPage('market')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'market' 
                    ? 'bg-white/20 text-white' 
                    : 'text-indigo-100 hover:bg-white/10'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Market Overview</span>
              </button>
              <button
                onClick={() => setCurrentPage('tools')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'tools' 
                    ? 'bg-white/20 text-white' 
                    : 'text-indigo-100 hover:bg-white/10'
                }`}
              >
                <Calculator className="w-4 h-4" />
                <span className="font-medium">Quick Tools</span>
              </button>
              <button
                onClick={() => setCurrentPage('updates')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'updates' 
                    ? 'bg-white/20 text-white' 
                    : 'text-indigo-100 hover:bg-white/10'
                }`}
              >
                <Bell className="w-4 h-4" />
                <span className="font-medium">Recent Updates</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Page Content */}
      {currentPage === 'home' && (
        <>
          {/* Search and Filters */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search location or property..."
                    className="pl-12 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <select
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                >
                  <option value="">Select Business Type</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="café">Café</option>
                  <option value="retail">Retail Store</option>
                  <option value="office">Office</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="clinic">Clinic</option>
                  <option value="showroom">Showroom</option>
                </select>

                <select
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white"
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                >
                  <option value="">All Zones</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="mixed">Mixed Use</option>
                </select>

                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center font-medium">
                  <Filter className="w-5 h-5 mr-2" />
                  Search Properties
                </button>
              </div>
            </div>

          {/* Results Summary */}
          <div className="mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50">
              <p className="text-gray-700 text-center">
                Found <span className="font-bold text-indigo-600 text-lg">{filteredProperties.length}</span> properties
                {businessType && <span> for <span className="font-bold text-indigo-600">{businessType}</span> business</span>}
              </p>
            </div>
          </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl group">
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={property.images}
                  alt={property.title}
                  className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-2 rounded-full text-xs font-bold flex items-center shadow-lg ${getComplianceColor(property.complianceStatus, property.complianceScore)}`}>
                    {getComplianceIcon(property.complianceStatus)}
                    <span className="ml-1">{property.complianceScore}%</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm font-medium">{property.address}</span>
                  </div>
                </div>
                
                {property.locationDescription && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-xl">
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {property.locationDescription}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-bold text-[#0284c7]">{property.rent}</span>
                  <span className="text-sm text-gray-600 font-medium">{property.size}</span>
                </div>

                <div className="mb-4">
                  <span className="inline-block bg-[#0284c7] text-white text-xs px-3 py-2 rounded-full font-bold">
                    {property.zone.charAt(0).toUpperCase() + property.zone.slice(1)} Zone
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-2 rounded-full ml-2 font-medium">
                    {property.subZone}
                  </span>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-gray-600 mb-2 font-medium">Permitted Uses:</p>
                  <div className="flex flex-wrap gap-2">
                    {property.permittedUses.slice(0, 3).map((use, index) => (
                      <span key={index} className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                        {use}
                      </span>
                    ))}
                    {property.permittedUses.length > 3 && (
                      <span className="text-xs text-gray-500 font-medium">+{property.permittedUses.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => openChat(property)}
                    className="flex-1 bg-[#0284c7] text-white px-4 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center text-sm font-bold"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask AI
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-xl bg-teal-500 hover:bg-teal-600 transition-all duration-200 text-sm font-bold text-white shadow-lg hover:shadow-xl transform hover:scale-105">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-white/50 shadow-xl">
              <Building2 className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No properties found</h3>
              <p className="text-gray-600 text-lg">Try adjusting your search criteria or business type.</p>
            </div>
          </div>
        )}
      </div>
        </>
      )}



      {/* Tool Modal */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${selectedTool.color} rounded-lg flex items-center justify-center`}>
                  <selectedTool.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedTool.name}</h3>
                  <p className="text-sm text-gray-600">{selectedTool.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTool(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {selectedTool.id === 'calculator' && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Rent Calculator</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Rent</label>
                      <input type="number" placeholder="₹50,000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Property Size (sq ft)</label>
                      <input type="number" placeholder="1000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Utilities (monthly)</label>
                      <input type="number" placeholder="₹5,000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance (monthly)</label>
                      <input type="number" placeholder="₹2,000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">Total Monthly Cost: ₹57,000</h5>
                    <p className="text-sm text-gray-600">Rate per sq ft: ₹57/sq ft</p>
                  </div>
                </div>
              )}
              
              {selectedTool.id === 'market-analysis' && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Market Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">₹45,000</div>
                      <div className="text-sm text-gray-600">Average Rent</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">+12.5%</div>
                      <div className="text-sm text-gray-600">Market Growth</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600">₹52/sq ft</div>
                      <div className="text-sm text-gray-600">Avg Rate/sq ft</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">Market Trends</h5>
                    <p className="text-sm text-gray-600">Commercial property prices in Delhi have increased by 12.5% in the last quarter. High demand in Connaught Place and South Delhi areas.</p>
                  </div>
                </div>
              )}
              
              {selectedTool.id === 'market-alerts' && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Market Alerts</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <div>
                        <div className="font-medium text-gray-900">New Properties</div>
                        <div className="text-sm text-gray-600">Get notified when new properties are listed</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <input type="checkbox" className="rounded" />
                      <div>
                        <div className="font-medium text-gray-900">Price Changes</div>
                        <div className="text-sm text-gray-600">Alerts when property prices change</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <input type="checkbox" className="rounded" />
                      <div>
                        <div className="font-medium text-gray-900">Market Updates</div>
                        <div className="text-sm text-gray-600">Weekly market trend reports</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Conditional Page Rendering */}
      {currentPage === 'market' && <MarketOverview />}
      {currentPage === 'tools' && <QuickTools />}
      {currentPage === 'updates' && <RecentUpdates />}

      {/* Footer */}
      <footer className="bg-slate-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Building2 className="w-8 h-8 text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Property Recommender</h3>
                  <p className="text-indigo-200 text-sm font-medium">Smart Property Solutions</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your trusted partner for commercial property discovery in Delhi. 
                AI-powered recommendations for zoning compliance and business success.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-200 transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-200 transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-200 transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-all duration-200 transform hover:scale-110">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Commercial Properties</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Industrial Zones</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Zoning Compliance</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Business Permits</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Property Valuation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Legal Services</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Our Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">AI Property Matching</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Compliance Verification</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Business Zone Analysis</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Property Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Legal Consultation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Market Research</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300 text-sm">+91 11 2345 6789</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300 text-sm">info@delhibiz.ai</span>
                </div>
              </div>
              
              <div className="pt-4">
                <h5 className="text-sm font-semibold mb-2">Business Hours</h5>
                <p className="text-gray-300 text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-300 text-sm">Sat: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              </div>
              <div className="text-sm text-gray-400">
                © 2024 DelhiBiz AI Navigator. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>

      

      {/* AI Chat Modal */}
      {showChat && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[500px] flex flex-col border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-indigo-600 rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">AI Property Assistant</h3>
                  <p className="text-indigo-100 text-sm truncate max-w-xs">{selectedProperty.title}</p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-white hover:text-indigo-200 transition-colors p-1 rounded-full hover:bg-white hover:bg-opacity-20"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-4 rounded-2xl shadow-sm ${
                    msg.type === 'user' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-300 font-medium text-gray-800 border border-gray-200'
                  }`}>
                    <p className="text-sm whitespace-pre-line font-arial leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-gray-200 bg-white rounded-b-2xl">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Ask about zoning, compliance, or business fit..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-arial bg-gray-50 hover:bg-white transition-colors"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit(e)}
                />
                <button
                  onClick={handleChatSubmit}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tool Modal */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${selectedTool.color} rounded-lg flex items-center justify-center`}>
                  <selectedTool.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedTool.name}</h3>
                  <p className="text-sm text-gray-600">{selectedTool.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTool(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Tool content would go here */}
              <p className="text-gray-600">Tool functionality coming soon...</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;