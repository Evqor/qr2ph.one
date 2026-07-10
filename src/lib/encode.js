export const TYPES = ['url', 'vcard', 'wifi', 'text', 'phone', 'email'];

export const TYPE_LABELS = {
  url: 'URL',
  vcard: 'Contact',
  wifi: 'WiFi',
  text: 'Text',
  phone: 'Phone',
  email: 'Email',
};

export const TYPE_META = [
  { id: 'url', label: 'URL' },
  { id: 'vcard', label: 'Contact' },
  { id: 'wifi', label: 'WiFi' },
  { id: 'text', label: 'Text' },
  { id: 'phone', label: 'Phone' },
  { id: 'email', label: 'Email' },
];

export const DEFAULT_FORM_DATA = {
  url: { url: '' },
  vcard: { firstName: '', lastName: '', phone: '', email: '', organization: '', url: '' },
  wifi: { ssid: '', password: '', encryption: 'WPA', hidden: false },
  text: { text: '' },
  phone: { phone: '' },
  email: { email: '', subject: '', body: '' },
};

function escapeWifi(value) {
  return String(value).replace(/([\\;,":])/g, '\\$1');
}

export function isValidUrl(str) {
  if (!str) return false;
  if (!/^https?:\/\//i.test(str)) return false;
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

export function encodeData(type, data) {
  switch (type) {
    case 'url': {
      const v = (data.url || '').trim();
      return isValidUrl(v) || /^[\w-]+(\.[\w-]+)+.*$/i.test(v) ? v : null;
    }

    case 'vcard': {
      const lines = ['BEGIN:VCARD', 'VERSION:3.0'];
      if (data.lastName || data.firstName) {
        const last = escapeWifi(data.lastName || '');
        const first = escapeWifi(data.firstName || '');
        lines.push(`N:${last};${first};;;`);
      }
      if (data.firstName || data.lastName) {
        lines.push(`FN:${escapeWifi(`${data.firstName} ${data.lastName}`.trim())}`);
      }
      if (data.organization) lines.push(`ORG:${escapeWifi(data.organization)}`);
      if (data.phone) lines.push(`TEL;TYPE=CELL:${escapeWifi(data.phone)}`);
      if (data.email) lines.push(`EMAIL:${escapeWifi(data.email)}`);
      if (data.url) lines.push(`URL:${escapeWifi(data.url)}`);
      lines.push('END:VCARD');
      const hasAny = [data.firstName, data.lastName, data.phone, data.email, data.organization, data.url].some(Boolean);
      return hasAny ? lines.join('\n') : null;
    }

    case 'wifi': {
      if (!data.ssid) return null;
      const t = data.encryption === 'nopass' ? 'nopass' : data.encryption;
      const parts = [`WIFI:T:${t};S:${escapeWifi(data.ssid)};`];
      if (t !== 'nopass' && data.password) {
        parts.push(`P:${escapeWifi(data.password)};`);
      }
      if (data.hidden) parts.push(`H:true;`);
      parts.push(';');
      return parts.join('');
    }

    case 'text': {
      const v = (data.text || '').trim();
      return v ? v : null;
    }

    case 'phone': {
      const v = (data.phone || '').trim();
      return v ? `tel:${v}` : null;
    }

    case 'email': {
      const v = (data.email || '').trim();
      if (!v) return null;
      const params = [];
      if (data.subject) params.push(`subject=${encodeURIComponent(data.subject)}`);
      if (data.body) params.push(`body=${encodeURIComponent(data.body)}`);
      const query = params.length ? `?${params.join('&')}` : '';
      return `mailto:${v}${query}`;
    }

    default:
      return null;
  }
}

export function describeRecord(type, data) {
  switch (type) {
    case 'url':
      return data.url || 'URL';
    case 'vcard':
      return `${data.firstName} ${data.lastName}`.trim() || data.organization || data.email || 'Contact';
    case 'wifi':
      return data.ssid || 'Wi-Fi';
    case 'text':
      return (data.text || 'Text').slice(0, 50);
    case 'phone':
      return data.phone || 'Phone';
    case 'email':
      return data.email || 'Email';
    default:
      return 'QR code';
  }
}
