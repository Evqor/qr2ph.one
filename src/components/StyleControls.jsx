import { useState } from 'react';

const ChevronIcon = () => (
  <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function StyleControls({ style, onChange, onReset, t }) {
  const [open, setOpen] = useState(false);

  const set = (patch) => onChange({ ...style, ...patch });

  return (
    <div className="card">
      <button
        className="collapsible-trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="trigger-left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33a1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          {t('style.title')}
        </span>
        <ChevronIcon />
      </button>
      <div className={`collapsible-content ${open ? 'open' : ''}`}>
        <div className="style-controls">
          <div className="style-row">
            <label htmlFor="sc-fg">{t('style.fg')}</label>
            <div className="color-picker">
              <input
                id="sc-fg"
                type="color"
                value={style.fgColor}
                onChange={(e) => set({ fgColor: e.target.value })}
              />
              <span className="hex">{style.fgColor.toUpperCase()}</span>
            </div>
          </div>
          <div className="style-row">
            <label htmlFor="sc-bg">{t('style.bg')}</label>
            <div className="color-picker">
              <input
                id="sc-bg"
                type="color"
                value={style.bgColor}
                onChange={(e) => set({ bgColor: e.target.value })}
              />
              <span className="hex">{style.bgColor.toUpperCase()}</span>
            </div>
          </div>
          <div className="range-row">
            <div className="style-row">
              <label htmlFor="sc-size">{t('style.size')}</label>
              <span className="range-value">{style.size}px</span>
            </div>
            <input
              id="sc-size"
              type="range"
              min="128"
              max="1024"
              step="32"
              value={style.size}
              onChange={(e) => set({ size: Number(e.target.value) })}
            />
          </div>
          <div className="style-row">
            <label htmlFor="sc-ecl">{t('style.errorCorrection')}</label>
            <select
              id="sc-ecl"
              style={{ width: 'auto', maxWidth: '140px' }}
              value={style.errorCorrectionLevel}
              onChange={(e) => set({ errorCorrectionLevel: e.target.value })}
            >
              <option value="L">L · 7%</option>
              <option value="M">M · 15%</option>
              <option value="Q">Q · 25%</option>
              <option value="H">H · 30%</option>
            </select>
          </div>
          <button className="reset-link" onClick={onReset}>{t('style.reset')}</button>
        </div>
      </div>
    </div>
  );
}
