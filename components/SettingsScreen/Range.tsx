import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '~components/UI';
import Slider from '~node_modules/@react-native-community/slider';
import { blocks, colors } from '~constants';
import {ssSettings} from "~components/SettingsScreen/styles";
import { useSelectors } from '~hooks/useSelectors';
import { useActions } from '~hooks/useActions';

interface RangeProps {}

/**
 * Range ----------------
 */
export const Range: React.FC<RangeProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const { sizeCard } = useSelectors((state) => state.account);
  const { changeSizeCard } = useActions();

  /**
   * Методы ----------------
   */
  // Поменять текущий размер карточек
  const onChangeSizeCard = (index: number) => {
    changeSizeCard(index);
  };

  return (
    <View style={[ssSettings.block]}>
      <CText style={[ssSettings.title]}>Размер карточек</CText>

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

      <CText style={[ssSettings.text]}>
        Передвигайте ползунок для изменения размера карточек
      </CText>
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
