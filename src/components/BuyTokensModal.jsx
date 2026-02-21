import { useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../services/api";

const WALLET_PUBLIC_KEY = "stellar_public_key";
const WALLET_SECRET_KEY = "stellar_secret_key";

export function getStoredWallet() {
  try {
    const publicKey = localStorage.getItem(WALLET_PUBLIC_KEY);
    const secretKey = localStorage.getItem(WALLET_SECRET_KEY);
    return publicKey && secretKey ? { publicKey, secretKey } : null;
  } catch (_) {
    return null;
  }
}

export function setStoredWallet(publicKey, secretKey) {
  try {
    if (publicKey) localStorage.setItem(WALLET_PUBLIC_KEY, publicKey);
    if (secretKey) localStorage.setItem(WALLET_SECRET_KEY, secretKey);
  } catch (_) {}
}

export default function BuyTokensModal({ property, onClose, onSuccess }) {
  const [amount, setAmount] = useState("10");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState("");
  const wallet = getStoredWallet();

  const assetCode = property?.tokenName || property?.asset_code || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wallet || !assetCode) return;
    const num = parseFloat(amount, 10);
    if (!Number.isFinite(num) || num <= 0) {
      setError("Enter a valid amount (e.g. 10)");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { issuer_public_key } = await api.getIssuer();
      await api.createTrustline(wallet.secretKey, assetCode, issuer_public_key);
    } catch (err) {
      const msg = err?.message || String(err);
      if (!msg.includes("trustline") && !msg.includes("already")) {
        setError(msg);
        setLoading(false);
        return;
      }
      // Trustline already exists or other non-fatal
    }
    try {
      const result = await api.issueToken(assetCode, wallet.publicKey, num);
      setTxHash(result?.transaction_hash || "");
      onSuccess?.();
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  if (!property) return null;

  const success = !!txHash;
  const expertUrl = api.stellarExpertTxUrl(txHash);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <div
        className="relative w-full sm:max-w-md bg-white shadow-xl rounded-t-xl sm:rounded-xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="buy-tokens-title"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
          <h2 id="buy-tokens-title" className="text-lg font-semibold text-gray-900">
            {success ? "Purchase complete" : `Buy ${property.tokenName || property.name} tokens`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {success ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">
                You received <strong>{amount}</strong> {assetCode} tokens. Transaction submitted on Stellar Testnet.
              </p>
              {expertUrl && (
                <a
                  href={expertUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full min-h-[44px] rounded-lg bg-[#635BFF] text-white font-medium text-sm flex items-center justify-center hover:bg-[#5851e8]"
                >
                  View on Stellar Expert
                </a>
              )}
            </div>
          ) : !wallet ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Create or connect a wallet first so we can send tokens to your account.
              </p>
              <Link
                to="/create-wallet"
                className="block w-full min-h-[44px] rounded-lg bg-[#635BFF] text-white font-medium text-sm flex items-center justify-center hover:bg-[#5851e8]"
              >
                Create wallet
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="block w-full min-h-[44px] rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-gray-600">
                Token: <span className="font-mono font-medium">{assetCode}</span>
              </p>
              <div>
                <label htmlFor="buy-amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  id="buy-amount"
                  type="number"
                  min="0.0000001"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
                />
              </div>
              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 min-h-[44px] rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 min-h-[44px] rounded-lg bg-[#635BFF] text-white text-sm font-medium hover:bg-[#5851e8] disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    "Buy tokens"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
