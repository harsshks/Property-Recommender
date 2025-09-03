import React, { useState } from 'react';
import { TrendingUp, BarChart3, DollarSign, Users, MapPin, Calendar, Building2 } from 'lucide-react';

function MarketOverview() {
  const [marketStats, setMarketStats] = useState({
    totalProperties: 1247,
    avgRent: "₹45,000",
    marketGrowth: "+12.5%",
    activeUsers: 2341,
    avgPricePerSqFt: "₹52",
    totalTransactions: 89
  });

  const [marketTrends, setMarketTrends] = useState([
    { area: "Connaught Place", growth: "+15.2%", avgRent: "₹65,000", demand: "High" },
    { area: "South Delhi", growth: "+12.8%", avgRent: "₹55,000", demand: "Medium" },
    { area: "Dwarka", growth: "+8.5%", avgRent: "₹40,000", demand: "Medium" },
    { area: "Gurgaon", growth: "+18.3%", avgRent: "₹70,000", demand: "Very High" }
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-indigo-600 shadow-2xl border-b border-indigo-500/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-1">Market Overview</h1>
                <p className="text-indigo-100 font-medium">Real-time market insights and trends</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Market Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{marketStats.totalProperties}</div>
            <div className="text-sm text-gray-600">Total Properties</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{marketStats.avgRent}</div>
            <div className="text-sm text-gray-600">Average Rent</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{marketStats.marketGrowth}</div>
            <div className="text-sm text-gray-600">Market Growth</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{marketStats.activeUsers}</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-indigo-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">₹{marketStats.avgPricePerSqFt}</div>
            <div className="text-sm text-gray-600">Avg Price/sq ft</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-teal-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{marketStats.totalTransactions}</div>
            <div className="text-sm text-gray-600">Monthly Transactions</div>
          </div>
        </div>

        {/* Market Trends by Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Market Trends by Area</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketTrends.map((trend, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{trend.area}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    trend.demand === 'Very High' ? 'bg-red-100 text-red-700' :
                    trend.demand === 'High' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {trend.demand}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Growth:</span>
                    <span className="text-sm font-medium text-green-600">{trend.growth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Rent:</span>
                    <span className="text-sm font-medium text-gray-900">{trend.avgRent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Market Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Rising Demand</h4>
                <p className="text-sm text-blue-700">Commercial properties in Connaught Place and South Delhi are experiencing increased demand due to business expansion.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Price Trends</h4>
                <p className="text-sm text-green-700">Average rental rates have increased by 12.5% compared to last quarter, with premium locations showing 18% growth.</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-900 mb-2">Investment Opportunities</h4>
                <p className="text-sm text-orange-700">Emerging areas like Dwarka and Noida offer good investment potential with lower entry costs.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Market Forecast</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Q1 2024</span>
                <span className="text-sm font-bold text-green-600">+8.5%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Q2 2024</span>
                <span className="text-sm font-bold text-green-600">+10.2%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Q3 2024</span>
                <span className="text-sm font-bold text-green-600">+12.8%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Q4 2024</span>
                <span className="text-sm font-bold text-green-600">+15.0%</span>
              </div>
            </div>
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700">
                <strong>Outlook:</strong> Strong growth expected in commercial real estate with increasing demand for office spaces and retail properties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketOverview; 