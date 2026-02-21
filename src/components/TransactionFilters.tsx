interface TransactionFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  typeFilter: string;
  onTypeFilterChange: (v: string) => void;
  statusFilter: string;
  onStatusFilterChange: (v: string) => void;
  dateFilter: string;
  onDateFilterChange: (v: string) => void;
  onExport: () => void;
}

const TYPE_OPTIONS = ['All', 'Buy', 'Sell', 'Transfer', 'Deposit', 'Withdrawal'];
const STATUS_OPTIONS = ['All', 'Completed', 'Pending', 'Failed'];
const DATE_OPTIONS = ['Today', 'Last 7 days', 'Last 30 days', 'Custom'];

export default function TransactionFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  dateFilter,
  onDateFilterChange,
  onExport,
}: TransactionFiltersProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          <label htmlFor="tx-search" className="sr-only">Search</label>
          <input
            id="tx-search"
            type="search"
            placeholder="Search by Property Name, Tx ID, or Wallet..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Transaction type"
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <select
            aria-label="Status"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <select
            aria-label="Date range"
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            {DATE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={onExport}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
