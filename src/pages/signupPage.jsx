import { useState } from 'react';
import Alert from '../components/Alert';
import { IconKey, IconEye, IconEyeOff, IconArrowRight, IconLoader } from '../components/Icon';

const BASE_URL = "https://mycoin-server1.onrender.com";

function SignupPage() {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isFullNode, setIsFullNode] = useState(false);
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('info');
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ privateKey, publicKey, isFullNode }),
      });

      const data = await res.json();

      if (data.status === "error") {
        setStatus(data.message);
        setStatusType('error');
      } else {
        setStatus("Signup successful");
        setStatusType('success');

        // optional: auto login after signup
        localStorage.setItem("user", JSON.stringify(data.user));
      }

    } catch (err) {
      console.error(err);
      setStatus("Server error");
      setStatusType('error');
    }
    setLoading(false);
  };

  return (
    <div className="auth-layout">
      <div className="card auth-card">
        <span className="card-icon"><IconKey size={20} /></span>
        <h2>Create a wallet</h2>
        <p className="card-subtitle">Register a key pair to start transacting on the network.</p>

        <div className="field">
          <label className="label" htmlFor="signup-private-key">Private key</label>
          <div className="input-with-action">
            <input
              id="signup-private-key"
              className="input"
              type={showKey ? 'text' : 'password'}
              placeholder="Enter a private key"
              value={privateKey}
              onChange={e => setPrivateKey(e.target.value)}
              autoComplete="off"
            />
            <button
              type="button"
              className="input-action"
              onClick={() => setShowKey((v) => !v)}
              aria-label={showKey ? 'Hide private key' : 'Show private key'}
            >
              {showKey ? <IconEyeOff size={16} /> : <IconEye size={16} />}
            </button>
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="signup-public-key">Public key</label>
          <input
            id="signup-public-key"
            className="input"
            placeholder="Enter your public key"
            value={publicKey}
            onChange={e => setPublicKey(e.target.value)}
            autoComplete="off"
          />
        </div>

        <label className="switch-field">
          <span className="switch">
            <input
              type="checkbox"
              checked={isFullNode}
              onChange={e => setIsFullNode(e.target.checked)}
            />
            <span className="slider" />
          </span>
          <span className="switch-text">
            <strong>Run as full node</strong>
            <span>Full nodes can mine new blocks and confirm pending transactions.</span>
          </span>
        </label>

        <button className="btn btn-primary btn-block" onClick={signup} disabled={loading}>
          {loading ? <IconLoader size={16} className="spin" /> : null}
          {loading ? 'Creating account...' : 'Create account'}
          {!loading && <IconArrowRight size={16} />}
        </button>

        <Alert type={statusType}>{status}</Alert>
      </div>
    </div>
  );
}

export default SignupPage;
