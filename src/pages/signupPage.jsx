import { useState } from 'react';

const BASE_URL = "https://mycoin-server1.onrender.com";

function SignupPage() {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [isFullNode, setIsFullNode] = useState(false);
  const [status, setStatus] = useState('');

  const signup = async () => {
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ privateKey, publicKey, isFullNode }),
      });

      const data = await res.json();

      if (data.status === "error") {
        setStatus(data.message);
      } else {
        setStatus("Signup successful ✅");

        // optional: auto login after signup
        localStorage.setItem("user", JSON.stringify(data.user));
      }

    } catch (err) {
      console.error(err);
      setStatus("Server error ");
    }
  };

  return (
    <div className="card">
      <h2>Signup</h2>

      <input
        className="input"
        placeholder="Private Key"
        value={privateKey}
        onChange={e => setPrivateKey(e.target.value)}
      />

      <input
        className="input"
        placeholder="Public Key"
        value={publicKey}
        onChange={e => setPublicKey(e.target.value)}
      />

      <label style={{ marginTop: '10px', display: 'block' }}>
        <input
          type="checkbox"
          checked={isFullNode}
          onChange={e => setIsFullNode(e.target.checked)}
        />
        Run as Full Node
      </label>

      <br />

      <button className="btn" onClick={signup}>
        Signup
      </button>

      <div className="status">{status}</div>
    </div>
  );
}

export default SignupPage;