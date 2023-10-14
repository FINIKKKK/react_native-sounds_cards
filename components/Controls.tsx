import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Btn } from '~components/UI';
import {router} from "expo-router";
import {useTranslate} from "~hooks/useTranslate";
import {CategoriesLang} from "~lang/categories";

interface ControlsProps {}

/**
 * Controls ----------------
 */
export const Controls: React.FC<ControlsProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const $t = useTranslate(CategoriesLang);

  return (
    <View style={[ss.controls]}>
      <Btn
        label={$t?.search}
        iconName="search1"
        iconType="ant"
        style={[ss.btn, { marginRight: 18 }]}
      />
      <Btn label={$t?.add} iconName="plus" iconType="ant" style={[ss.btn]} onPress={() => router.replace('/add_category')} />
    </View>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 34,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 180,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
