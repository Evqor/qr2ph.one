export default function PhoneForm({ data, onChange, t }) {
  return (
    <div className="form-fields">
      <div className="field">
        <label htmlFor="phone">{t('phone.phoneLabel')}</label>
        <input
          id="phone"
          type="tel"
          placeholder={t('phone.phonePlaceholder')}
          value={data.phone}
          autoFocus
          onChange={(e) => onChange({ phone: e.target.value })}
        />
      </div>
    </div>
  );
}
