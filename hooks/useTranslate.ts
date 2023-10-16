import { useSelectors } from '~hooks/useSelectors';

/**
 * Хук для определения языка
 */
export const useTranslate = (component: any) => {
  const { lang } = useSelectors((state) => state.account);

  // Если язык русский
  return component?.[lang];
};
