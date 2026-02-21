function WalletTokenBalancesTable({ balances = [], loading, emptyMessage }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-card overflow-hidden">
      <div className="border-b border-gray-200 px-5 py-4">
        <h3 className="text-sm font-medium text-stellar-dark">Token balances</h3>
      </div>
      <div className="overflow-x-auto">
        {loading || balances.length === 0 ? (
          <div className="px-5 py-8 text-center text-stellar-muted text-sm">
            {loading ? 'Loading…' : (emptyMessage || 'No token balances')}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="px-5 py-3 text-left font-medium text-stellar-muted">Token</th>
                <th className="px-5 py-3 text-left font-medium text-stellar-muted">Property</th>
                <th className="px-5 py-3 text-right font-medium text-stellar-muted">Balance</th>
                <th className="px-5 py-3 text-right font-medium text-stellar-muted">Ownership %</th>
                <th className="px-5 py-3 text-right font-medium text-stellar-muted">Value</th>
              </tr>
            </thead>
            <tbody>
              {balances.map((row, i) => {
                const ownershipPercent = row.totalTokens > 0 ? Math.round((row.balance / row.totalTokens) * 100) : 0;
                return (
                  <tr
                    key={`${row.token}-${i}`}
                    className={`border-b border-gray-100 last:border-0 hover:bg-gray-50/70 ${
                      i % 2 === 1 ? 'bg-gray-50/40' : ''
                    }`}
                  >
                    <td className="px-5 py-3 font-mono font-medium text-stellar-dark">{row.token}</td>
                    <td className="px-5 py-3 text-stellar-muted">{row.property}</td>
                    <td className="px-5 py-3 text-right font-medium text-stellar-dark">
                      {typeof row.balance === 'number' ? row.balance.toLocaleString() : row.balance}
                    </td>
                    <td className="px-5 py-3 text-right text-stellar-primary font-medium">{ownershipPercent}%</td>
                    <td className="px-5 py-3 text-right font-medium text-stellar-dark">
                      {typeof row.value === 'number' ? `$${row.value.toLocaleString()}` : row.value}
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

export default WalletTokenBalancesTable;
