function PropertiesTable({ properties, onViewDetails, onBuyTokens }) {
  const getOwnership = (p) =>
    p.totalTokens > 0 ? Math.round((p.yourTokenBalance / p.totalTokens) * 100) : 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/80">
              <th className="px-4 py-3 text-left font-medium text-stellar-muted">Property Name</th>
              <th className="px-4 py-3 text-left font-medium text-stellar-muted">Location</th>
              <th className="px-4 py-3 text-left font-medium text-stellar-muted">Total Value</th>
              <th className="px-4 py-3 text-left font-medium text-stellar-muted">Token</th>
              <th className="px-4 py-3 text-right font-medium text-stellar-muted">Total Tokens</th>
              <th className="px-4 py-3 text-right font-medium text-stellar-muted">Your Balance</th>
              <th className="px-4 py-3 text-right font-medium text-stellar-muted">Ownership</th>
              <th className="px-4 py-3 text-right font-medium text-stellar-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p, i) => (
              <tr
                key={p.id}
                className={`border-b border-gray-100 last:border-0 hover:bg-gray-50/70 ${
                  i % 2 === 1 ? 'bg-gray-50/40' : ''
                }`}
              >
                <td className="px-4 py-3 font-medium text-stellar-dark">{p.name}</td>
                <td className="px-4 py-3 text-stellar-muted">{p.location}</td>
                <td className="px-4 py-3 text-stellar-dark">${p.totalValue.toLocaleString()}</td>
                <td className="px-4 py-3 font-mono text-stellar-dark">{p.tokenName}</td>
                <td className="px-4 py-3 text-right text-stellar-dark">{p.totalTokens.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-medium text-stellar-dark">
                  {p.yourTokenBalance.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right font-medium text-stellar-primary">
                  {getOwnership(p)}%
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex flex-wrap justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onViewDetails(p)}
                      className="min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 rounded-lg border border-gray-200 px-3 py-2 sm:py-1.5 text-xs font-medium text-stellar-dark hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => onBuyTokens(p)}
                      className="min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 rounded-lg bg-stellar-primary px-3 py-2 sm:py-1.5 text-xs font-medium text-white hover:bg-[#5851e8] transition-colors"
                    >
                      Buy
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PropertiesTable;
