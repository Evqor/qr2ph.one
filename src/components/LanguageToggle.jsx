export default function LanguageToggle({ lang, onToggle, t }) {
  return (
    <button
      className="icon-btn lang-toggle"
      onClick={onToggle}
      title={lang === 'ko' ? 'English' : '한국어'}
      aria-label={t('lang.toggle')}
      style={{ fontWeight: 600, fontSize: '12px', letterSpacing: '0.02em' }}
    >
      {lang === 'ko' ? 'EN' : 'KO'}
    </button>
  );
}
