import { DEFAULT_LANGUAGE } from './i18n.js';
import { getLang } from './storage.js';

function browserPrefersKorean() {
  if (typeof navigator === 'undefined') return null;
  const langs = [navigator.language, ...(navigator.languages || [])]
    .filter(Boolean)
    .map((l) => l.toLowerCase());
  return langs.some((l) => l.startsWith('ko'));
}

async function getLangFromIp() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.country_code) {
      const code = String(data.country_code).toUpperCase();
      if (code === 'KR') return 'ko';
      if (['US', 'GB', 'CA', 'AU', 'NZ', 'IE'].includes(code)) return 'en';
    }
  } catch {
    /* timeout or network error — fall through */
  }
  clearTimeout(timeout);
  return null;
}

export async function detectLanguage() {
  const stored = getLang();
  if (stored) return stored;
  if (browserPrefersKorean()) return 'ko';
  const ip = await getLangFromIp();
  if (ip) return ip;
  return DEFAULT_LANGUAGE;
}
