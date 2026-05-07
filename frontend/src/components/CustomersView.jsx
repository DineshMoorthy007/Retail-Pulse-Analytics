import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MoreHorizontal, User } from 'lucide-react';

const API_BASE = 'http://localhost:8080/api/analytics';

export default function CustomersView() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We fetch top customers for this view as well
    const fetchCustomers = async () => {
      try {
        const res = await fetch(`${API_BASE}/top-customers?limit=8`);
        const data = await res.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {customers.map((customer) => (
        <div key={customer.customerId} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow relative group">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600 mb-4 shadow-inner">
              <User className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
            <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full mt-2 border border-blue-100">
              Top Spender
            </span>
            
            <div className="w-full mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                <span className="truncate">{customer.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Phone className="w-4 h-4 mr-3 text-gray-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                <span>Mumbai, India</span>
              </div>
            </div>

            <div className="w-full mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-500">Total Spent</span>
              <span className="font-bold text-gray-900 text-lg">₹{Number(customer.totalSpent).toFixed(2)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
