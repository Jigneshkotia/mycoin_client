import { useEffect, useState } from 'react';

const BASE_URL = "https://mycoin-server1.onrender.com";

function BlockchainPage() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/blockchain`)
      .then(res => res.json())
      .then(data => {
        console.log("Blockchain API:", data);
        setBlocks(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>⛓️ Blockchain</h2>

      {loading ? (
        <p>Loading blockchain...</p>
      ) : blocks.length === 0 ? (
        <p>No blocks yet</p>
      ) : (
        blocks.map((block, i) => (
          <div key={i} className="block">
            <p><b>Index:</b> {block.index}</p>
            <p><b>Hash:</b> {block.hash}</p>
            <p><b>Prev Hash:</b> {block.prev_hash}</p>
            <p><b>Nonce:</b> {block.nonce}</p>
            <p><b>Timestamp:</b> {block.timestamp}</p>
            <p><b>Transactions:</b> {block.transactions?.length || 0}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default BlockchainPage;