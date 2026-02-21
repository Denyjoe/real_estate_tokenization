function WalletOverviewCard({ overview, onCopyAddress, stellarExpertUrl, onFundTestnet, fundLoading }) {
  const address = overview?.address ?? '';
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-stellar-muted">Wallet Address</p>
          <p className="mt-1 font-mono text-lg font-semibold text-stellar-dark break-all" title={address}>
            {overview?.addressShort || address || '—'}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              {overview?.network ?? 'Stellar Testnet'}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-stellar-muted">
              <span className={`h-2 w-2 rounded-full ${overview?.connected !== false ? 'bg-stellar-success' : 'bg-gray-300'}`} aria-hidden />
              {overview?.connected !== false ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {stellarExpertUrl && (
            <a
              href={stellarExpertUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-stellar-dark hover:bg-gray-50 transition-colors"
            >
              View on Stellar Expert
            </a>
          )}
          <button
            type="button"
            onClick={() => (onCopyAddress ? onCopyAddress(address) : navigator.clipboard?.writeText(address))}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-stellar-dark hover:bg-gray-50 transition-colors"
          >
            Copy Address
          </button>
          {onFundTestnet && (
            <button
              type="button"
              onClick={onFundTestnet}
              disabled={fundLoading}
              className="rounded-lg bg-stellar-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5851e8] disabled:opacity-70"
            >
              {fundLoading ? 'Funding…' : 'Fund with Testnet XLM'}
            </button>
          )}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100">
        <div>
          <p className="text-sm font-medium text-stellar-muted">XLM Balance</p>
          <p className="mt-1 text-2xl font-semibold text-stellar-dark">
            {overview?.xlmBalance != null ? overview.xlmBalance : (overview?.portfolioValue != null ? `$${Number(overview.portfolioValue).toLocaleString()}` : '—')}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-stellar-muted">Total Tokens Owned</p>
          <p className="mt-1 text-2xl font-semibold text-stellar-dark">
            {overview?.totalTokensOwned != null ? String(overview.totalTokensOwned) : '—'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WalletOverviewCard;
