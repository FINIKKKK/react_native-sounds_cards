import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from '~node_modules/react-native';
import {colors} from "~constants";

interface LoadingProps {}

/**
 * Loading ----------------
 */
export const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <View style={[ss.container]}>
      <ActivityIndicator size={55} color={colors.blue} />
    </View>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
