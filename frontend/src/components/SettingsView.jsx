import React, { useState } from 'react';
import { Bell, Database, Download, Trash2, Palette, Globe } from 'lucide-react';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState('Appearance');
  const [activeTheme, setActiveTheme] = useState('Light');
  const [activeColor, setActiveColor] = useState('bg-blue-600');

  return (
    <div className="max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4 min-h-[600px]">
        {/* Settings Sidebar */}
        <div className="bg-gray-50/50 p-6 border-r border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Preferences</h3>
          <nav className="space-y-1">
            <SettingsTab 
              active={activeTab === 'Appearance'} 
              onClick={() => setActiveTab('Appearance')}
              icon={<Palette className="w-4 h-4" />} 
              label="Appearance" 
            />
            <SettingsTab 
              active={activeTab === 'Notifications'} 
              onClick={() => setActiveTab('Notifications')}
              icon={<Bell className="w-4 h-4" />} 
              label="Notifications" 
            />
            <SettingsTab 
              active={activeTab === 'Language & Region'} 
              onClick={() => setActiveTab('Language & Region')}
              icon={<Globe className="w-4 h-4" />} 
              label="Language & Region" 
            />
          </nav>

          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 mt-8">Data Management</h3>
          <nav className="space-y-1">
            <SettingsTab 
              active={activeTab === 'Data Sources'} 
              onClick={() => setActiveTab('Data Sources')}
              icon={<Database className="w-4 h-4" />} 
              label="Data Sources" 
            />
            <SettingsTab 
              active={activeTab === 'Export Data'} 
              onClick={() => setActiveTab('Export Data')}
              icon={<Download className="w-4 h-4" />} 
              label="Export Data" 
            />
            <SettingsTab 
              active={activeTab === 'Clear Cache'} 
              onClick={() => setActiveTab('Clear Cache')}
              icon={<Trash2 className="w-4 h-4" />} 
              label="Clear Cache" 
            />
          </nav>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3 p-8">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{activeTab} Settings</h2>
            
            {activeTab === 'Appearance' ? (
              <div className="space-y-8">
                {/* Theme Toggle */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Theme Preference</h4>
                  <p className="text-sm text-gray-500 mb-4">Choose how Retail Pulse looks to you.</p>
                  <div className="grid grid-cols-3 gap-4">
                    <ThemeOption 
                      label="Light" 
                      active={activeTheme === 'Light'} 
                      onClick={() => setActiveTheme('Light')}
                      className="bg-gray-100" 
                    />
                    <ThemeOption 
                      label="Dark" 
                      active={activeTheme === 'Dark'} 
                      onClick={() => setActiveTheme('Dark')}
                      className="bg-gray-900" 
                    />
                    <ThemeOption 
                      label="System" 
                      active={activeTheme === 'System'} 
                      onClick={() => setActiveTheme('System')}
                      className="bg-gradient-to-r from-gray-100 to-gray-900" 
                    />
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Accent Color */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Accent Color</h4>
                  <p className="text-sm text-gray-500 mb-4">Choose your dashboard's primary brand color.</p>
                  <div className="flex space-x-3">
                    <ColorDot color="bg-blue-600" active={activeColor === 'bg-blue-600'} onClick={() => setActiveColor('bg-blue-600')} />
                    <ColorDot color="bg-purple-600" active={activeColor === 'bg-purple-600'} onClick={() => setActiveColor('bg-purple-600')} />
                    <ColorDot color="bg-green-600" active={activeColor === 'bg-green-600'} onClick={() => setActiveColor('bg-green-600')} />
                    <ColorDot color="bg-orange-600" active={activeColor === 'bg-orange-600'} onClick={() => setActiveColor('bg-orange-600')} />
                    <ColorDot color="bg-rose-600" active={activeColor === 'bg-rose-600'} onClick={() => setActiveColor('bg-rose-600')} />
                  </div>
                </div>

                <hr className="border-gray-100" />

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button className={`px-4 py-2 text-sm font-medium text-white ${activeColor} rounded-lg shadow-sm transition-colors`}>
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-xl">
                <p className="text-gray-400">Settings for {activeTab} are currently unavailable.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
        active ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function ThemeOption({ label, className, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
        active ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 hover:border-gray-300'
      }`}
    >
      <div className={`w-full h-16 rounded-md mb-3 ${className}`}></div>
      <span className={`text-sm font-medium ${active ? 'text-blue-700' : 'text-gray-600'}`}>{label}</span>
    </button>
  );
}

function ColorDot({ color, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-8 h-8 rounded-full ${color} ${
        active ? 'ring-2 ring-offset-2 ring-blue-600' : 'opacity-80 hover:opacity-100 cursor-pointer'
      }`}
    ></button>
  );
}
