export default function UrlForm({ data, onChange, t }) {
  return (
    <div className="form-fields">
      <div className="field">
        <label htmlFor="url">{t('url.urlLabel')}</label>
        <input
          id="url"
          type="text"
          inputMode="url"
          placeholder={t('url.urlPlaceholder')}
          value={data.url}
          autoFocus
          onChange={(e) => onChange({ url: e.target.value })}
        />
      </div>
    </div>
  );
}
