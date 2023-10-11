import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '~components/UI';
import { Dimensions, TouchableOpacity } from '~node_modules/react-native';
import { useActions } from '~hooks/useActions';
import { useSelectors } from '~hooks/useSelectors';
import {ssSettings} from "~components/SettingsScreen/styles";

interface SizeTextProps {}

/**
 * SizeText ----------------
 */
export const SizeText: React.FC<SizeTextProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const { sizeText } = useSelectors((state) => state.account);
  const { changeSizeText } = useActions();

  /**
   * Методы ----------------
   */
  // Поменять текущий размер текста
  const onChangeSizeText = (index: number) => {
    changeSizeText(index);
  };

  return (
    <View style={[ssSettings.block]}>
      <CText style={[ssSettings.title]}>Размер текста</CText>

      <View style={[ssSettings.cards]}>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <View
              style={[
                ssSettings.card,
                ss.card_size,
                sizeText === index && ssSettings.active,
              ]}
              key={index}
            >
              <TouchableOpacity onPress={() => onChangeSizeText(index)}>
                <View
                  style={[
                    ssSettings.card,
                    ss.card_size,
                    sizeText === index && ssSettings.active,
                  ]}
                >
                  <CText
                    style={[
                      ssSettings.card_text,
                      ss.size_text,
                      index === 1 && ss.size_text_m,
                      index === 2 && ss.size_text_l,
                    ]}
                  >
                    a
                  </CText>
                </View>
              </TouchableOpacity>
            </View>
          ))}
      </View>

      <CText style={[ssSettings.text]}>
        Названия карточек будут иметь такой размер
      </CText>
    </View>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  card_size: {
    width: (Dimensions.get('window').width - 40 - 16) / 3,
  },
  size_text: {
    fontFamily: 'Bold',
    textTransform: 'uppercase',
  },
  size_text_m: {
    fontSize: 26,
    lineHeight: 40,
  },
  size_text_l: {
    fontSize: 36,
    lineHeight: 54,
  },
});
