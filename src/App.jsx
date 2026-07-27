import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';

import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import WalletPage from './pages/walletPage';
import BlockchainPage from './pages/blockchainPage';
import { IconLink, IconMenu, IconX } from './components/Icon';

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/login', label: 'Login' },
  { to: '/signup', label: 'Signup' },
  { to: '/wallet', label: 'Wallet' },
  { to: '/blockchain', label: 'Blockchain' },
];

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <NavLink to="/" className="brand" end>
        <span className="brand-mark">
          <IconLink size={18} />
        </span>
        <span>MyCoin</span>
      </NavLink>

      <button
        type="button"
        className="nav-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <IconX size={20} /> : <IconMenu size={20} />}
      </button>

      <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

function AppShell() {
  // Remounting NavBar on every route change resets its menuOpen state,
  // so the mobile dropdown closes automatically after navigating.
  const location = useLocation();

  return (
    <div className="app-shell">
      <NavBar key={location.pathname} />

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/blockchain" element={<BlockchainPage />} />
        </Routes>
      </main>

      <footer className="footer">
        MyCoin — blockchain simulator
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
