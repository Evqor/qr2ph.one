export default function EmailForm({ data, onChange, t }) {
  return (
    <div className="form-fields">
      <div className="field">
        <label htmlFor="e-email">{t('email.emailLabel')}</label>
        <input
          id="e-email"
          type="email"
          placeholder={t('email.emailPlaceholder')}
          value={data.email}
          autoFocus
          onChange={(e) => onChange({ ...data, email: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="e-subject">{t('email.subjectLabel')}</label>
        <input
          id="e-subject"
          type="text"
          placeholder={t('email.subjectPlaceholder')}
          value={data.subject}
          onChange={(e) => onChange({ ...data, subject: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="e-body">{t('email.bodyLabel')}</label>
        <textarea
          id="e-body"
          placeholder={t('email.bodyPlaceholder')}
          value={data.body}
          onChange={(e) => onChange({ ...data, body: e.target.value })}
        />
      </div>
    </div>
  );
}
