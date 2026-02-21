function ActionCard({ onBuyTokens, onTransferTokens, onViewTransactions }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow">
      <h3 className="text-sm font-medium text-stellar-muted mb-4">Quick actions</h3>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={() => {
            if (typeof onBuyTokens === 'function') onBuyTokens();
            else alert('Buy Tokens – coming soon');
          }}
          className="rounded-lg bg-stellar-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5851e8] transition-colors"
        >
          Buy Tokens
        </button>
        <button
          type="button"
          onClick={() => {
            if (typeof onTransferTokens === 'function') onTransferTokens();
            else alert('Transfer Tokens – coming soon');
          }}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-stellar-dark hover:bg-gray-50 transition-colors"
        >
          Transfer Tokens
        </button>
        <button
          type="button"
          onClick={() => {
            if (typeof onViewTransactions === 'function') onViewTransactions();
            else alert('View Transactions');
          }}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-stellar-dark hover:bg-gray-50 transition-colors"
        >
          View Transactions
        </button>
      </div>
    </div>
  );
}

export default ActionCard;
