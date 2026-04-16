import { useState } from 'react';

const BASE_URL = "https://mycoin-server1.onrender.com";

function LoginPage() {
  const [privateKey, setPrivateKey] = useState('');
  const [status, setStatus] = useState('');

  const login = async () => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ privateKey }),
      });

      const data = await res.json();

      if (data.status == "error") {
        setStatus(data.message);
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        setStatus("Login successful");
      }

    } catch (err) {
      console.error(err);
      setStatus("Server error");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <input
        className="input"
        placeholder="Private Key"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
      />

      <button className="btn" onClick={login}>
        Login
      </button>

      <div className="status">{status}</div>
    </div>
  );
}

export default LoginPage;