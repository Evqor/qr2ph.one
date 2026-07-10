export default function WifiForm({ data, onChange, t }) {
  return (
    <div className="form-fields">
      <div className="field">
        <label htmlFor="w-ssid">{t('wifi.ssidLabel')}</label>
        <input
          id="w-ssid"
          type="text"
          placeholder={t('wifi.ssidPlaceholder')}
          value={data.ssid}
          autoFocus
          onChange={(e) => onChange({ ...data, ssid: e.target.value })}
        />
      </div>
      {data.encryption !== 'nopass' && (
        <div className="field">
          <label htmlFor="w-pass">{t('wifi.passLabel')}</label>
          <input
            id="w-pass"
            type="text"
            placeholder={t('wifi.passPlaceholder')}
            value={data.password}
            onChange={(e) => onChange({ ...data, password: e.target.value })}
          />
        </div>
      )}
      <div className="field-row">
        <div className="field">
          <label htmlFor="w-enc">{t('wifi.encLabel')}</label>
          <select
            id="w-enc"
            value={data.encryption}
            onChange={(e) => onChange({ ...data, encryption: e.target.value })}
          >
            <option value="WPA">{t('wifi.encWpa')}</option>
            <option value="WEP">{t('wifi.encWep')}</option>
            <option value="nopass">{t('wifi.encNone')}</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="w-hidden">{t('wifi.hiddenLabel')}</label>
          <select
            id="w-hidden"
            value={data.hidden ? 'yes' : 'no'}
            onChange={(e) => onChange({ ...data, hidden: e.target.value === 'yes' })}
          >
            <option value="no">{t('wifi.hiddenNo')}</option>
            <option value="yes">{t('wifi.hiddenYes')}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
