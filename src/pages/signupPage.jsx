import { useState } from 'react';

function SignupPage() {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [isFullNode, setIsFullNode] = useState(false);
  const [status, setStatus] = useState('');

  const signup = async () => {
    const res = await fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ privateKey, publicKey, isFullNode }),
    });

    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <div className="card">
      <h2>Signup</h2>

      <input className="input" placeholder="Private Key"
        value={privateKey} onChange={e => setPrivateKey(e.target.value)} />

      <input className="input" placeholder="Public Key"
        value={publicKey} onChange={e => setPublicKey(e.target.value)} />

      <label>
        <input type="checkbox"
          checked={isFullNode}
          onChange={e => setIsFullNode(e.target.checked)} />
        Run as Full Node
      </label>

      <br /><br />

      <button className="btn" onClick={signup}>Signup</button>

      <div className="status">{status}</div>
    </div>
  );
}

export default SignupPage;