import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import CopyableText from '../components/CopyableText';
import { IconWallet, IconSend, IconZap, IconLock, IconLoader } from '../components/Icon';

const BASE_URL = "https://mycoin-server1.onrender.com";

function WalletPage() {
  const [user, setUser] = useState(null);
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('info');
  const [isMining, setIsMining] = useState(false);
  const [isSending, setIsSending] = useState(false);
  // Only wait on the network round-trip when there's a stored key to verify.
  const [loading, setLoading] = useState(() => !!localStorage.getItem("user"));

    // Load user from localStorage + sync with backend
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        return;
      }

      fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          privateKey: storedUser.privateKey
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.status !== "error") {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
          } else {
            setUser(null);
          }
        })
        .catch(err => {
          console.error(err);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });

    }, []);

  // Fetch latest user data using privateKey
  const refreshUserWithKey = async (privateKey) => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ privateKey }),
      });

      const data = await res.json();

      // adjust this based on your backend response
      if (!data.status) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      }

    } catch (err) {
      console.error("Refresh user error:", err);
    }
  };

  // Send transaction
  const sendTx = async () => {
    if (!user) return;

    if (!receiver || !amount) {
      setStatus("Enter receiver and amount");
      setStatusType('error');
      return;
    }

    setIsSending(true);
    try {
      const res = await fetch(`${BASE_URL}/add_tx`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: user.privateKey,
          receiver,
          amount: parseFloat(amount)
        }),
      });

      const data = await res.json();
      setStatus(data.message);
      setStatusType(data.status === 'error' ? 'error' : 'success');

      await refreshUserWithKey(user.privateKey);

    } catch (err) {
      console.error(err);
      setStatus("Transaction failed");
      setStatusType('error');
    }
    setIsSending(false);
  };

  // Mine block
  const mine = async () => {
    if (!user) return;

    setIsMining(true);
    setStatus("Mining...");
    setStatusType('info');

    try {
      const res = await fetch(`${BASE_URL}/mine`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ privateKey: user.privateKey }),
      });

      const data = await res.json();
      setStatus(data.message);
      setStatusType(data.status === 'error' ? 'error' : 'success');

      await refreshUserWithKey(user.privateKey);

    } catch (err) {
      console.error(err);
      setStatus("Mining failed");
      setStatusType('error');
    }

    setIsMining(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="card state-card">
        <IconLoader size={22} className="spin" />
        <p>Loading wallet...</p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="card state-card">
        <span className="card-icon"><IconLock size={20} /></span>
        <h2>Sign in required</h2>
        <p>Log in with your private key to view your wallet.</p>
        <Link to="/login" className="btn btn-primary">Go to login</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <div className="card-header-row">
          <span className="card-icon"><IconWallet size={20} /></span>
          <h2>Wallet</h2>
        </div>

        <div className="key-row">
          <span className="key-label">Public key</span>
          <CopyableText value={user.publicKey} label="public key" />
        </div>

        <div className="stat-grid">
          <div className="stat-card">
            <span className="stat-label">Confirmed</span>
            <span className="stat-value">{user.confirmed_coins}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Pending</span>
            <span className="stat-value stat-value-muted">{user.pending_coins}</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header-row">
          <span className="card-icon"><IconSend size={20} /></span>
          <h3>Send transaction</h3>
        </div>

        <div className="field">
          <label className="label" htmlFor="receiver">Receiver public key</label>
          <input
            id="receiver"
            className="input"
            placeholder="Receiver public key"
            value={receiver}
            onChange={e => setReceiver(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="label" htmlFor="amount">Amount</label>
          <input
            id="amount"
            className="input"
            placeholder="0.00"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={sendTx} disabled={isSending}>
          {isSending ? <IconLoader size={16} className="spin" /> : null}
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>

      {user.isFullNode && (
        <div className="card">
          <div className="card-header-row">
            <span className="card-icon"><IconZap size={20} /></span>
            <h3>Mining</h3>
          </div>
          <p className="card-subtitle">Mine a block to confirm pending transactions and earn rewards.</p>
          <button className="btn btn-secondary" onClick={mine} disabled={isMining}>
            {isMining ? <IconLoader size={16} className="spin" /> : null}
            {isMining ? 'Mining...' : 'Mine block'}
          </button>
        </div>
      )}

      <Alert type={statusType}>{status}</Alert>
    </div>
  );
}

export default WalletPage;
