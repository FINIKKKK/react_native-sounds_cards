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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={[
          ss.container,
          { backgroundColor: props.bg || colors.bg },
        ]}
      >
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

        {props.children}
      </ScrollView>
    </TouchableWithoutFeedback>
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
    paddingTop: Constants.statusBarHeight + 12,
  },
});
