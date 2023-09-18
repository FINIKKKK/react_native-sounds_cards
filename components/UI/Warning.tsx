import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '~components/UI/Text';
import {blocks, colors} from "~constants";

interface WarningProps {
  label: string
}

/**
 * Warning ----------------
 */
export const Warning: React.FC<WarningProps> = (props) => {
  return (
    <View style={[ss.warning]}>
      <CText style={[ss.label]}>{props.label}</CText>
    </View>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  warning: {
    borderRadius: blocks.radius,
    backgroundColor: colors.grayLight

  },
  label: {},
});
