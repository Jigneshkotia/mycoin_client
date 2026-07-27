// Shortens a long key/hash for display while keeping both ends visible.
export function truncateMiddle(value, start = 10, end = 8) {
  if (!value) return '';
  const str = String(value);
  if (str.length <= start + end + 3) return str;
  return `${str.slice(0, start)}...${str.slice(-end)}`;
}

// Accepts either a seconds or milliseconds epoch timestamp.
export function formatTimestamp(ts) {
  if (!ts) return '—';
  const ms = String(ts).length <= 10 ? Number(ts) * 1000 : Number(ts);
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) return String(ts);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

// Best-effort classification of an API response for alert styling.
// Falls back to `fallback` when the backend doesn't send an explicit status.
export function classifyStatus(data, fallback = 'success') {
  if (!data) return 'error';
  if (data.status === 'error') return 'error';
  if (data.status === 'success') return 'success';
  return fallback;
}
