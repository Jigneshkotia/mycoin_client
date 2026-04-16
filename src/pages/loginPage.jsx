import { useState } from 'react';

function LoginPage() {
  const [privateKey, setPrivateKey] = useState('');
  const [status, setStatus] = useState('');

  const login = async () => {
    const res = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ privateKey }),
    });

    const data = await res.json();

    if (data.status === "error") {
      setStatus(data.message);
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      setStatus("Login successful ✅");
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

      <button className="btn" onClick={login}>Login</button>

      <div className="status">{status}</div>
    </div>
  );
}

export default LoginPage;