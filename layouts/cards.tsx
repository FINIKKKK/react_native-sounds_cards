import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CText, Icon, Input, Title } from '../components/UI';
import { colors } from '../constants';
import { BottomSheet } from '../components/BottomSheet';
import { MainLayout } from './main';

interface CardsLayoutProps {
  children: React.ReactNode;
  title: string;
}

/**
 * Layout ----------------
 */
export const CardsLayout: React.FC<CardsLayoutProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <>
      <MainLayout>
        {/* Header ------------ */}
        <View style={[ss.header]}>
          <Title style={[ss.title]}>Привет, Александр!</Title>
          <Icon
            name="cog"
            color={colors.black}
            size={24}
            style={{ lineHeight: 40 }}
          />
        </View>

        {/* Поиск ------------ */}
        <Input
          label="Найдите слова или категории"
          onChangeText={(text) => setSearchValue(text)}
          icon="search"
          style={{ marginBottom: 48 }}
        />

        {/* Список категорий ------------ */}
        <View style={[ss.cards_block]}>
          <CText style={[ss.cards_title]}>{props.title}</CText>
          <ScrollView contentContainerStyle={[ss.cards]}>
            {props.children}
          </ScrollView>
        </View>
      </MainLayout>

      {/* Нижняя панель ------------ */}
      <BottomSheet />
    </>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 24,
    marginTop: 15
  },
  title: {
    fontSize: 32,
    lineHeight: 42,
  },
  cards_title: {
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  cards_block: {
    marginBottom: 95,
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
