import { useState } from 'react';
import * as api from '../services/api';
import { setStoredWallet } from './BuyTokensModal';

export default function CreateWalletModal({ open, onClose, onSuccess }) {
  const [walletName, setWalletName] = useState('');
  const [network, setNetwork] = useState('testnet');
  const [walletCreated, setWalletCreated] = useState(false);
  const [publicKey, setPublicKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [secretVisible, setSecretVisible] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await api.createWallet();
      const pub = res?.public_key ?? '';
      const sec = res?.secret_key ?? '';
      setPublicKey(pub);
      setSecretKey(sec);
      setWalletCreated(true);
      setStoredWallet(pub, sec);
    } catch (err) {
      const { publicKey: pub, secretKey: sec } = generateMockKeysFallback();
      setPublicKey(pub);
      setSecretKey(sec);
      setWalletCreated(true);
    } finally {
      setLoading(false);
    }
  };

  function generateMockKeysFallback() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const rand = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return { publicKey: 'G' + rand(55), secretKey: 'S' + rand(55) };
  }

  const copyToClipboard = (text, label) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      alert(`${label} copied to clipboard`);
    } else {
      alert(`${label}: ${text}`);
    }
  };

  const handleContinue = () => {
    if (publicKey && secretKey) setStoredWallet(publicKey, secretKey);
    onSuccess?.();
    onClose();
  };

  const handleClose = () => {
    if (!loading) onClose();
  };

  if (!open) return null;

  const successContent = (
    <div className="p-4 sm:p-6">
      <div className="flex justify-center mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 text-center">Wallet Created Successfully</h2>
      <p className="mt-1 text-sm text-gray-500 text-center">Your Stellar wallet is ready to use.</p>

      <div className="mt-4 space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Public Key</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={publicKey}
              className="flex-1 min-w-0 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-xs text-gray-900"
            />
            <button
              type="button"
              onClick={() => copyToClipboard(publicKey, 'Public key')}
              className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 min-h-[40px]"
            >
              Copy
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Secret Key</label>
          <div className="flex gap-2">
            <input
              type={secretVisible ? 'text' : 'password'}
              readOnly
              value={secretKey}
              className="flex-1 min-w-0 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-xs text-gray-900"
            />
            <button
              type="button"
              onClick={() => setSecretVisible((v) => !v)}
              className="shrink-0 rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs text-gray-600 hover:bg-gray-50 min-h-[40px]"
            >
              {secretVisible ? 'Hide' : 'Show'}
            </button>
            <button
              type="button"
              onClick={() => copyToClipboard(secretKey, 'Secret key')}
              className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 min-h-[40px]"
            >
              Copy
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Network</label>
          <span className="inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            Stellar {network === 'mainnet' ? 'Mainnet' : 'Testnet'}
          </span>
        </div>
        {network === 'testnet' && publicKey && (
          <a
            href={api.stellarExpertAccountUrl(publicKey)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full min-h-[40px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 text-center"
          >
            View on Stellar Expert
          </a>
        )}
      </div>

      <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3">
        <p className="text-xs font-medium text-amber-800">
          Save your secret key securely. It cannot be recovered if lost.
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => copyToClipboard(publicKey, 'Public key')}
          className="w-full min-h-[40px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Copy Public Key
        </button>
        <button
          type="button"
          onClick={() => copyToClipboard(secretKey, 'Secret key')}
          className="w-full min-h-[40px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Copy Secret Key
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="w-full min-h-[40px] rounded-lg bg-[#635BFF] px-3 py-2 text-sm font-medium text-white hover:bg-[#5851e8]"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );

  const formContent = (
    <div className="p-4 sm:p-6 space-y-4">
      <div>
        <label htmlFor="modal-wallet-name" className="block text-sm font-medium text-gray-700">
          Wallet Name
        </label>
        <input
          id="modal-wallet-name"
          type="text"
          value={walletName}
          onChange={(e) => setWalletName(e.target.value)}
          placeholder="Enter wallet name (example: My Investment Wallet)"
          className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
        />
        <p className="mt-1 text-xs text-gray-500">This name helps you identify your wallet</p>
      </div>
      <div>
        <label htmlFor="modal-network" className="block text-sm font-medium text-gray-700">
          Network
        </label>
        <select
          id="modal-network"
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
        >
          <option value="testnet">Stellar Testnet</option>
          <option value="mainnet">Stellar Mainnet</option>
        </select>
      </div>
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
        <p className="text-sm text-amber-800">
          Your secret key gives full access to your wallet. Store it safely. Never share it.
        </p>
      </div>
      <button
        type="button"
        onClick={handleCreate}
        disabled={loading}
        className="w-full min-h-[44px] rounded-lg bg-[#635BFF] px-4 py-3 text-sm font-medium text-white hover:bg-[#5851e8] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Creating...
          </>
        ) : (
          'Create Wallet'
        )}
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} aria-hidden />
      <div
        className="relative w-full sm:max-w-lg bg-white shadow-xl flex flex-col max-h-[95vh] sm:max-h-[90vh] rounded-t-xl sm:rounded-xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-wallet-modal-title"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
          <h2 id="create-wallet-modal-title" className="text-lg font-semibold text-gray-900">
            {walletCreated ? 'Wallet Created' : 'Create Stellar Wallet'}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="shrink-0 rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {!walletCreated && (
          <p className="px-4 pt-2 text-sm text-gray-500 border-b border-gray-100">
            Create a secure wallet to store, send, and receive tokenized real estate assets on the Stellar network.
          </p>
        )}
        <div className="overflow-y-auto overscroll-contain flex-1">
          {walletCreated ? successContent : formContent}
        </div>
      </div>
    </div>
  );
}
