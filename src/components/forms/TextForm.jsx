export default function TextForm({ data, onChange, t }) {
  return (
    <div className="form-fields">
      <div className="field">
        <label htmlFor="text">{t('text.textLabel')}</label>
        <textarea
          id="text"
          placeholder={t('text.textPlaceholder')}
          value={data.text}
          autoFocus
          onChange={(e) => onChange({ text: e.target.value })}
        />
      </div>
    </div>
  );
}
