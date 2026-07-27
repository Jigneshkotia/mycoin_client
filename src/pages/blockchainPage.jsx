import { useEffect, useState } from 'react';
import CopyableText from '../components/CopyableText';
import { IconLayers } from '../components/Icon';
import { formatTimestamp } from '../utils/format';

const BASE_URL = "https://mycoin-server1.onrender.com";

function BlockchainPage() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/blockchain`)
      .then(res => res.json())
      .then(data => {
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
      <div className="page-header">
        <div className="card-header-row" style={{ marginBottom: 0 }}>
          <span className="card-icon"><IconLayers size={20} /></span>
          <h2>Blockchain</h2>
        </div>
        {!loading && (
          <span className="badge">{blocks.length} block{blocks.length === 1 ? '' : 's'}</span>
        )}
      </div>

      {loading ? (
        <div className="skeleton-list">
          <div className="skeleton-block" />
          <div className="skeleton-block" />
          <div className="skeleton-block" />
        </div>
      ) : blocks.length === 0 ? (
        <div className="card state-card">
          <span className="card-icon"><IconLayers size={20} /></span>
          <p>No blocks have been mined yet.</p>
        </div>
      ) : (
        <div className="block-list">
          {blocks.map((block, i) => (
            <div key={i} className="block-card">
              <div className="block-card-header">
                <span className="badge badge-index">Block #{block.index}</span>
                <span className="block-timestamp">{formatTimestamp(block.timestamp)}</span>
              </div>

              <div className="hash-row">
                <span className="hash-label">Hash</span>
                <CopyableText value={block.hash} start={12} end={10} label="block hash" />
              </div>

              <div className="hash-row">
                <span className="hash-label">Previous hash</span>
                <CopyableText value={block.prev_hash} start={12} end={10} label="previous hash" />
              </div>

              <div className="block-meta">
                <span><strong>{block.nonce}</strong> nonce</span>
                <span><strong>{block.transactions?.length || 0}</strong> transactions</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlockchainPage;
