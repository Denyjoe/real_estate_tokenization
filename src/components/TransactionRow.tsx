import type { Transaction, TransactionStatus } from '../types/transactions';

function shortWallet(wallet: string): string {
  if (wallet.length <= 12) return wallet;
  return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
}

const statusClasses: Record<TransactionStatus, string> = {
  Completed: 'bg-green-100 text-green-800',
  Pending: 'bg-amber-100 text-amber-800',
  Failed: 'bg-red-100 text-red-800',
};

interface TransactionRowProps {
  transaction: Transaction;
  onView: (tx: Transaction) => void;
}

export default function TransactionRow({ transaction, onView }: TransactionRowProps) {
  const statusClass = statusClasses[transaction.status] ?? 'bg-gray-100 text-gray-800';

  return (
    <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70 transition-colors">
      <td className="px-4 py-3 font-mono text-sm text-gray-900">{transaction.id}</td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{transaction.property}</td>
      <td className="px-4 py-3">
        {transaction.propertyImage ? (
          <img
            src={transaction.propertyImage}
            alt=""
            className="h-10 w-10 rounded-lg object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-lg bg-gray-100" />
        )}
      </td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{transaction.type}</td>
      <td className="px-4 py-3 text-sm text-gray-900">${transaction.amount.toLocaleString()}</td>
      <td className="px-4 py-3 text-sm text-gray-900">{transaction.tokens}</td>
      <td className="px-4 py-3 font-mono text-xs text-gray-600">{shortWallet(transaction.wallet)}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{transaction.date}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClass}`}>
          {transaction.status}
        </span>
      </td>
      <td className="px-4 py-3">
        <button
          type="button"
          onClick={() => onView(transaction)}
          className="min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 rounded-lg border border-gray-200 bg-white px-4 py-2 sm:py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          View Details
        </button>
      </td>
    </tr>
  );
}
