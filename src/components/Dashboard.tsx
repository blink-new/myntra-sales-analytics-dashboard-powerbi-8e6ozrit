import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, ShoppingBag, Users, DollarSign, Target, Filter, Download, Calendar, Search } from 'lucide-react';

// Mock data
const salesData = [
  { month: 'Jan', revenue: 2400000, orders: 1200, male: 45, female: 55 },
  { month: 'Feb', revenue: 2100000, orders: 1100, male: 42, female: 58 },
  { month: 'Mar', revenue: 2800000, orders: 1400, male: 48, female: 52 },
  { month: 'Apr', revenue: 3200000, orders: 1600, male: 46, female: 54 },
  { month: 'May', revenue: 2900000, orders: 1450, male: 44, female: 56 },
  { month: 'Jun', revenue: 3500000, orders: 1750, male: 47, female: 53 },
];

const categoryData = [
  { category: 'Ethnic Wear', sales: 45000, revenue: 6750000, growth: 12.5 },
  { category: 'Western Wear', sales: 38000, revenue: 5700000, growth: 8.3 },
  { category: 'Footwear', sales: 32000, revenue: 4800000, growth: -2.1 },
  { category: 'Accessories', sales: 28000, revenue: 2800000, growth: 15.7 },
  { category: 'Beauty', sales: 25000, revenue: 3750000, growth: 22.4 },
  { category: 'Sports', sales: 22000, revenue: 3300000, growth: 5.8 },
];

const topProducts = [
  { id: 1, name: 'Anarkali Kurta Set', brand: 'Libas', sales: 2847, revenue: 4270500, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=100&h=100&fit=crop' },
  { id: 2, name: 'Denim Jacket', brand: 'Roadster', sales: 2156, revenue: 3234000, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop' },
  { id: 3, name: 'Running Shoes', brand: 'Nike', sales: 1923, revenue: 5769000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop' },
  { id: 4, name: 'Silk Saree', brand: 'Sabyasachi', sales: 1654, revenue: 8270000, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop' },
  { id: 5, name: 'Casual Shirt', brand: 'H&M', sales: 1432, revenue: 2148000, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&h=100&fit=crop' },
];

const recentOrders = [
  { id: '#MYN001', customer: 'Priya Sharma', amount: 2499, status: 'Delivered', time: '2 mins ago', category: 'Ethnic Wear' },
  { id: '#MYN002', customer: 'Rahul Kumar', amount: 1899, status: 'Shipped', time: '5 mins ago', category: 'Western Wear' },
  { id: '#MYN003', customer: 'Anita Singh', amount: 3299, status: 'Processing', time: '8 mins ago', category: 'Footwear' },
  { id: '#MYN004', customer: 'Vikash Gupta', amount: 1599, status: 'Delivered', time: '12 mins ago', category: 'Accessories' },
  { id: '#MYN005', customer: 'Sneha Patel', amount: 4599, status: 'Shipped', time: '15 mins ago', category: 'Beauty' },
];

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6M');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChart, setActiveChart] = useState('revenue');

  // Filter data based on selections
  const filteredData = useMemo(() => {
    let filtered = salesData;
    
    if (selectedTimeRange === '3M') {
      filtered = salesData.slice(-3);
    } else if (selectedTimeRange === '1M') {
      filtered = salesData.slice(-1);
    }
    
    return filtered;
  }, [selectedTimeRange]);

  const filteredCategories = useMemo(() => {
    return categoryData.filter(cat => 
      cat.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    return topProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Calculate KPIs based on filtered data
  const kpis = useMemo(() => {
    const totalRevenue = filteredData.reduce((sum, item) => sum + item.revenue, 0);
    const totalOrders = filteredData.reduce((sum, item) => sum + item.orders, 0);
    const avgOrderValue = totalRevenue / totalOrders;
    const conversionRate = 3.24; // Mock conversion rate
    
    return {
      revenue: totalRevenue,
      orders: totalOrders,
      aov: avgOrderValue,
      conversion: conversionRate
    };
  }, [filteredData]);

  const genderData = [
    { name: 'Male', value: 47, color: '#FF3F6C' },
    { name: 'Female', value: 53, color: '#FF6B35' },
  ];

  const KPICard = ({ title, value, change, icon: Icon, format = 'number' }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-pink-50 rounded-lg group-hover:bg-pink-100 transition-colors">
          <Icon className="w-6 h-6 text-pink-600" />
        </div>
        <div className={`flex items-center text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          {Math.abs(change)}%
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">
        {format === 'currency' ? `₹${(value / 10000000).toFixed(2)}Cr` : 
         format === 'percentage' ? `${value}%` :
         value.toLocaleString()}
      </p>
    </div>
  );

  const handleExport = () => {
    alert('Exporting dashboard data... (Demo functionality)');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? 'All' : category);
  };

  const handleProductClick = (product) => {
    alert(`Viewing details for: ${product.name} by ${product.brand}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Myntra Analytics</h1>
                  <p className="text-gray-600 text-sm">Sales Dashboard</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              
              {/* Time Range Filter */}
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="1M">Last Month</option>
                <option value="3M">Last 3 Months</option>
                <option value="6M">Last 6 Months</option>
              </select>
              
              {/* Export Button */}
              <button 
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard 
            title="Total Revenue" 
            value={kpis.revenue} 
            change={12.5} 
            icon={DollarSign} 
            format="currency"
          />
          <KPICard 
            title="Total Orders" 
            value={kpis.orders} 
            change={8.3} 
            icon={ShoppingBag}
          />
          <KPICard 
            title="Average Order Value" 
            value={kpis.aov} 
            change={-2.1} 
            icon={Target}
            format="currency"
          />
          <KPICard 
            title="Conversion Rate" 
            value={kpis.conversion} 
            change={5.7} 
            icon={Users}
            format="percentage"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trend Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Sales Trend</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveChart('revenue')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    activeChart === 'revenue' ? 'bg-pink-100 text-pink-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setActiveChart('orders')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    activeChart === 'orders' ? 'bg-pink-100 text-pink-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Orders
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey={activeChart} 
                  stroke="#FF3F6C" 
                  fill="url(#colorRevenue)" 
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF3F6C" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF3F6C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Gender Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Purchase by Gender</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              {genderData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Category Performance</h2>
            <div className="text-sm text-gray-600">Click on bars to filter</div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredCategories} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#666" />
              <YAxis dataKey="category" type="category" stroke="#666" width={100} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="sales" 
                fill="#FF3F6C" 
                radius={[0, 4, 4, 0]}
                onClick={(data) => handleCategoryClick(data.category)}
                style={{ cursor: 'pointer' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Products</h2>
            <div className="space-y-4">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{product.sales.toLocaleString()} units</p>
                    <p className="text-sm text-gray-500">₹{(product.revenue / 100000).toFixed(1)}L</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-pink-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.id} • {order.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">₹{order.amount.toLocaleString()}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;