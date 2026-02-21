function PropertiesPropertyCard({ property, onViewDetails, onBuyTokens }) {
  const ownershipPercent =
    property.totalTokens > 0
      ? Math.round((property.yourTokenBalance / property.totalTokens) * 100)
      : 0;

  return (
    <div
      className={`rounded-xl border bg-white p-5 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 ${
        property.featured ? 'border-stellar-primary/30 ring-1 ring-stellar-primary/10' : 'border-gray-200'
      }`}
    >
      {property.featured && (
        <span className="inline-block rounded-full bg-stellar-primary/10 px-2.5 py-0.5 text-xs font-medium text-stellar-primary mb-3">
          Featured
        </span>
      )}
      <h3 className="text-lg font-semibold text-stellar-dark">{property.name}</h3>
      <p className="mt-1 text-sm text-stellar-muted">{property.location}</p>
      <p className="mt-0.5 text-xs font-medium text-stellar-dark/80">{property.type}</p>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-stellar-muted">Total value</span>
          <span className="font-medium text-stellar-dark">${property.totalValue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-stellar-muted">Token</span>
          <span className="font-medium text-stellar-dark">{property.tokenName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-stellar-muted">Total tokens</span>
          <span className="font-medium text-stellar-dark">{property.totalTokens.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-stellar-muted">Your balance</span>
          <span className="font-medium text-stellar-dark">{property.yourTokenBalance.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-stellar-muted">Ownership</span>
          <span className="font-medium text-stellar-primary">{ownershipPercent}%</span>
        </div>
      </div>

      {/* Mini ownership bar */}
      <div className="mt-3 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-stellar-primary transition-all duration-300"
          style={{ width: `${Math.min(ownershipPercent, 100)}%` }}
          aria-hidden
        />
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={() => (onViewDetails ? onViewDetails(property) : alert(`View details: ${property.name}`))}
          className="flex-1 w-full min-h-[44px] rounded-lg border border-gray-200 bg-white py-2.5 px-4 text-sm font-medium text-stellar-dark hover:bg-gray-50 transition-colors"
        >
          View Details
        </button>
        <button
          type="button"
          onClick={() => (onBuyTokens ? onBuyTokens(property) : alert(`Buy tokens: ${property.name}`))}
          className="flex-1 w-full min-h-[44px] rounded-lg bg-stellar-primary py-2.5 px-4 text-sm font-medium text-white hover:bg-[#5851e8] transition-colors"
        >
          Buy Tokens
        </button>
      </div>
    </div>
  );
}

export default PropertiesPropertyCard;
