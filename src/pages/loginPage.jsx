import { useState } from 'react';
import Alert from '../components/Alert';
import { IconLock, IconArrowRight, IconEye, IconEyeOff, IconLoader } from '../components/Icon';

const BASE_URL = "https://mycoin-server1.onrender.com";

function LoginPage() {
  const [privateKey, setPrivateKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('info');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!privateKey) {
      setStatus('Enter your private key');
      setStatusType('error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ privateKey }),
      });

      const data = await res.json();

      if (data.status == "error") {
        setStatus(data.message);
        setStatusType('error');
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        setStatus("Login successful");
        setStatusType('success');
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
        <span className="card-icon"><IconLock size={20} /></span>
        <h2>Log in</h2>
        <p className="card-subtitle">Enter your private key to access your wallet.</p>

        <div className="field">
          <label className="label" htmlFor="login-private-key">Private key</label>
          <div className="input-with-action">
            <input
              id="login-private-key"
              className="input"
              type={showKey ? 'text' : 'password'}
              placeholder="Enter your private key"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && login()}
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

        <button className="btn btn-primary btn-block" onClick={login} disabled={loading}>
          {loading ? <IconLoader size={16} className="spin" /> : null}
          {loading ? 'Logging in...' : 'Log in'}
          {!loading && <IconArrowRight size={16} />}
        </button>

        <Alert type={statusType}>{status}</Alert>
      </div>
    </div>
  );
}

export default LoginPage;
