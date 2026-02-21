function WalletCard({ wallet }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-card hover:shadow-card-hover transition-shadow">
      <h3 className="text-sm font-medium text-stellar-muted">Wallet</h3>
      <p className="mt-1 font-mono text-sm text-stellar-dark truncate" title={wallet.address}>
        {wallet.address}
      </p>
      <p className="mt-3 text-2xl font-semibold text-stellar-dark">
        {wallet.balance} <span className="text-base font-normal text-stellar-muted">{wallet.currency}</span>
      </p>
      <div className="mt-4 space-y-2">
        {wallet.tokensHeld.map((t) => (
          <div key={t.symbol} className="flex justify-between text-sm">
            <span className="text-stellar-muted">{t.symbol}</span>
            <span className="font-medium text-stellar-dark">{t.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WalletCard;
