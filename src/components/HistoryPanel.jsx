import { useState } from 'react';

const HistoryIcon = ({ type }) => {
  const icons = {
    url: <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />,
    vcard: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 11h-6" />
        <path d="M19 8v6" />
      </>
    ),
    wifi: (
      <>
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </>
    ),
    text: (
      <>
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
    email: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 5L2 7" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[type] || icons.text}
    </svg>
  );
};

function formatTime(ts, t) {
  const d = new Date(ts);
  const now = Date.now();
  const diff = now - ts;
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  if (sec < 60) return t('history.justNow');
  if (min < 60) return `${min}${t('history.minAgo')}`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}${t('history.hourAgo')}`;
  const days = Math.floor(hr / 24);
  if (days < 7) return `${days}${t('history.dayAgo')}`;
  return d.toLocaleDateString();
}

const ChevronIcon = () => (
  <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const RestoreIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
);

export default function HistoryPanel({ history, onRestore, onDelete, onClear, t }) {
  const [open, setOpen] = useState(false);
  const count = history.length;

  return (
    <div className="card">
      <button
        className="collapsible-trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="trigger-left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
            <path d="M3 3v5h5" />
            <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
            <path d="M12 7v5l4 2" />
          </svg>
          {t('history.title')}
          {count > 0 && (
            <span style={{
              background: 'var(--accent-soft)',
              color: 'var(--accent)',
              fontSize: '11px',
              padding: '1px 8px',
              borderRadius: '100px',
              fontWeight: '600',
            }}>
              {count}
            </span>
          )}
        </span>
        <ChevronIcon />
      </button>
      <div className={`collapsible-content ${open ? 'open' : ''}`}>
        {count === 0 ? (
          <div className="history-empty">{t('history.empty')}</div>
        ) : (
          <>
            <div className="history-list">
              {history.map((rec) => (
                <div className="history-item" key={rec.id}>
                  <div className="icon">
                    <HistoryIcon type={rec.type} />
                  </div>
                  <div className="info">
                    <div className="label">{rec.label}</div>
                    <div className="meta">{t(`types.${rec.type}`)} · {formatTime(rec.timestamp, t)}</div>
                  </div>
                  <div className="actions">
                    <button title={t('history.restoreTitle')} onClick={() => onRestore(rec)}>
                      <RestoreIcon />
                    </button>
                    <button className="danger" title={t('history.deleteTitle')} onClick={() => onDelete(rec.id)}>
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="history-clear" onClick={onClear}>{t('history.clear')}</button>
          </>
        )}
      </div>
    </div>
  );
}
