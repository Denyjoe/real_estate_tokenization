import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';
import TransactionFilters from '../components/TransactionFilters';
import TransactionTable from '../components/TransactionTable';
import TransactionModal from '../components/TransactionModal';
import { mockTransactions, mockSummaryStats } from '../data/transactionsMockData';
import type { Transaction } from '../types/transactions';
import { ClipboardDocumentListIcon } from '../components/Icons';

// #region agent log
if (typeof fetch !== 'undefined') {
  fetch('http://127.0.0.1:7688/ingest/91ec0445-cc46-4ab1-9135-d0f4041687a8', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '24adda' },
    body: JSON.stringify({
      sessionId: '24adda',
      location: 'TransactionsPage.tsx:module',
      message: 'TransactionsPage module evaluated',
      data: {},
      hypothesisId: 'A',
      timestamp: Date.now(),
    }),
  }).catch(() => {});
}
// #endregion

export default function TransactionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Last 30 days');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return mockTransactions.filter((tx) => {
      if (q && !tx.id.toLowerCase().includes(q) && !tx.property.toLowerCase().includes(q) && !tx.wallet.toLowerCase().includes(q)) return false;
      if (typeFilter !== 'All' && tx.type !== typeFilter) return false;
      if (statusFilter !== 'All' && tx.status !== statusFilter) return false;
      return true;
    });
  }, [search, typeFilter, statusFilter]);

  const handleExport = () => {
    alert('Export CSV – coming soon');
  };

  const isEmpty = !loading && filtered.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-56">
        <Navbar onMenuClick={() => setSidebarOpen((o) => !o)} />
        <main className="p-4 sm:p-6">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
            <p className="mt-1 text-sm text-gray-500">View all your token purchases, sales, and transfers</p>
          </div>

          <section className="mb-6">
            <SummaryCards stats={mockSummaryStats} />
          </section>

          <section className="mb-6">
            <TransactionFilters
              search={search}
              onSearchChange={setSearch}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              onExport={handleExport}
            />
          </section>

          <section>
            {isEmpty ? (
              <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
                <ClipboardDocumentListIcon className="mx-auto mb-4 h-16 w-16 text-gray-300" aria-hidden />
                <h3 className="text-lg font-medium text-gray-900">No transactions yet</h3>
                <p className="mt-1 text-sm text-gray-500">Your transaction history will appear here</p>
                <Link
                  to="/dashboard/properties"
                  className="mt-6 inline-flex rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                >
                  Invest in Properties
                </Link>
              </div>
            ) : (
              <TransactionTable
                transactions={filtered}
                onView={setSelectedTx}
                loading={loading}
              />
            )}
          </section>
        </main>
      </div>

      <TransactionModal transaction={selectedTx} onClose={() => setSelectedTx(null)} />
    </div>
  );
}
