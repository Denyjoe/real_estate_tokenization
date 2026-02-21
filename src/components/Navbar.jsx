function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-gray-200 bg-white px-4 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden rounded-lg p-2 text-stellar-muted hover:bg-gray-100 hover:text-stellar-dark"
        aria-label="Open menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="flex flex-1 items-center justify-end gap-3">
        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
          Stellar Testnet
        </span>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-stellar-success" aria-hidden />
          <span className="text-sm font-medium text-stellar-dark">Wallet connected</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
