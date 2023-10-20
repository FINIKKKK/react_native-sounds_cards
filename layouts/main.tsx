import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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
    <ScrollView
      contentContainerStyle={[
        ss.container,
        { backgroundColor: props.bg || colors.bg },
      ]}
    >
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      {props.children}
    </ScrollView>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  keyboard: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
  },
  container: {
    flex: 1,
    // height: '100%',
    paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : Constants.statusBarHeight + 12,
  },
});
