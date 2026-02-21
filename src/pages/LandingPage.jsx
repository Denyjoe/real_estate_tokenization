import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen bg-stellar-surface flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-stellar-dark tracking-tight">
          StellarEstate
        </h1>
        <p className="mt-6 text-2xl sm:text-3xl font-semibold text-stellar-dark">
          Tokenize Real Estate on Stellar
        </p>
        <p className="mt-4 text-base sm:text-lg text-stellar-muted max-w-md mx-auto">
          Own fractional shares of real estate powered by blockchain
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/create-wallet"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium text-white bg-stellar-primary hover:bg-[#5851e8] transition-colors shadow-card hover:shadow-card-hover"
          >
            Create Wallet
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium text-stellar-primary bg-white border border-gray-200 hover:border-stellar-primary hover:bg-gray-50 transition-colors shadow-card"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
