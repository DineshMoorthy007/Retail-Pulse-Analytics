import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  LayoutDashboard, ShoppingCart, Users, Settings, LogOut, TrendingUp, IndianRupee 
} from 'lucide-react';

const API_BASE = 'http://localhost:8080/api/analytics';

export default function Dashboard() {
  const [salesByCategory, setSalesByCategory] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [aov, setAov] = useState({ ONLINE: 0, IN_STORE: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesRes, customersRes, aovRes] = await Promise.all([
          fetch(`${API_BASE}/sales-by-category`),
          fetch(`${API_BASE}/top-customers?limit=5`),
          fetch(`${API_BASE}/aov-by-channel`)
        ]);

        const salesData = await salesRes.json();
        const customersData = await customersRes.json();
        const aovData = await aovRes.json();

        setSalesByCategory(salesData);
        setTopCustomers(customersData);

        // Map AOV array to object for easy rendering
        const aovMap = { ONLINE: 0, IN_STORE: 0 };
        aovData.forEach(item => {
          aovMap[item.channel] = item.averageOrderValue;
        });
        setAov(aovMap);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      {/* Sidebar - Dark Theme */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Retail Pulse
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<ShoppingCart size={20} />} label="Orders" />
          <NavItem icon={<Users size={20} />} label="Customers" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>
        <div className="p-4 border-t border-gray-800">
          <NavItem icon={<LogOut size={20} />} label="Logout" />
        </div>
      </aside>

      {/* Main Content Grid */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-10">
        <header className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Analytics Overview</h2>
          <p className="text-gray-500 mt-1">Track your retail performance in real-time.</p>
        </header>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* KPI Cards row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <KpiCard 
                title="Avg. Order Value - Online" 
                value={`₹${Number(aov.ONLINE).toFixed(2)}`}
                icon={<IndianRupee className="text-blue-600" size={28} />}
                gradient="from-blue-50 to-blue-100"
                borderColor="border-blue-200"
              />
              <KpiCard 
                title="Avg. Order Value - In-Store" 
                value={`₹${Number(aov.IN_STORE).toFixed(2)}`}
                icon={<IndianRupee className="text-purple-600" size={28} />}
                gradient="from-purple-50 to-purple-100"
                borderColor="border-purple-200"
              />
            </div>

            {/* Charts & Data Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* Bar Chart */}
              <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                  <TrendingUp className="mr-2 text-gray-500" size={20} />
                  Total Sales by Category
                </h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesByCategory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="category" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 13 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tickFormatter={(val) => `₹${val}`} 
                        tick={{ fill: '#64748b', fontSize: 13 }}
                      />
                      <Tooltip 
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value) => [`₹${value}`, 'Sales']}
                      />
                      <Bar dataKey="totalSales" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                  <Users className="mr-2 text-gray-500" size={20} />
                  Top Customers
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-50/50 rounded-lg">
                      <tr>
                        <th className="px-4 py-3 font-semibold rounded-tl-lg">Customer</th>
                        <th className="px-4 py-3 font-semibold rounded-tr-lg text-right">Spent</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {topCustomers.map((customer) => (
                        <tr key={customer.customerId} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-4 py-3.5">
                            <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {customer.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">{customer.email}</div>
                          </td>
                          <td className="px-4 py-3.5 text-right font-bold text-gray-700">
                            ₹{Number(customer.totalSpent).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      {topCustomers.length === 0 && (
                        <tr>
                          <td colSpan={2} className="px-4 py-8 text-center text-gray-400">
                            No customers found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Minimal sub-components
function NavItem({ icon, label, active = false }) {
  return (
    <button 
      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all ${
        active 
          ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </button>
  );
}

function KpiCard({ title, value, icon, gradient, borderColor }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 border ${borderColor} flex items-center justify-between transition-transform hover:-translate-y-1 duration-300`}>
      <div>
        <p className="text-sm font-semibold text-gray-600 mb-1">{title}</p>
        <h4 className="text-3xl font-extrabold text-gray-900">{value}</h4>
      </div>
      <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-sm">
        {icon}
      </div>
    </div>
  );
}
