export default function VCardForm({ data, onChange, t }) {
  return (
    <div className="form-fields">
      <div className="field-row">
        <div className="field">
          <label htmlFor="v-first">{t('vcard.firstLabel')}</label>
          <input
            id="v-first"
            type="text"
            placeholder={t('vcard.firstPlaceholder')}
            value={data.firstName}
            autoFocus
            onChange={(e) => onChange({ ...data, firstName: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="v-last">{t('vcard.lastLabel')}</label>
          <input
            id="v-last"
            type="text"
            placeholder={t('vcard.lastPlaceholder')}
            value={data.lastName}
            onChange={(e) => onChange({ ...data, lastName: e.target.value })}
          />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="v-phone">{t('vcard.phoneLabel')}</label>
          <input
            id="v-phone"
            type="tel"
            placeholder={t('vcard.phonePlaceholder')}
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="v-email">{t('vcard.emailLabel')}</label>
          <input
            id="v-email"
            type="email"
            placeholder={t('vcard.emailPlaceholder')}
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="v-org">{t('vcard.orgLabel')}</label>
        <input
          id="v-org"
          type="text"
          placeholder={t('vcard.orgPlaceholder')}
          value={data.organization}
          onChange={(e) => onChange({ ...data, organization: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="v-url">{t('vcard.urlLabel')}</label>
        <input
          id="v-url"
          type="text"
          placeholder={t('vcard.urlPlaceholder')}
          value={data.url}
          onChange={(e) => onChange({ ...data, url: e.target.value })}
        />
      </div>
    </div>
  );
}
