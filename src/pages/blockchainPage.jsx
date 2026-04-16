import { useEffect, useState } from 'react';

function BlockchainPage() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/blockchain')
      .then(res => res.json())
      .then(data => setBlocks(data.data || []));
  }, []);

  return (
    <div>
      <h2>⛓️ Blockchain</h2>

      {blocks.map((block, i) => (
        <div key={i} className="block">
          <p><b>Index:</b> {block.index}</p>
          <p><b>Hash:</b> {block.hash}</p>
          <p><b>Prev:</b> {block.prev_hash}</p>
          <p><b>Tx Count:</b> {block.transactions.length}</p>
        </div>
      ))}
    </div>
  );
}

export default BlockchainPage;