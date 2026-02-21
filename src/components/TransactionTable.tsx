import type { Transaction } from '../types/transactions';
import TransactionRow from './TransactionRow';

interface TransactionTableProps {
  transactions: Transaction[];
  onView: (tx: Transaction) => void;
  loading?: boolean;
}

function TableSkeleton() {
  return (
    <tbody>
      {[1, 2, 3, 4, 5].map((i) => (
        <tr key={i} className="border-b border-gray-100 animate-pulse">
          <td className="px-4 py-3"><div className="h-4 w-20 rounded bg-gray-200" /></td>
          <td className="px-4 py-3"><div className="h-4 w-32 rounded bg-gray-200" /></td>
          <td className="px-4 py-3"><div className="h-10 w-10 rounded-lg bg-gray-200" /></td>
          <td className="px-4 py-3"><div className="h-4 w-12 rounded bg-gray-200" /></td>
          <td className="px-4 py-3"><div className="h-4 w-14 rounded bg-gray-200" /></td>
          <td className="px-4 py-3"><div className="h-4 w-8 rounded bg-gray-200" /></td>
          <td className="px-4 py-3"><div className="h-4 w-16 rounded bg-gray-200" /></td>
          <td className="px-4 py-3"><div className="h-4 w-20 rounded bg-gray-200" /></td>
          <td className="px-4 py-3"><div className="h-6 w-16 rounded-full bg-gray-200" /></td>
          <td className="px-4 py-3"><div className="h-8 w-14 rounded bg-gray-200" /></td>
        </tr>
      ))}
    </tbody>
  );
}

export default function TransactionTable({ transactions, onView, loading }: TransactionTableProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/80">
              <th className="px-4 py-3 text-left font-medium text-gray-500">Transaction ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Property Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Image</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Type</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">Amount (USD)</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">Tokens</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Wallet</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Date</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Action</th>
            </tr>
          </thead>
          {loading ? (
            <TableSkeleton />
          ) : (
            <tbody>
              {transactions.map((tx) => (
                <TransactionRow key={tx.id} transaction={tx} onView={onView} />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
