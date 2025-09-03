import React, { useState } from 'react';
import { Calculator, BarChart3, Check, TrendingUp, Download, Bell, X, Building2 } from 'lucide-react';

function QuickTools() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [showTools, setShowTools] = useState(true);

  // Rent Calculator state
  const [rent, setRent] = useState('');
  const [size, setSize] = useState('');
  const [utilities, setUtilities] = useState('');
  const [maintenance, setMaintenance] = useState('');

  // Calculate totals
  const totalCost =
    (parseInt(rent) || 0) + (parseInt(utilities) || 0) + (parseInt(maintenance) || 0);
  const ratePerSqFt = size && totalCost ? Math.round(totalCost / parseInt(size)) : 0;

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
      <div className="bg-indigo-600 shadow-2xl border-b border-indigo-500/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-1">Quick Tools</h1>
                <p className="text-indigo-100 font-medium">Essential tools for property analysis and planning</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tools Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Available Tools</h2>
            <button 
              onClick={() => setShowTools(!showTools)}
              className="text-white hover:text-gray-300 font-medium"
            >
              {showTools ? 'Hide All' : 'Show All'}
            </button>
          </div>
          
          {showTools && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className="p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 text-center group border border-gray-200 hover:border-gray-300"
                >
                  <div className={`w-16 h-16 ${tool.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tool Instructions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How to Use These Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-indigo-600">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Select a Tool</h4>
                  <p className="text-sm text-gray-600">Click on any tool card to open its detailed interface</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-indigo-600">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Input Data</h4>
                  <p className="text-sm text-gray-600">Enter the required information in the tool's form</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs font-bold text-indigo-600">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Get Results</h4>
                  <p className="text-sm text-gray-600">View detailed analysis and recommendations</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use the Rent Calculator to budget your monthly expenses</li>
                  <li>• Check compliance before finalizing any property</li>
                  <li>• Compare multiple properties for better decisions</li>
                  <li>• Set up alerts to stay updated on market changes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                      <input
                        type="number"
                        placeholder="₹50,000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={rent}
                        onChange={e => setRent(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Property Size (sq ft)</label>
                      <input
                        type="number"
                        placeholder="1000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={size}
                        onChange={e => setSize(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Utilities (monthly)</label>
                      <input
                        type="number"
                        placeholder="₹5,000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={utilities}
                        onChange={e => setUtilities(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance (monthly)</label>
                      <input
                        type="number"
                        placeholder="₹2,000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={maintenance}
                        onChange={e => setMaintenance(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2">Total Monthly Cost: ₹{totalCost.toLocaleString()}</h5>
                    <p className="text-sm text-gray-600">Rate per sq ft: ₹{ratePerSqFt}/sq ft</p>
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
    </div>
  );
}
export default QuickTools; 