import { Link } from 'react-router-dom';
import { IconWallet, IconSend, IconZap, IconLayers, IconArrowRight } from '../components/Icon';

const FEATURES = [
  {
    icon: IconWallet,
    title: 'Wallet',
    description: 'Sign in with your keys and track confirmed and pending balances.',
    to: '/wallet',
  },
  {
    icon: IconSend,
    title: 'Transactions',
    description: 'Send coins to any public key and watch pending transfers settle.',
    to: '/wallet',
  },
  {
    icon: IconZap,
    title: 'Mining',
    description: 'Run a full node and mine blocks to confirm pending transactions.',
    to: '/wallet',
  },
  {
    icon: IconLayers,
    title: 'Ledger',
    description: 'Inspect every block, hash, and transaction on the shared chain.',
    to: '/blockchain',
  },
];

function HomePage() {
  return (
    <div>
      <section className="card hero">
        <span className="eyebrow">Blockchain Simulator</span>
        <h1>MyCoin</h1>
        <p className="hero-subtitle">
          A lightweight blockchain and wallet simulator for experimenting with keys,
          transactions, and proof-of-work mining in real time.
        </p>
        <div className="hero-actions">
          <Link to="/signup" className="btn btn-primary">
            Create a wallet
            <IconArrowRight size={16} />
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Log in
          </Link>
        </div>
      </section>

      <div className="feature-grid">
        {FEATURES.map((feature) => {
          const FeatureIcon = feature.icon;
          return (
            <Link key={feature.title} to={feature.to} className="feature-card">
              <span className="feature-icon">
                <FeatureIcon size={20} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
