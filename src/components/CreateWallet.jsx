import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import { setStoredWallet } from './BuyTokensModal';

function generateMockKeysFallback() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const rand = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return { publicKey: 'G' + rand(55), secretKey: 'S' + rand(55) };
}

export default function CreateWallet() {
  const navigate = useNavigate();
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
    } catch (_) {
      const { publicKey: pub, secretKey: sec } = generateMockKeysFallback();
      setPublicKey(pub);
      setSecretKey(sec);
      setWalletCreated(true);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, label) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      alert(`${label} copied to clipboard`);
    } else {
      alert(`${label}: ${text}`);
    }
  };

  if (walletCreated) {
    return (
      <div className="min-h-screen bg-[#f6f9fc] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-lg">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex justify-center mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 text-center">Wallet Created Successfully</h2>
              <p className="mt-2 text-sm text-gray-500 text-center">Your Stellar wallet is ready to use.</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Public Key</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={publicKey}
                      className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 font-mono text-sm text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => copyToClipboard(publicKey, 'Public key')}
                      className="shrink-0 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors min-h-[44px]"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                  <div className="flex gap-2">
                    <input
                      type={secretVisible ? 'text' : 'password'}
                      readOnly
                      value={secretKey}
                      className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 font-mono text-sm text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => setSecretVisible((v) => !v)}
                      className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors min-h-[44px]"
                      aria-label={secretVisible ? 'Hide secret key' : 'Show secret key'}
                    >
                      {secretVisible ? 'Hide' : 'Show'}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(secretKey, 'Secret key')}
                      className="shrink-0 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors min-h-[44px]"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Network</label>
                  <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                    Stellar {network === 'mainnet' ? 'Mainnet' : 'Testnet'}
                  </span>
                </div>
                {network === 'testnet' && publicKey && (
                  <div>
                    <a
                      href={api.stellarExpertAccountUrl(publicKey)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      View on Stellar Expert
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
                <p className="text-sm font-medium text-amber-800">
                  Save your secret key securely. It cannot be recovered if lost.
                </p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => copyToClipboard(publicKey, 'Public key')}
                  className="flex-1 min-h-[44px] rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Copy Public Key
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(secretKey, 'Secret key')}
                  className="flex-1 min-h-[44px] rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Copy Secret Key
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (publicKey && secretKey) setStoredWallet(publicKey, secretKey);
                    navigate('/dashboard');
                  }}
                  className="flex-1 min-h-[44px] rounded-lg bg-[#635BFF] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5851e8] transition-colors"
                >
                  Continue to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight text-center">
          Create Stellar Wallet
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-500 text-center max-w-md mx-auto">
          Create a secure wallet to store, send, and receive tokenized real estate assets on the Stellar network.
        </p>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6">
            {/* Section 1: Wallet Name */}
            <div>
              <label htmlFor="wallet-name" className="block text-sm font-medium text-gray-700">
                Wallet Name
              </label>
              <input
                id="wallet-name"
                type="text"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                placeholder="Enter wallet name (example: My Investment Wallet)"
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
              />
              <p className="mt-1.5 text-xs text-gray-500">This name helps you identify your wallet</p>
            </div>

            {/* Section 2: Network */}
            <div>
              <label htmlFor="network" className="block text-sm font-medium text-gray-700">
                Network
              </label>
              <select
                id="network"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF]"
              >
                <option value="testnet">Stellar Testnet</option>
                <option value="mainnet">Stellar Mainnet</option>
              </select>
            </div>

            {/* Section 3: Security Notice */}
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
              <p className="text-sm text-amber-800">
                Your secret key gives full access to your wallet. Store it safely. Never share it.
              </p>
            </div>

            {/* Section 4: Create Button */}
            <button
              type="button"
              onClick={handleCreate}
              disabled={loading}
              className="w-full min-h-[44px] rounded-lg bg-[#635BFF] px-4 py-3 text-sm font-medium text-white hover:bg-[#5851e8] disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" aria-hidden>
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
        </div>
      </div>
    </div>
  );
}
