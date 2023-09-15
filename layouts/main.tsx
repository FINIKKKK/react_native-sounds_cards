import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { colors } from '~constants';

interface MainLayoutProps {
  children: React.ReactNode;
  bg?: string;
}

/**
 * MainLayout ----------------
 */
export const MainLayout: React.FC<MainLayoutProps> = (props) => {
  return (
    <View
      style={[styles.container, { backgroundColor: props.bg || colors.bg }]}
    >
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      {props.children}
    </View>
  );
};

/**
 * Styles ----------------
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 12,
    paddingLeft: 12,
    paddingTop: Constants.statusBarHeight + 12,
  },
});
