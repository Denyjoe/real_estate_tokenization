import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import WalletOverviewCard from '../components/WalletOverviewCard';
import WalletTokenBalancesTable from '../components/WalletTokenBalancesTable';
import TransferTokensCard from '../components/TransferTokensCard';
import WalletTransactionHistoryTable from '../components/WalletTransactionHistoryTable';
import { getStoredWallet } from '../components/BuyTokensModal';
import * as api from '../services/api';

function formatXlmBalance(balances) {
  const native = (balances || []).find((b) => b.asset_type === 'native' || b.asset_code === 'XLM');
  if (!native) return '0';
  const n = parseFloat(native.balance, 10);
  return Number.isFinite(n) ? n.toFixed(4) : native.balance;
}

function buildOverview(address, balanceData) {
  const balances = balanceData?.balances ?? [];
  const xlm = formatXlmBalance(balances);
  const custom = balances.filter((b) => b.asset_type !== 'native' && b.asset_code !== 'XLM');
  let totalTokensOwned = 0;
  custom.forEach((b) => {
    const n = parseFloat(b.balance, 10);
    if (Number.isFinite(n)) totalTokensOwned += n;
  });
  return {
    address,
    addressShort: address ? `${address.slice(0, 8)}...${address.slice(-6)}` : '',
    network: 'Stellar Testnet',
    connected: true,
    xlmBalance: xlm,
    totalTokensOwned: totalTokensOwned ? totalTokensOwned.toFixed(2) : '0',
  };
}

function buildTokenBalances(balances) {
  return (balances || [])
    .filter((b) => b.asset_type !== 'native' && b.asset_code !== 'XLM')
    .map((b) => ({
      token: b.asset_code || '—',
      property: b.asset_issuer ? `${b.asset_issuer.slice(0, 8)}...` : '—',
      balance: parseFloat(b.balance, 10) || 0,
      totalTokens: 0,
      value: '—',
    }));
}

function buildTransactions(records) {
  return (records || []).map((tx, i) => ({
    id: tx.id || tx.hash || `tx-${i}`,
    date: tx.created_at ? new Date(tx.created_at).toLocaleDateString() : '—',
    type: 'Payment',
    token: '—',
    amount: '—',
    status: tx.successful ? 'Completed' : 'Failed',
    txHash: tx.hash || '',
  }));
}

function WalletPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [overview, setOverview] = useState(null);
  const [tokenBalances, setTokenBalances] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balanceError, setBalanceError] = useState(null);
  const [fundLoading, setFundLoading] = useState(false);

  const publicKey = wallet?.publicKey ?? null;

  useEffect(() => {
    setWallet(getStoredWallet());
  }, []);

  useEffect(() => {
    if (!publicKey) {
      setOverview(null);
      setTokenBalances([]);
      setTransactions([]);
      setBalanceError(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setBalanceError(null);
    Promise.all([
      api.getBalance(publicKey).catch((e) => e),
      api.getWalletTransactions(publicKey).catch((e) => e),
    ]).then(([balanceRes, txRes]) => {
      if (cancelled) return;
      if (balanceRes && !(balanceRes instanceof Error)) {
        setOverview(buildOverview(publicKey, balanceRes));
        setTokenBalances(buildTokenBalances(balanceRes.balances));
        setBalanceError(null);
      } else {
        setBalanceError(balanceRes instanceof Error ? balanceRes.message : 'Account not found');
        setOverview({ ...buildOverview(publicKey, null), xlmBalance: '—', totalTokensOwned: '—' });
        setTokenBalances([]);
      }
      if (txRes && !(txRes instanceof Error) && Array.isArray(txRes)) {
        setTransactions(buildTransactions(txRes));
      } else {
        setTransactions([]);
      }
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [publicKey]);

  const handleCopyAddress = (address) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(address);
      alert('Address copied to clipboard');
    } else {
      alert(`Address: ${address}`);
    }
  };

  const handleFundTestnet = async () => {
    if (!publicKey) return;
    setFundLoading(true);
    try {
      await api.fundTestnetAccount(publicKey);
      const balanceRes = await api.getBalance(publicKey);
      setOverview(buildOverview(publicKey, balanceRes));
      setTokenBalances(buildTokenBalances(balanceRes.balances));
      setBalanceError(null);
    } catch (e) {
      alert(e?.message || 'Funding failed');
    } finally {
      setFundLoading(false);
    }
  };

  const handleTransfer = (data) => {
    alert(`Transfer ${data.amount} ${data.token} to ${data.recipient} – coming soon`);
  };

  const stellarExpertUrl = publicKey ? api.stellarExpertAccountUrl(publicKey) : '';
  const showFundButton = balanceError || (overview && (overview.xlmBalance === '—' || overview.xlmBalance === '0'));

  if (!publicKey) {
    return (
      <div className="min-h-screen bg-stellar-surface">
        <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:pl-56">
          <Navbar onMenuClick={() => setSidebarOpen((o) => !o)} />
          <main className="p-4 sm:p-6">
            <h1 className="text-xl font-semibold text-stellar-dark mb-6">Wallet</h1>
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
              <p className="text-stellar-muted mb-4">No wallet connected. Create one to see your balance and link it with Stellar Expert.</p>
              <Link
                to="/create-wallet"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-stellar-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5851e8]"
              >
                Create wallet
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const overviewData = overview || {
    address: publicKey,
    addressShort: `${publicKey.slice(0, 8)}...${publicKey.slice(-6)}`,
    network: 'Stellar Testnet',
    connected: true,
    xlmBalance: '—',
    totalTokensOwned: '—',
  };

  return (
    <div className="min-h-screen bg-stellar-surface">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-56">
        <Navbar onMenuClick={() => setSidebarOpen((o) => !o)} />
        <main className="p-4 sm:p-6">
          <h1 className="text-xl font-semibold text-stellar-dark mb-6">Wallet</h1>

          {balanceError && (
            <div className="mb-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
              Account not on network yet. Click &quot;Fund with Testnet XLM&quot; to create it on Stellar Testnet (then it will appear on Stellar Expert).
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <WalletOverviewCard
                overview={overviewData}
                onCopyAddress={handleCopyAddress}
                stellarExpertUrl={stellarExpertUrl}
                onFundTestnet={showFundButton ? handleFundTestnet : undefined}
                fundLoading={fundLoading}
              />
            </div>
            <div>
              <TransferTokensCard
                tokenOptions={tokenBalances.map((b) => ({ token: b.token }))}
                onSubmit={handleTransfer}
              />
            </div>
          </div>

          <section className="mb-8">
            <WalletTokenBalancesTable balances={tokenBalances} loading={loading} emptyMessage={loading ? 'Loading…' : 'No token balances'} />
          </section>

          <section>
            <WalletTransactionHistoryTable
              transactions={transactions}
              loading={loading}
              stellarExpertTxUrl={api.stellarExpertTxUrl}
              emptyMessage={loading ? 'Loading…' : 'No transactions yet'}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default WalletPage;
