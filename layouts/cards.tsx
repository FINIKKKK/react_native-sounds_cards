import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MainLayout } from './main';
import { Player } from '~components/Player';
import {Controls} from "~components/Controls";

interface CardsLayoutProps {
  children: React.ReactNode;
}

/**
 * CardsLayout ----------------
 */
export const CardsLayout: React.FC<CardsLayoutProps> = (props) => {
  return (
    <>
      <MainLayout>
        {/* Плеер ------------ */}
        <Player />

        <View style={[ss.container]}>
          {/* Список элементов ------------ */}
          <ScrollView contentContainerStyle={[ss.cards]}>
            {props.children}
          </ScrollView>
        </View>

        {/* Кнопки ------------ */}
        <Controls />
      </MainLayout>
    </>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  container: {
    paddingHorizontal: 16
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
  cards_block: {
    // marginBottom: 125,
  },
  cards: {},
});
