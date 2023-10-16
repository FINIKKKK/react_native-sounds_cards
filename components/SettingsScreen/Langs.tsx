import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '~components/UI';
import { TouchableOpacity } from '~node_modules/react-native';
import { TLang } from '~store/slices/account';
import { useSelectors } from '~hooks/useSelectors';
import { useActions } from '~hooks/useActions';
import { ssSettings } from '~components/SettingsScreen/styles';
import { useTranslate } from '~hooks/useTranslate';
import { SettingsLang } from '~lang/settings';

export interface Lang {
  value: TLang;
  label: string;
}

const langs: Lang[] = [
  { value: 'kz', label: 'lang_kz' },
  { value: 'ru', label: 'lang_ru' },
];

interface LangsProps {}

/**
 * Langs ----------------
 */
export const Langs: React.FC<LangsProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const { lang } = useSelectors((state) => state.account);
  const { changeLang } = useActions();
  const $t = useTranslate(SettingsLang);

  /**
   * Методы ----------------
   */
  // Поменять текущий размер карточек
  const onChangeLang = (value: TLang) => {
    changeLang(value);
  };

  return (
    <View style={[ssSettings.block]}>
      <CText style={[ssSettings.title]}>{$t?.lang_title}</CText>

      <View style={[ssSettings.cards]}>
        {langs.map((item) => (
          <View
            style={[ssSettings.card, lang === item.value && ssSettings.active]}
            key={item.value}
          >
            <TouchableOpacity onPress={() => onChangeLang(item.value)}>
              <View
                style={[
                  ssSettings.card,
                  lang === item.value && ssSettings.active,
                ]}
                key={item.value}
              >
                <CText style={[ssSettings.card_text]}>{$t?.[item.label]}</CText>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <CText style={[ssSettings.text]}>{$t?.lang_text}</CText>
    </View>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({});
