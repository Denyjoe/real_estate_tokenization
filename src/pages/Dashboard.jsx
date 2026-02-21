import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import OverviewCards from '../components/OverviewCards';
import OwnershipChart from '../components/OwnershipChart';
import DashboardPropertyCard from '../components/DashboardPropertyCard';
import TransactionsTable from '../components/TransactionsTable';
import PropertyDetailModal from '../components/PropertyDetailModal';
import CreateWalletModal from '../components/CreateWalletModal';
import {
  dashboardOverview,
  ownershipChartData,
  dashboardProperties,
  mockTransactions,
} from '../data/mockData';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [createWalletOpen, setCreateWalletOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stellar-surface">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-56">
        <Navbar onMenuClick={() => setSidebarOpen((o) => !o)} />
        <main className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-xl font-semibold text-stellar-dark">Dashboard</h1>
            <button
              type="button"
              onClick={() => setCreateWalletOpen(true)}
              className="w-full sm:w-auto min-h-[44px] rounded-lg bg-stellar-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5851e8] transition-colors"
            >
              Create Wallet
            </button>
          </div>

          {/* 1. Overview cards */}
          <section className="mb-8">
            <OverviewCards overview={dashboardOverview} />
          </section>

          {/* 2. Ownership chart */}
          <section className="mb-8">
            <OwnershipChart data={ownershipChartData} />
          </section>

          {/* 3. Property cards */}
          <section className="mb-8">
            <h2 className="text-sm font-medium text-stellar-muted mb-4">Your properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardProperties.map((p) => (
                <DashboardPropertyCard
                  key={p.id}
                  property={p}
                  onViewDetails={setSelectedProperty}
                />
              ))}
            </div>
          </section>

          {/* 4. Recent transactions */}
          <section>
            <TransactionsTable transactions={mockTransactions} />
          </section>
        </main>
      </div>
      <PropertyDetailModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      <CreateWalletModal
        open={createWalletOpen}
        onClose={() => setCreateWalletOpen(false)}
        onSuccess={() => setCreateWalletOpen(false)}
      />
    </div>
  );
}

export default Dashboard;
