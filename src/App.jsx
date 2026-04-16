import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import WalletPage from './pages/walletPage';
import BlockchainPage from './pages/blockchainPage';

function App() {
  return (
    <Router>
      <div className="navbar">
        <h2>⛓️ ChainSim</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/wallet">Wallet</Link>
          <Link to="/blockchain">Blockchain</Link>
        </div>
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/blockchain" element={<BlockchainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;