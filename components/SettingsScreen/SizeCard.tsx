import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '~components/UI';
import Slider from '~node_modules/@react-native-community/slider';
import { blocks, colors } from '~constants';
import { ssSettings } from '~components/SettingsScreen/styles';
import { useSelectors } from '~hooks/useSelectors';
import { useActions } from '~hooks/useActions';
import { useTranslate } from '~hooks/useTranslate';
import { SettingsLang } from '~lang/settings';
import { width, width2 } from '~components/Category';

interface RangeProps {}

/**
 * Range ----------------
 */
export const SizeCard: React.FC<RangeProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const { sizeCard } = useSelectors((state) => state.account);
  const { changeSizeCard } = useActions();
  const $t = useTranslate(SettingsLang);


  /**
   * Методы ----------------
   */
  // Поменять текущий размер карточек
  const onChangeSizeCard = (value: number) => {
    changeSizeCard(value);
  };

  return (
    <View style={[ssSettings.block]}>
      <CText style={[ssSettings.title]}>{$t?.size_card_title}</CText>

      <View style={ss.range}>
        <View style={[ss.range_item, ss.range_item_s]}></View>
        <Slider
          minimumValue={0}
          maximumValue={1}
          value={sizeCard}
          onValueChange={(value) => onChangeSizeCard(value)}
          step={1}
          style={[ss.slider]}
          minimumTrackTintColor={colors.blue}
          thumbTintColor={colors.blue}
        />
        <View style={[ss.range_item, ss.range_item_l]}></View>
      </View>

      <CText style={[ssSettings.text]}>{$t?.size_card_text}</CText>
    </View>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  range: {
    borderRadius: blocks.radius,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
  },
  range_item: {
    backgroundColor: colors.blue,
  },
  range_item_s: {
    width: 14,
    height: 14,
  },
  range_item_l: {
    width: 20,
    height: 20,
  },
});
