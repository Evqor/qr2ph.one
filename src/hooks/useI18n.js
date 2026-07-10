import { createContext, useContext } from 'react';

export const I18nContext = createContext(null);

export function useI18n() {
  return useContext(I18nContext);
}
