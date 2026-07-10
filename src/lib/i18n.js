export const LANGUAGES = ['en', 'ko'];
export const DEFAULT_LANGUAGE = 'en';

const dict = {
  en: {
    appTitle: 'QR2PH.ONE',
    documentTitle: 'QR2PH.ONE — Free QR Code Generator',
    contentTitle: 'Content',

    types: {
      url: 'URL',
      vcard: 'Contact',
      wifi: 'WiFi',
      text: 'Text',
      phone: 'Phone',
      email: 'Email',
    },

    url: {
      urlLabel: 'Website URL',
      urlPlaceholder: 'https://example.com',
    },
    vcard: {
      firstLabel: 'First name',
      firstPlaceholder: 'Jane',
      lastLabel: 'Last name',
      lastPlaceholder: 'Doe',
      phoneLabel: 'Phone',
      phonePlaceholder: '+1 555 123 4567',
      emailLabel: 'Email',
      emailPlaceholder: 'jane@example.com',
      orgLabel: 'Organization',
      orgPlaceholder: 'Acme Inc.',
      urlLabel: 'Website',
      urlPlaceholder: 'https://jane.example.com',
    },
    wifi: {
      ssidLabel: 'Network name (SSID)',
      ssidPlaceholder: 'MyWiFi',
      passLabel: 'Password',
      passPlaceholder: 'Pa$$w0rd!',
      encLabel: 'Encryption',
      encWpa: 'WPA/WPA2/WPA3',
      encWep: 'WEP',
      encNone: 'No password',
      hiddenLabel: 'Hidden network',
      hiddenYes: 'Yes',
      hiddenNo: 'No',
    },
    text: {
      textLabel: 'Text content',
      textPlaceholder: 'Any text you want embedded in the QR code…',
    },
    phone: {
      phoneLabel: 'Phone number',
      phonePlaceholder: '+1 555 123 4567',
    },
    email: {
      emailLabel: 'Email address',
      emailPlaceholder: 'hello@example.com',
      subjectLabel: 'Subject (optional)',
      subjectPlaceholder: 'Hello',
      bodyLabel: 'Body (optional)',
      bodyPlaceholder: 'Message body…',
    },

    style: {
      title: 'Advanced customization',
      fg: 'Foreground color',
      bg: 'Background color',
      size: 'Size',
      errorCorrection: 'Error correction',
      reset: 'Reset to defaults',
    },

    preview: {
      title: 'Preview',
      empty: 'Fill in the form to generate a QR code',
      renderError: 'Failed to render QR code',
    },

    export: {
      title: 'Export',
      png: 'PNG',
      svg: 'SVG',
      print: 'Print',
      copy: 'Copy',
      copied: 'Copied!',
      copyFailed: 'Failed',
      notSupported: 'Not supported',
      printTitle: 'Print QR code',
    },

    history: {
      title: 'History',
      empty: 'No QR codes generated yet.',
      restore: 'Restore',
      restoreTitle: 'Restore',
      delete: 'Delete',
      deleteTitle: 'Delete',
      clear: 'Clear all history',
      justNow: 'just now',
      minAgo: 'm ago',
      hourAgo: 'h ago',
      dayAgo: 'd ago',
    },

    theme: {
      toLight: 'Switch to light theme',
      toDark: 'Switch to dark theme',
      toggle: 'Toggle theme',
    },

    lang: {
      toggle: 'Toggle language',
    },
  },

  ko: {
    appTitle: 'QR2PH.ONE',
    documentTitle: 'QR2PH.ONE — 무료 QR 코드 생성기',
    contentTitle: '콘텐츠',

    types: {
      url: 'URL',
      vcard: '연락처',
      wifi: 'WiFi',
      text: '텍스트',
      phone: '전화',
      email: '이메일',
    },

    url: {
      urlLabel: '웹사이트 주소',
      urlPlaceholder: 'https://example.com',
    },
    vcard: {
      firstLabel: '이름',
      firstPlaceholder: '길동',
      lastLabel: '성',
      lastPlaceholder: '홍',
      phoneLabel: '전화번호',
      phonePlaceholder: '010-1234-5678',
      emailLabel: '이메일',
      emailPlaceholder: 'hong@example.com',
      orgLabel: '소속',
      orgPlaceholder: '주식회사 ABC',
      urlLabel: '웹사이트',
      urlPlaceholder: 'https://hong.example.com',
    },
    wifi: {
      ssidLabel: '네트워크 이름 (SSID)',
      ssidPlaceholder: 'MyWiFi',
      passLabel: '비밀번호',
      passPlaceholder: 'Pa$$w0rd!',
      encLabel: '암호화',
      encWpa: 'WPA/WPA2/WPA3',
      encWep: 'WEP',
      encNone: '비밀번호 없음',
      hiddenLabel: '숨겨진 네트워크',
      hiddenYes: '예',
      hiddenNo: '아니오',
    },
    text: {
      textLabel: '텍스트 내용',
      textPlaceholder: 'QR 코드에 넣을 텍스트를 입력하세요…',
    },
    phone: {
      phoneLabel: '전화번호',
      phonePlaceholder: '010-1234-5678',
    },
    email: {
      emailLabel: '이메일 주소',
      emailPlaceholder: 'hello@example.com',
      subjectLabel: '제목 (선택)',
      subjectPlaceholder: '안녕하세요',
      bodyLabel: '본문 (선택)',
      bodyPlaceholder: '메시지 내용…',
    },

    style: {
      title: '고급 사용자 정의',
      fg: '전경색',
      bg: '배경색',
      size: '크기',
      errorCorrection: '오류 정정',
      reset: '기본값으로 초기화',
    },

    preview: {
      title: '미리보기',
      empty: '양식을 입력하면 QR 코드가 생성됩니다',
      renderError: 'QR 코드 렌더링 실패',
    },

    export: {
      title: '내보내기',
      png: 'PNG',
      svg: 'SVG',
      print: '인쇄',
      copy: '복사',
      copied: '복사됨!',
      copyFailed: '실패',
      notSupported: '지원되지 않음',
      printTitle: 'QR 코드 인쇄',
    },

    history: {
      title: '기록',
      empty: '생성된 QR 코드가 없습니다.',
      restore: '복원',
      restoreTitle: '복원',
      delete: '삭제',
      deleteTitle: '삭제',
      clear: '기록 모두 삭제',
      justNow: '방금',
      minAgo: '분 전',
      hourAgo: '시간 전',
      dayAgo: '일 전',
    },

    theme: {
      toLight: '밝은 테마로 전환',
      toDark: '어두운 테마로 전환',
      toggle: '테마 전환',
    },

    lang: {
      toggle: '언어 전환',
    },
  },
};

export function getTranslator(lang) {
  const t = dict[lang] || dict[DEFAULT_LANGUAGE];
  function translate(path) {
    const parts = path.split('.');
    let cur = t;
    for (const p of parts) {
      if (cur == null) return path;
      cur = cur[p];
    }
    return cur == null ? path : cur;
  }
  translate.lang = lang;
  return translate;
}
