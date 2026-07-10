import { TYPES } from './encode.js';

export function typeFromPath(pathname) {
  const trimmed = String(pathname || '').replace(/^\/+|\/+$/g, '').toLowerCase();
  if (!trimmed || trimmed === 'index' || trimmed === 'home') return TYPES[0];
  if (TYPES.includes(trimmed)) return trimmed;
  return null;
}

export function pathFromType(type) {
  if (!type || !TYPES.includes(type)) return '/';
  return `/${type}`;
}

export function setTypeInUrl(type) {
  const target = pathFromType(type);
  if (window.location.pathname !== target) {
    window.history.pushState({ type }, '', target);
  }
}

export function replaceTypeInUrl(type) {
  const target = pathFromType(type);
  if (window.location.pathname !== target) {
    window.history.replaceState({ type }, '', target);
  }
}
