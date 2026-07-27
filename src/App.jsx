import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import WalletPage from './pages/walletPage';
import BlockchainPage from './pages/blockchainPage';
import { IconLink } from './components/Icon';

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/login', label: 'Login' },
  { to: '/signup', label: 'Signup' },
  { to: '/wallet', label: 'Wallet' },
  { to: '/blockchain', label: 'Blockchain' },
];

function App() {
  return (
    <Router>
      <div className="app-shell">
        <header className="navbar">
          <NavLink to="/" className="brand" end>
            <span className="brand-mark">
              <IconLink size={18} />
            </span>
            <span>MyCoin</span>
          </NavLink>

          <nav className="nav-links">
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
    </Router>
  );
}

export default App;
