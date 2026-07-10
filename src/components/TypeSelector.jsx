import { TYPES } from '../lib/encode.js';

export default function TypeSelector({ value, onChange, t }) {
  return (
    <div className="type-selector" role="tablist">
      {TYPES.map((id) => (
        <button
          key={id}
          role="tab"
          aria-selected={value === id}
          className={value === id ? 'active' : ''}
          onClick={() => onChange(id)}
        >
          {t(`types.${id}`)}
        </button>
      ))}
    </div>
  );
}
