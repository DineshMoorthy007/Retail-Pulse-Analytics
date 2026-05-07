import React, { useState } from 'react';
import { Search, Filter, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function OrdersView() {
  const [orders] = useState([
    { id: 'ORD-001', customer: 'Alice Johnson', date: '2026-05-01', amount: 115.49, status: 'Completed', channel: 'ONLINE' },
    { id: 'ORD-002', customer: 'Bob Smith', date: '2026-05-02', amount: 45.00, status: 'Processing', channel: 'IN_STORE' },
    { id: 'ORD-003', customer: 'Alice Johnson', date: '2026-05-03', amount: 25.99, status: 'Completed', channel: 'ONLINE' },
    { id: 'ORD-004', customer: 'Charlie Davis', date: '2026-05-04', amount: 120.00, status: 'Pending', channel: 'IN_STORE' },
    { id: 'ORD-005', customer: 'Diana Prince', date: '2026-05-05', amount: 199.99, status: 'Completed', channel: 'ONLINE' },
    { id: 'ORD-006', customer: 'Edward Norton', date: '2026-05-06', amount: 110.00, status: 'Cancelled', channel: 'ONLINE' },
  ]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Completed</span>;
      case 'Processing': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" /> Processing</span>;
      case 'Pending': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" /> Pending</span>;
      case 'Cancelled': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" /> Cancelled</span>;
      default: return null;
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
        </div>
        <button className="flex items-center space-x-2 text-sm text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 font-semibold">Order ID</th>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Channel</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-blue-600 cursor-pointer hover:underline">{order.id}</td>
                <td className="px-6 py-4 text-gray-700 font-medium">{order.customer}</td>
                <td className="px-6 py-4 text-gray-500">{order.date}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-md ${order.channel === 'ONLINE' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                    {order.channel}
                  </span>
                </td>
                <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">₹{order.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
