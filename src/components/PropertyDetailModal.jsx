import { MapPinIcon } from './Icons';

function PropertyDetailModal({ property, onClose }) {
  if (!property) return null;

  const imageSrc = property.image || property.imageFallback;
  const ownershipPercent =
    property.totalTokens > 0
      ? Math.round((property.yourTokenBalance / property.totalTokens) * 100)
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="relative w-full sm:max-w-lg sm:rounded-xl border-0 sm:border border-gray-200 bg-white shadow-xl flex flex-col max-h-[95vh] sm:max-h-[90vh] rounded-t-xl sm:rounded-b-xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-detail-title"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
          <h2 id="property-detail-title" className="text-lg font-semibold text-stellar-dark truncate pr-2">
            {property.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2.5 text-stellar-muted hover:bg-gray-100 hover:text-stellar-dark transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4">
          {imageSrc && (
            <div className="aspect-[16/10] rounded-lg overflow-hidden bg-gray-100 -mx-4 sm:mx-0 sm:rounded-lg">
              <img
                src={imageSrc}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  if (property.imageFallback && e.target.src !== property.imageFallback) {
                    e.target.src = property.imageFallback;
                  }
                }}
              />
            </div>
          )}
          <div>
            <p className="text-xs font-medium text-stellar-muted">Location</p>
            <p className="text-sm text-stellar-dark flex items-center gap-1.5 mt-0.5">
              <MapPinIcon className="h-4 w-4 shrink-0 text-stellar-muted" />
              {property.location || property.address || '—'}
            </p>
          </div>
          {property.type && (
            <div>
              <p className="text-xs font-medium text-stellar-muted">Type</p>
              <p className="text-sm text-stellar-dark mt-0.5">{property.type}</p>
            </div>
          )}
          {property.description && (
            <div>
              <p className="text-xs font-medium text-stellar-muted">Description</p>
              <p className="text-sm text-stellar-dark/90 mt-0.5">{property.description}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-stellar-muted">Total value</p>
              <p className="text-sm font-semibold text-stellar-dark mt-0.5">
                ${(property.totalValue ?? 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-stellar-muted">Token</p>
              <p className="text-sm font-semibold text-stellar-dark mt-0.5 font-mono">
                {property.tokenName ?? '—'}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-stellar-muted">Total tokens</p>
              <p className="text-sm font-semibold text-stellar-dark mt-0.5">
                {(property.totalTokens ?? 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-stellar-muted">Your balance</p>
              <p className="text-sm font-semibold text-stellar-dark mt-0.5">
                {(property.yourTokenBalance ?? 0).toLocaleString()}
              </p>
            </div>
          </div>
          {(property.totalTokens > 0 || ownershipPercent > 0) && (
            <div>
              <p className="text-xs font-medium text-stellar-muted">Ownership</p>
              <p className="text-sm font-semibold text-stellar-primary mt-0.5">{ownershipPercent}%</p>
              <div className="mt-2 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-stellar-primary transition-all"
                  style={{ width: `${Math.min(ownershipPercent, 100)}%` }}
                  aria-hidden
                />
              </div>
            </div>
          )}
          {property.yield && (
            <div>
              <p className="text-xs font-medium text-stellar-muted">Yield</p>
              <p className="text-sm font-semibold text-stellar-dark mt-0.5">{property.yield}</p>
            </div>
          )}
          {property.status && (
            <div>
              <p className="text-xs font-medium text-stellar-muted">Status</p>
              <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 mt-0.5">
                {property.status}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailModal;
