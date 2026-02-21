import { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import PropertiesPropertyCard from '../components/PropertiesPropertyCard';
import PropertiesTable from '../components/PropertiesTable';
import PropertyDetailModal from '../components/PropertyDetailModal';
import BuyTokensModal from '../components/BuyTokensModal';
import { propertiesPageList } from '../data/mockData';

const LOCATIONS = [...new Set(propertiesPageList.map((p) => p.location))].sort();
const TOKEN_NAMES = [...new Set(propertiesPageList.map((p) => p.tokenName))].sort();
const SORT_OPTIONS = [
  { value: 'value-desc', label: 'Value (high to low)' },
  { value: 'value-asc', label: 'Value (low to high)' },
  { value: 'ownership-desc', label: 'Ownership % (high to low)' },
  { value: 'ownership-asc', label: 'Ownership % (low to high)' },
  { value: 'recent', label: 'Recently added' },
];

function PropertiesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterToken, setFilterToken] = useState('');
  const [filterValueRange, setFilterValueRange] = useState('');
  const [sortBy, setSortBy] = useState('value-desc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [buyProperty, setBuyProperty] = useState(null);

  const filteredAndSorted = useMemo(() => {
    const q = search.toLowerCase().trim();
    let list = propertiesPageList.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q) && !p.tokenName.toLowerCase().includes(q)) return false;
      if (filterLocation && p.location !== filterLocation) return false;
      if (filterToken && p.tokenName !== filterToken) return false;
      if (filterValueRange) {
        const [min, max] = filterValueRange.split('-').map(Number);
        if (max) {
          if (p.totalValue < min || p.totalValue > max) return false;
        } else if (p.totalValue < min) return false;
      }
      return true;
    });

    const ownership = (p) => (p.totalTokens > 0 ? (p.yourTokenBalance / p.totalTokens) * 100 : 0);
    if (sortBy === 'value-desc') list = [...list].sort((a, b) => b.totalValue - a.totalValue);
    else if (sortBy === 'value-asc') list = [...list].sort((a, b) => a.totalValue - b.totalValue);
    else if (sortBy === 'ownership-desc') list = [...list].sort((a, b) => ownership(b) - ownership(a));
    else if (sortBy === 'ownership-asc') list = [...list].sort((a, b) => ownership(a) - ownership(b));
    else if (sortBy === 'recent') list = [...list].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));

    return list;
  }, [search, filterLocation, filterToken, filterValueRange, sortBy]);

  const handleBuyTokens = (property) => setBuyProperty(property);

  return (
    <div className="min-h-screen bg-stellar-surface">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-56">
        <Navbar onMenuClick={() => setSidebarOpen((o) => !o)} />
        <main className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-xl font-semibold text-stellar-dark">Properties</h1>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-stellar-primary text-white' : 'bg-white border border-gray-200 text-stellar-muted hover:bg-gray-50'
                }`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === 'table' ? 'bg-stellar-primary text-white' : 'bg-white border border-gray-200 text-stellar-muted hover:bg-gray-50'
                }`}
              >
                Table
              </button>
            </div>
          </div>

          {/* Search and filters */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-card mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 min-w-0">
                <label htmlFor="search" className="sr-only">Search</label>
                <input
                  id="search"
                  type="search"
                  placeholder="Search by property name, location, or token name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-stellar-dark placeholder:text-stellar-muted focus:border-stellar-primary focus:ring-1 focus:ring-stellar-primary"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  aria-label="Filter by location"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-stellar-dark focus:border-stellar-primary focus:ring-1 focus:ring-stellar-primary"
                >
                  <option value="">All locations</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <select
                  aria-label="Filter by token"
                  value={filterToken}
                  onChange={(e) => setFilterToken(e.target.value)}
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-stellar-dark focus:border-stellar-primary focus:ring-1 focus:ring-stellar-primary"
                >
                  <option value="">All tokens</option>
                  {TOKEN_NAMES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <select
                  aria-label="Filter by value range"
                  value={filterValueRange}
                  onChange={(e) => setFilterValueRange(e.target.value)}
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-stellar-dark focus:border-stellar-primary focus:ring-1 focus:ring-stellar-primary"
                >
                  <option value="">Any value</option>
                  <option value="0-200000">Under $200k</option>
                  <option value="200000-500000">$200k – $500k</option>
                  <option value="500000-1500000">$500k – $1.5M</option>
                  <option value="1500000-999999999">Over $1.5M</option>
                </select>
                <select
                  aria-label="Sort by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-stellar-dark focus:border-stellar-primary focus:ring-1 focus:ring-stellar-primary"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAndSorted.map((p) => (
                <PropertiesPropertyCard
                  key={p.id}
                  property={p}
                  onViewDetails={setSelectedProperty}
                  onBuyTokens={handleBuyTokens}
                />
              ))}
            </div>
          )}

          {viewMode === 'table' && (
            <PropertiesTable
              properties={filteredAndSorted}
              onViewDetails={setSelectedProperty}
              onBuyTokens={handleBuyTokens}
            />
          )}

          {filteredAndSorted.length === 0 && (
            <p className="text-center text-stellar-muted py-12">No properties match your filters.</p>
          )}
        </main>
      </div>
      <PropertyDetailModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      <BuyTokensModal
        property={buyProperty}
        onClose={() => setBuyProperty(null)}
        onSuccess={() => setBuyProperty(null)}
      />
    </div>
  );
}

export default PropertiesPage;
