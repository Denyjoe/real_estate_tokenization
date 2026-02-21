import { useState } from 'react';

function TransferTokensCard({ tokenOptions, onSubmit }) {
  const [recipient, setRecipient] = useState('');
  const [token, setToken] = useState(tokenOptions?.[0]?.token ?? '');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ recipient, token, amount });
    else alert(`Transfer ${amount} ${token} to ${recipient} – coming soon`);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow">
      <h3 className="text-sm font-medium text-stellar-dark mb-4">Transfer tokens</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="wallet-recipient" className="block text-sm font-medium text-stellar-muted mb-1.5">
            Recipient address
          </label>
          <input
            id="wallet-recipient"
            type="text"
            placeholder="G..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-stellar-dark placeholder:text-stellar-muted focus:border-stellar-primary focus:ring-1 focus:ring-stellar-primary"
          />
        </div>
        <div>
          <label htmlFor="wallet-token" className="block text-sm font-medium text-stellar-muted mb-1.5">
            Token
          </label>
          <select
            id="wallet-token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-stellar-dark focus:border-stellar-primary focus:ring-1 focus:ring-stellar-primary"
          >
            {tokenOptions?.map((opt) => (
              <option key={opt.token} value={opt.token}>{opt.token}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="wallet-amount" className="block text-sm font-medium text-stellar-muted mb-1.5">
            Amount
          </label>
          <input
            id="wallet-amount"
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-stellar-dark placeholder:text-stellar-muted focus:border-stellar-primary focus:ring-1 focus:ring-stellar-primary"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-stellar-primary py-3 text-sm font-medium text-white hover:bg-[#5851e8] transition-colors hover:shadow-card-hover"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default TransferTokensCard;
