import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

import Header from './components/Header.jsx';
import TypeSelector from './components/TypeSelector.jsx';
import InputForm from './components/InputForm.jsx';
import StyleControls from './components/StyleControls.jsx';
import QrPreview from './components/QrPreview.jsx';
import ExportBar from './components/ExportBar.jsx';
import HistoryPanel from './components/HistoryPanel.jsx';

import { DEFAULT_FORM_DATA, encodeData, describeRecord } from './lib/encode.js';
import { DEFAULT_LANGUAGE, getTranslator } from './lib/i18n.js';
import { DEFAULT_STYLE } from './lib/qr.js';
import { detectLanguage } from './lib/detect-lang.js';
import { replaceTypeInUrl, setTypeInUrl, typeFromPath } from './lib/router.js';
import {
  setLang as persistLang,
  getTheme,
  setTheme as persistTheme,
  getStyle,
  saveStyle,
  getHistory,
  addToHistory,
  removeFromHistory,
  clearHistory,
} from './lib/storage.js';
import { I18nContext } from './hooks/useI18n.js';
import { useDebounce } from './hooks/useDebounce.js';

function genId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function App() {
  const initialType = typeof window === 'undefined'
    ? 'url'
    : typeFromPath(window.location.pathname) || 'url';
  const [theme, setThemeState] = useState(() => getTheme());
  const [lang, setLangState] = useState(DEFAULT_LANGUAGE);
  const [type, setTypeState] = useState(initialType);
  const [formData, setFormData] = useState({ ...DEFAULT_FORM_DATA });
  const [style, setStyleState] = useState({ ...DEFAULT_STYLE });
  const [history, setHistoryState] = useState([]);
  const [svgString, setSvgString] = useState(null);
  const canvasRef = useRef(null);
  const t = useMemo(() => getTranslator(lang), [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t('documentTitle');
  }, [lang, t]);

  // Initial load from localStorage, URL, and locale detection.
  useEffect(() => {
    const savedTheme = getTheme();
    setThemeState(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    const s = getStyle();
    if (s) setStyleState({ ...DEFAULT_STYLE, ...s });
    setHistoryState(getHistory());

    const routeType = typeFromPath(window.location.pathname);
    if (routeType) {
      setTypeState(routeType);
    } else {
      replaceTypeInUrl('url');
    }

    let cancelled = false;
    detectLanguage().then((detected) => {
      if (cancelled) return;
      setLangState(detected);
      document.documentElement.lang = detected;
    });

    const onPopState = () => {
      const next = typeFromPath(window.location.pathname) || 'url';
      setTypeState(next);
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      cancelled = true;
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    document.documentElement.setAttribute('data-theme', next);
    persistTheme(next);
  };

  const toggleLang = () => {
    const next = lang === 'ko' ? 'en' : 'ko';
    setLangState(next);
    document.documentElement.lang = next;
    persistLang(next);
  };

  const selectType = useCallback((next) => {
    setTypeState(next);
    setTypeInUrl(next);
  }, []);

  const setStyle = useCallback((next) => {
    setStyleState(next);
    saveStyle(next);
  }, []);

  const resetStyle = useCallback(() => {
    setStyle({ ...DEFAULT_STYLE });
  }, [setStyle]);

  // compute data string per current type/form (debounced so typing doesn't thrash rendering)
  const currentData = useMemo(
    () => formData[type] || DEFAULT_FORM_DATA[type] || {},
    [formData, type]
  );
  const dataString = useMemo(
    () => encodeData(type, currentData),
    [type, currentData]
  );
  const debouncedData = useDebounce(dataString, 250);

  const saveCurrentToHistory = useCallback(() => {
    if (!debouncedData) return;
    const record = {
      id: genId(),
      type,
      label: describeRecord(type, currentData),
      dataString: debouncedData,
      style,
      formData: { [type]: currentData },
      timestamp: Date.now(),
    };
    setHistoryState(addToHistory(record));
  }, [currentData, debouncedData, style, type]);

  const handleRestore = (rec) => {
    selectType(rec.type);
    setFormData({ ...DEFAULT_FORM_DATA, ...rec.formData });
    if (rec.style) {
      setStyle({ ...DEFAULT_STYLE, ...rec.style });
    }
  };

  const handleDelete = (id) => setHistoryState(removeFromHistory(id));
  const handleClear = () => setHistoryState(clearHistory());

  return (
    <I18nContext.Provider value={{ lang, t }}>
      <div className="app">
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          lang={lang}
          onToggleLang={toggleLang}
          t={t}
        />
        <main className="main">
          <div className="col-left">
            <div className="card content-card">
              <div className="card-title">{t('contentTitle')}</div>
              <TypeSelector value={type} onChange={selectType} t={t} />
              <InputForm
                type={type}
                data={currentData}
                t={t}
                onChange={(next) =>
                  setFormData((prev) => ({ ...prev, [type]: next }))
                }
              />
            </div>

            <StyleControls style={style} onChange={setStyle} onReset={resetStyle} t={t} />
            <HistoryPanel
              history={history}
              onRestore={handleRestore}
              onDelete={handleDelete}
              onClear={handleClear}
              t={t}
            />
          </div>

          <div className="preview-panel">
            <QrPreview
              data={debouncedData}
              style={style}
              canvasRef={canvasRef}
              onSvgReady={setSvgString}
              t={t}
            />
            <div className="card">
              <div className="card-title">{t('export.title')}</div>
              <ExportBar
                canvasRef={canvasRef}
                svgString={svgString}
                disabled={!debouncedData}
                onSaved={saveCurrentToHistory}
                t={t}
              />
            </div>
          </div>
        </main>
      </div>
    </I18nContext.Provider>
  );
}
