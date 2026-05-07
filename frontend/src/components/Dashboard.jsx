import React, { useState } from 'react';
import { LayoutDashboard, ShoppingCart, Users, Settings } from 'lucide-react';
import DashboardView from './DashboardView';
import OrdersView from './OrdersView';
import CustomersView from './CustomersView';
import SettingsView from './SettingsView';

export default function Dashboard() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'orders': return <OrdersView />;
      case 'customers': return <CustomersView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

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
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={activeView === 'dashboard'} 
            onClick={() => setActiveView('dashboard')}
          />
          <NavItem 
            icon={<ShoppingCart size={20} />} 
            label="Orders" 
            active={activeView === 'orders'} 
            onClick={() => setActiveView('orders')}
          />
          <NavItem 
            icon={<Users size={20} />} 
            label="Customers" 
            active={activeView === 'customers'} 
            onClick={() => setActiveView('customers')}
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={activeView === 'settings'} 
            onClick={() => setActiveView('settings')}
          />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-10">
        <header className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 capitalize">
            {activeView} Overview
          </h2>
          <p className="text-gray-500 mt-1">
            Manage your retail {activeView} in real-time.
          </p>
        </header>

        {/* Dynamic View Rendering */}
        {renderView()}
      </main>
    </div>
  );
}

// Minimal sub-component for Navigation Items
function NavItem({ icon, label, active = false, onClick }) {
  return (
    <button 
      onClick={onClick}
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
