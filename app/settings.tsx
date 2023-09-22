import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CText } from '~components/UI';

/**
 * SettingsScreen ----------------
 */
export default function SettingsScreen() {
  return (
    <View style={[ss.container]}>
      <CText>Настройки</CText>
    </View>
  );
}

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  container: {},
});
