import { useState } from 'react';
import { IconCopy, IconCheck } from './Icon';
import { truncateMiddle } from '../utils/format';

function CopyableText({ value, start = 10, end = 8, label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  if (!value) {
    return <span className="hash-empty">{'—'}</span>;
  }

  return (
    <button
      type="button"
      className="copyable"
      onClick={handleCopy}
      title={label ? `Copy ${label}` : 'Copy to clipboard'}
    >
      <span className="copyable-value">{truncateMiddle(value, start, end)}</span>
      {copied ? (
        <IconCheck size={14} className="copyable-icon copyable-icon-success" />
      ) : (
        <IconCopy size={14} className="copyable-icon" />
      )}
    </button>
  );
}

export default CopyableText;
