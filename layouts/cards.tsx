import React from 'react';
import {  StyleSheet, View } from 'react-native';
import { Player } from '~components/Player';
import { Controls } from '~components/Controls';
import { Platform } from '~node_modules/react-native';
import Constants from '~node_modules/expo-constants';
import { StatusBar } from '~node_modules/expo-status-bar';

interface CardsLayoutProps {
  children: React.ReactNode;
}

/**
 * CardsLayout ----------------
 */
export const CardsLayout: React.FC<CardsLayoutProps> = (props) => {
  return (
    <View style={[ss.wrapper]}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      {/* Плеер ------------ */}
      <Player />

      <View style={[ss.container]}>
        {/*  /!* Список элементов ------------ *!/*/}
        {props.children}
      </View>

      {/* Кнопки ------------ */}
      <Controls />
    </View>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  wrapper: {
    paddingTop:
      Platform.OS === 'ios'
        ? Constants.statusBarHeight
        : Constants.statusBarHeight + 12,
  },
  container: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
    fontFamily: 'Bold',
  },
  cards_title: {
    textTransform: 'uppercase',
    marginBottom: 20,
    fontFamily: 'Bold',
  },
});
