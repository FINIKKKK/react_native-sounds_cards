import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CText } from '~components/UI';
import { MainLayout } from './main';
import { BottomSheet } from '~components/BottomSheet';
import { Select } from '~components/UI/Select';
import { useActions } from '~hooks/useActions';

interface CardsLayoutProps {
  children: React.ReactNode;
  title: string;
}

/**
 * CardsLayout ----------------
 */
export const CardsLayout: React.FC<CardsLayoutProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const options = [
    { value: 'ru', label: 'Русский' },
    { value: 'kz', label: 'Казахский' },
  ];
  const { changeLang } = useActions();

  return (
    <>
      <MainLayout>
        {/* Нижняя панель ------------ */}
        <BottomSheet />

        <View style={[ss.container]}>
          <Select
            values={options}
            setValue={(item) => changeLang(item.value)}
          />

          {/* Список элементов ------------ */}
          <ScrollView contentContainerStyle={[ss.cards]}>
            {props.children}
          </ScrollView>
        </View>
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
