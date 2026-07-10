import UrlForm from './forms/UrlForm.jsx';
import VCardForm from './forms/VCardForm.jsx';
import WifiForm from './forms/WifiForm.jsx';
import TextForm from './forms/TextForm.jsx';
import PhoneForm from './forms/PhoneForm.jsx';
import EmailForm from './forms/EmailForm.jsx';

const FORM_MAP = {
  url: UrlForm,
  vcard: VCardForm,
  wifi: WifiForm,
  text: TextForm,
  phone: PhoneForm,
  email: EmailForm,
};

export default function InputForm({ type, data, onChange, t }) {
  const FormComponent = FORM_MAP[type] || TextForm;
  return <FormComponent data={data} onChange={onChange} t={t} />;
}
