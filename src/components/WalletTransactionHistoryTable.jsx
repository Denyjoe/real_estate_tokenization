function WalletTransactionHistoryTable({ transactions = [], loading, stellarExpertTxUrl, emptyMessage }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-card overflow-hidden">
      <div className="border-b border-gray-200 px-5 py-4">
        <h3 className="text-sm font-medium text-stellar-dark">Transaction history</h3>
      </div>
      <div className="overflow-x-auto">
        {loading || transactions.length === 0 ? (
          <div className="px-5 py-8 text-center text-stellar-muted text-sm">
            {loading ? 'Loading…' : (emptyMessage || 'No transactions yet')}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="px-5 py-3 text-left font-medium text-stellar-muted">Date</th>
                <th className="px-5 py-3 text-left font-medium text-stellar-muted">Type</th>
                <th className="px-5 py-3 text-left font-medium text-stellar-muted">Token</th>
                <th className="px-5 py-3 text-right font-medium text-stellar-muted">Amount</th>
                <th className="px-5 py-3 text-left font-medium text-stellar-muted">Status</th>
                <th className="px-5 py-3 text-left font-medium text-stellar-muted">Transaction Hash</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => {
                const txUrl = stellarExpertTxUrl && tx.txHash ? stellarExpertTxUrl(tx.txHash) : null;
                return (
                  <tr
                    key={tx.id}
                    className={`border-b border-gray-100 last:border-0 hover:bg-gray-50/70 ${
                      i % 2 === 1 ? 'bg-gray-50/40' : ''
                    }`}
                  >
                    <td className="px-5 py-3 text-stellar-dark">{tx.date}</td>
                    <td className="px-5 py-3 font-medium text-stellar-dark">{tx.type}</td>
                    <td className="px-5 py-3 font-mono text-stellar-dark">{tx.token}</td>
                    <td className="px-5 py-3 text-right font-medium text-stellar-dark">{tx.amount}</td>
                    <td className="px-5 py-3">
                      <span className={tx.status === 'Completed' ? 'text-green-600' : 'text-amber-600'}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs truncate max-w-[120px]" title={tx.txHash}>
                      {txUrl ? (
                        <a href={txUrl} target="_blank" rel="noopener noreferrer" className="text-stellar-primary hover:underline">
                          {tx.txHash.slice(0, 8)}…
                        </a>
                      ) : (
                        <span className="text-stellar-muted">{tx.txHash}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default WalletTransactionHistoryTable;
