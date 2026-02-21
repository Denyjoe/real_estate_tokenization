import { NavLink } from 'react-router-dom';
import { sidebarMenuItems } from '../data/mockData';
import { getIcon } from './Icons';

function Sidebar({ mobileOpen, onClose }) {
  const nav = (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center justify-between border-b border-gray-200 px-6">
        <span className="text-xl font-bold text-stellar-dark">StellarEstate</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden rounded-lg p-2 text-stellar-muted hover:bg-gray-100 hover:text-stellar-dark"
            aria-label="Close menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <nav className="flex-1 space-y-0.5 p-4">
        {sidebarMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-stellar-primary/10 text-stellar-primary'
                  : 'text-stellar-muted hover:bg-gray-100 hover:text-stellar-dark'
              }`
            }
          >
            {getIcon(item.icon, { className: 'h-5 w-5' })}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-56 border-r border-gray-200 bg-white hidden lg:block">
        {nav}
      </aside>
      {/* Mobile overlay + drawer (only when open) */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
            aria-hidden
          />
          <aside className="fixed left-0 top-0 z-50 h-screen w-56 max-w-[85vw] border-r border-gray-200 bg-white shadow-lg lg:hidden">
            {nav}
          </aside>
        </>
      )}
    </>
  );
}

export default Sidebar;
