import * as Localization from 'expo-localization';
import {useSelectors} from "~hooks/useSelectors";

/**
 * Хук для определения языка
 */
export const useTranslate = (component: any) => {
    const currentLocale = Localization.locale; // Язык системы
    const {lang} = useSelectors((state) => state.account)
    console.log(lang);

    // Если язык казахский
    if (currentLocale === 'kk-KZ') return component.kz
    // Если язык русский
    else return component?.[lang];
};