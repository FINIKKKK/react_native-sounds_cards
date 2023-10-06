import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Btn } from '~components/UI';

interface ControlsProps {}

/**
 * Controls ----------------
 */
export const Controls: React.FC<ControlsProps> = (props) => {
  return (
    <View style={[ss.controls]}>
      <Btn
        label="Поиск слов"
        iconName="search1"
        iconType="ant"
        style={[ss.btn, { marginRight: 18 }]}
      />
      <Btn label="Добавить" iconName="plus" iconType="ant" style={[ss.btn]} />
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
