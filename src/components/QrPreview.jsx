import { useEffect, useState } from 'react';
import { renderToCanvas, renderToSvgString } from '../lib/qr.js';

const EmptyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3z" />
    <path d="M20 14v3" />
    <path d="M14 20h7" />
    <path d="M20 20v1" />
  </svg>
);

export default function QrPreview({ data, style, canvasRef, onSvgReady, t }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!data) {
      onSvgReady?.(null);
      setError(null);
      if (canvasRef?.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      return;
    }
    Promise.all([
      renderToCanvas(canvasRef?.current, data, style),
      renderToSvgString(data, style),
    ])
      .then(([ok, svg]) => {
        if (cancelled) return;
        if (ok) {
          onSvgReady?.(svg);
          setError(null);
        } else {
          onSvgReady?.(null);
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e?.message || t('preview.renderError'));
        onSvgReady?.(null);
      });
    return () => {
      cancelled = true;
    };
  }, [data, style, canvasRef, onSvgReady, t]);

  return (
    <div className="card">
      <div className="card-title">{t('preview.title')}</div>
      <div className="qr-preview">
        <div className="qr-canvas-wrap">
          {data ? (
            <canvas ref={canvasRef} aria-label="QR code preview" />
          ) : (
            <div className="qr-empty">
              <EmptyIcon />
              <span>{t('preview.empty')}</span>
            </div>
          )}
        </div>
        {data && (
          <div className="qr-data-display" title={data}>
            {data.length > 220 ? `${data.slice(0, 220)}…` : data}
          </div>
        )}
        {error && (
          <div className="qr-data-display" style={{ color: 'var(--danger)' }}>{error}</div>
        )}
      </div>
    </div>
  );
}
