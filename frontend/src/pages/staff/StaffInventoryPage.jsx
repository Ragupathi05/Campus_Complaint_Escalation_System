import React, { useState } from 'react';
import { Package, Plus, CheckCircle, AlertCircle, ShoppingCart } from 'lucide-react';

export const StaffInventoryPage = () => {
  const [requests, setRequests] = useState([
    { id: 1, itemName: 'LED Tube Light 22W (Philips)', qty: 4, ticketNumber: 'MITS-2026-7707F0', status: 'APPROVED' },
    { id: 2, itemName: 'MCB Circuit Breaker 32A', qty: 2, ticketNumber: 'MITS-2026-8809A1', status: 'PENDING' },
  ]);

  const [form, setForm] = useState({ itemName: '', qty: 1, ticketNumber: '', remarks: '' });
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequests([
      ...requests,
      { id: Date.now(), itemName: form.itemName, qty: form.qty, ticketNumber: form.ticketNumber, status: 'PENDING' },
    ]);
    setForm({ itemName: '', qty: 1, ticketNumber: '', remarks: '' });
    setModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Equipment & Spare Parts Requisition Tool</h2>
          <p className="text-xs text-slate-500">Request replacement electrical/plumbing components for active tickets</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Spare Part Request</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Requisitions Submitted</p>
            <h3 className="text-2xl font-bold text-slate-800">{requests.length}</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Approved & Issued</p>
            <h3 className="text-2xl font-bold text-emerald-600">
              {requests.filter((r) => r.status === 'APPROVED').length}
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Pending Store Dispatch</p>
            <h3 className="text-2xl font-bold text-cyan-700">
              {requests.filter((r) => r.status === 'PENDING').length}
            </h3>
          </div>
          <div className="p-3 bg-cyan-50 text-cyan-700 rounded-xl border border-cyan-100">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
            <tr>
              <th className="px-4 py-3">Req ID</th>
              <th className="px-4 py-3">Component / Spare Part Item</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">For Ticket #</th>
              <th className="px-4 py-3">Store Approval Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {requests.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-slate-400">REQ-{r.id.toString().slice(-4)}</td>
                <td className="px-4 py-3 font-sans font-semibold text-slate-800">{r.itemName}</td>
                <td className="px-4 py-3 font-bold text-slate-800">{r.qty} Pcs</td>
                <td className="px-4 py-3 text-indigo-600 font-bold">{r.ticketNumber || 'General Stock'}</td>
                <td className="px-4 py-3 font-sans">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      r.status === 'APPROVED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : 'bg-sky-50 text-sky-800 border border-sky-200'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800">New Spare Part Requisition</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Component / Spare Part Name</label>
                <input
                  type="text"
                  required
                  value={form.itemName}
                  onChange={(e) => setForm({ ...form, itemName: e.target.value })}
                  placeholder="e.g. Copper Wire Coil / AC Capacitor 45uF"
                  className="w-full text-xs border rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Quantity Required</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={form.qty}
                  onChange={(e) => setForm({ ...form, qty: parseInt(e.target.value, 10) })}
                  className="w-full text-xs border rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Target Ticket #</label>
                <input
                  type="text"
                  value={form.ticketNumber}
                  onChange={(e) => setForm({ ...form, ticketNumber: e.target.value })}
                  placeholder="MITS-2026-7707F0"
                  className="w-full text-xs border rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">
                  Submit Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
