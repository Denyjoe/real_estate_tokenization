import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateWallet from './components/CreateWallet';
import Dashboard from './pages/Dashboard';
import PropertiesPage from './pages/PropertiesPage';
import WalletPage from './pages/WalletPage';
import TransactionsPage from './pages/TransactionsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create-wallet" element={<CreateWallet />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/properties" element={<PropertiesPage />} />
      <Route path="/dashboard/wallet" element={<WalletPage />} />
      <Route path="/dashboard/transactions" element={<TransactionsPage />} />
    </Routes>
  );
}

export default App;
