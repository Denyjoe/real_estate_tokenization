function DashboardPropertyCard({ property, onViewDetails }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow">
      <h3 className="text-lg font-semibold text-stellar-dark">{property.name}</h3>
      <p className="mt-1 text-sm text-stellar-muted">{property.location}</p>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <span className="text-stellar-muted">Total value</span>
          <p className="font-medium text-stellar-dark">${property.totalValue.toLocaleString()}</p>
        </div>
        <div>
          <span className="text-stellar-muted">Token</span>
          <p className="font-medium text-stellar-dark">{property.tokenName}</p>
        </div>
        <div>
          <span className="text-stellar-muted">Total tokens</span>
          <p className="font-medium text-stellar-dark">{property.totalTokens.toLocaleString()}</p>
        </div>
        <div>
          <span className="text-stellar-muted">Your balance</span>
          <p className="font-medium text-stellar-dark">{property.yourTokenBalance.toLocaleString()}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => (onViewDetails ? onViewDetails(property) : alert(`View details: ${property.name}`))}
        className="mt-4 w-full min-h-[44px] rounded-lg border border-gray-200 bg-white py-2.5 px-4 text-sm font-medium text-stellar-dark hover:bg-gray-50 transition-colors"
      >
        View Details
      </button>
    </div>
  );
}

export default DashboardPropertyCard;
