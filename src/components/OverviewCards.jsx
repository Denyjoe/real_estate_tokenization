import { getIcon } from './Icons';

function OverviewCards({ overview }) {
  const cards = [
    { label: 'Total Properties', value: overview.totalProperties, icon: 'BuildingOffice2' },
    { label: 'Total Tokens Owned', value: overview.totalTokensOwned.toLocaleString(), icon: 'CircleStack' },
    { label: 'Portfolio Value', value: `$${overview.portfolioValue.toLocaleString()}`, icon: 'CurrencyDollar' },
    { label: 'Connected Wallet', value: overview.connectedWallet, icon: 'Wallet', mono: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow"
        >
          <p className="text-sm font-medium text-stellar-muted">{card.label}</p>
          <p className={`mt-2 text-xl font-semibold text-stellar-dark flex items-center gap-2 ${card.mono ? 'font-mono truncate' : ''}`}>
            {card.icon && getIcon(card.icon, { className: 'h-5 w-5 text-stellar-muted' })}
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default OverviewCards;
