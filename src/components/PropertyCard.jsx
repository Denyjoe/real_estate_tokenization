import { MapPinIcon } from './Icons';

function PropertyCard({ property, onBuy, onViewDetails }) {
  const src = property.image || property.imageFallback;

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
      <div className="aspect-[400/260] bg-gray-100 overflow-hidden">
        <img
          src={src}
          alt={property.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            if (property.imageFallback && e.target.src !== property.imageFallback) {
              e.target.src = property.imageFallback;
            }
          }}
        />
      </div>
      <div className="p-5">
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
          {property.status}
        </span>
        <h3 className="mt-3 text-lg font-semibold text-stellar-dark">{property.name}</h3>
        <p className="mt-1 text-sm text-stellar-muted flex items-center gap-1">
          <MapPinIcon className="h-4 w-4 shrink-0" />
          {property.location || property.address}
        </p>
        <p className="mt-3 text-sm text-stellar-dark/90 line-clamp-3">
          {property.description}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="font-medium text-stellar-dark">
              ${property.pricePerToken || property.price}
              <span className="text-stellar-muted font-normal">/token</span>
            </span>
            {property.yield && (
              <span className="text-stellar-muted">
                Yield <span className="font-medium text-stellar-dark">{property.yield}</span>
              </span>
            )}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {onViewDetails && (
              <button
                type="button"
                onClick={() => onViewDetails(property)}
                className="flex-1 sm:flex-initial min-h-[44px] rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-stellar-dark hover:bg-gray-50 transition-colors"
              >
                View Details
              </button>
            )}
            <button
              type="button"
              onClick={() => (onBuy ? onBuy(property) : alert(`Buy tokens: ${property.name}`))}
              className="flex-1 sm:flex-initial min-h-[44px] rounded-lg bg-stellar-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5851e8] transition-colors"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
