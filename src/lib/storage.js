const THEME_KEY = 'qr-theme';
const HISTORY_KEY = 'qr-history';
const STYLE_KEY = 'qr-style';
const LANG_KEY = 'qr-lang';
const MAX_HISTORY = 20;

export function getLang() {
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === 'en' || v === 'ko' ? v : null;
  } catch {
    return null;
  }
}

export function setLang(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* ignore */
  }
}

export function getTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'light';
  } catch {
    return 'light';
  }
}

export function setTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
}

export function getStyle() {
  try {
    const raw = localStorage.getItem(STYLE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveStyle(style) {
  try {
    localStorage.setItem(STYLE_KEY, JSON.stringify(style));
  } catch {
    /* ignore */
  }
}

export function getHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    /* ignore */
  }
}

export function addToHistory(record) {
  const history = getHistory();
  const next = [record, ...history].slice(0, MAX_HISTORY);
  saveHistory(next);
  return next;
}

export function removeFromHistory(id) {
  const history = getHistory().filter((r) => r.id !== id);
  saveHistory(history);
  return history;
}

export function clearHistory() {
  saveHistory([]);
  return [];
}
