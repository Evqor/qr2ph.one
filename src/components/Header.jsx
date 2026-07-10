import ThemeToggle from './ThemeToggle.jsx';
import LanguageToggle from './LanguageToggle.jsx';

export default function Header({ theme, onToggleTheme, lang, onToggleLang, t }) {
  return (
    <header className="header">
      <h1>
        <span className="logo" aria-hidden="true">
          <img src="/favicon.svg" alt="" />
        </span>
        {t('appTitle')}
      </h1>
      <div className="header-right">
        <LanguageToggle lang={lang} onToggle={onToggleLang} t={t} />
        <ThemeToggle theme={theme} onToggle={onToggleTheme} t={t} />
      </div>
    </header>
  );
}
