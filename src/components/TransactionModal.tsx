import type { Transaction } from '../types/transactions';

const STELLAR_EXPLORER = 'https://stellar.expert/explorer/testnet/tx/';

const statusClasses: Record<Transaction['status'], string> = {
  Completed: 'bg-green-100 text-green-800',
  Pending: 'bg-amber-100 text-amber-800',
  Failed: 'bg-red-100 text-red-800',
};

interface TransactionModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export default function TransactionModal({ transaction, onClose }: TransactionModalProps) {
  if (!transaction) return null;

  const statusClass = statusClasses[transaction.status] ?? 'bg-gray-100 text-gray-800';
  const explorerUrl = transaction.stellarTxHash ? `${STELLAR_EXPLORER}${transaction.stellarTxHash}` : STELLAR_EXPLORER;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <div className="relative w-full sm:max-w-lg sm:rounded-xl border-0 sm:border border-gray-200 bg-white shadow-xl flex flex-col max-h-[95vh] sm:max-h-[90vh] rounded-t-xl sm:rounded-b-xl overflow-hidden">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">Transaction details</h3>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4">
          <div>
            <p className="text-xs font-medium text-gray-500">Transaction ID</p>
            <p className="font-mono text-sm text-gray-900">{transaction.id}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Full wallet address</p>
            <p className="font-mono text-sm text-gray-900 break-all">{transaction.wallet}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Property name</p>
            <p className="text-sm text-gray-900">{transaction.property}</p>
          </div>
          {transaction.propertyImage && (
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Property image</p>
              <img
                src={transaction.propertyImage}
                alt=""
                className="h-24 w-full max-w-xs rounded-lg object-cover"
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500">Amount paid</p>
              <p className="text-sm font-semibold text-gray-900">${transaction.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">Tokens received</p>
              <p className="text-sm font-semibold text-gray-900">{transaction.tokens}</p>
            </div>
          </div>
          {transaction.stellarFee != null && (
            <div>
              <p className="text-xs font-medium text-gray-500">Stellar network fee</p>
              <p className="text-sm text-gray-900">{transaction.stellarFee} XLM</p>
            </div>
          )}
          <div>
            <p className="text-xs font-medium text-gray-500">Date & time</p>
            <p className="text-sm text-gray-900">{transaction.datetime || transaction.date}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Status</p>
            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClass}`}>
              {transaction.status}
            </span>
          </div>
          {transaction.stellarTxHash && (
            <div>
              <p className="text-xs font-medium text-gray-500">Stellar transaction hash</p>
              <p className="font-mono text-xs text-gray-600 break-all">{transaction.stellarTxHash}</p>
            </div>
          )}
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full justify-center items-center min-h-[44px] rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View on Stellar Explorer
          </a>
        </div>
      </div>
    </div>
  );
}
