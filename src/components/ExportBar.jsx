import { useState } from 'react';

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const PrintIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function timestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

export default function ExportBar({ canvasRef, svgString, disabled, onSaved, t }) {
  const [copyMsg, setCopyMsg] = useState('');

  const downloadPng = () => {
    const canvas = canvasRef?.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) {
        downloadBlob(blob, `qrcode-${timestamp()}.png`);
        onSaved?.();
      }
    }, 'image/png');
  };

  const downloadSvg = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    downloadBlob(blob, `qrcode-${timestamp()}.svg`);
    onSaved?.();
  };

  const print = () => {
    if (!svgString) return;
    const w = window.open('', '_blank', 'width=600,height=600');
    if (!w) return;
    const closeScript = '<' + '/script>';
    const title = t('export.printTitle');
    w.document.write(
      `<!doctype html><html><head><title>${title}</title>
      <style>body{margin:0;display:grid;place-items:center;height:100vh}svg{max-width:90%;max-height:90vh}</style>
      </head><body>${svgString}<script>window.onload=()=>{window.print();}${closeScript}</body></html>`
    );
    w.document.close();
    onSaved?.();
  };

  const copyImage = async () => {
    const canvas = canvasRef?.current;
    if (!canvas) return;
    try {
      if (!navigator.clipboard || !window.ClipboardItem) {
        setCopyMsg(t('export.notSupported'));
        setTimeout(() => setCopyMsg(''), 1600);
        return;
      }
      const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
      if (!blob) return;
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setCopyMsg(t('export.copied'));
      onSaved?.();
    } catch {
      setCopyMsg(t('export.copyFailed'));
    }
    setTimeout(() => setCopyMsg(''), 1600);
  };

  return (
    <div>
      <div className="export-bar">
        <button className="export-btn primary" disabled={disabled} onClick={downloadPng}>
          <DownloadIcon />{t('export.png')}
        </button>
        <button className="export-btn" disabled={disabled} onClick={downloadSvg}>
          <CodeIcon />{t('export.svg')}
        </button>
        <button className="export-btn" disabled={disabled} onClick={print}>
          <PrintIcon />{t('export.print')}
        </button>
        <button className="export-btn" disabled={disabled} onClick={copyImage}>
          <CopyIcon />{t('export.copy')}
        </button>
        {copyMsg && <span className="copy-feedback">{copyMsg}</span>}
      </div>
    </div>
  );
}
