import { useState, useEffect } from 'react';

function WalletPage() {
  const [user, setUser] = useState(null);
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [isMining, setIsMining] = useState(false);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
  }, []);

  const sendTx = async () => {
    const res = await fetch('http://localhost:8080/add_tx', {
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
  };

  const mine = async () => {
    setIsMining(true);
    const res = await fetch('http://localhost:8080/mine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ privateKey: user.privateKey }),
    });

    const data = await res.json();
    setStatus(data.message);
    setIsMining(false);
  };

  if (!user) return <p>Please login first</p>;

  return (
    <div>
      <div className="card">
        <h2>Wallet</h2>
        <p><b>Public:</b> {user.publicKey}</p>
        <p><b>Confirmed:</b> {user.confirmed_coins}</p>
        <p><b>Pending:</b> {user.pending_coins}</p>
      </div>

      <div className="card">
        <h3>Send Transaction</h3>

        <input className="input" placeholder="Receiver"
          value={receiver} onChange={e => setReceiver(e.target.value)} />

        <input className="input" placeholder="Amount"
          value={amount} onChange={e => setAmount(e.target.value)} />

        <button className="btn" onClick={sendTx}>Send</button>
      </div>

      {user.isFullNode && (
        <div className="card">
          <h3>Mining</h3>
          <button className="btn" onClick={mine} disabled={isMining}>
            {isMining ? "Mining..." : "Mine Block ⛏️"}
          </button>
        </div>
      )}

      <div className="status">{status}</div>
    </div>
  );
}

export default WalletPage;