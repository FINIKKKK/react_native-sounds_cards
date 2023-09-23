import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CText, Icon, Input } from '~components/UI';
import { colors } from '~constants';
import { MainLayout } from './main';
import {BottomSheet, sheetHeight} from '~components/BottomSheet';
import { useSelectors } from '~hooks/useSelectors';
import { Link } from 'expo-router';
import { useDebounce } from '~hooks/useDebounce';

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
  const { user } = useSelectors((state) => state.user);

  /**
   * Методы ----------------
   */
  // Поиск
  const onSearch = useDebounce(async (text: string) => {
    console.log('text', text);
  }, 250);

  return (
    <>
      <MainLayout>
        {/* Header ------------ */}
        <View style={[ss.header]}>
          <CText style={[ss.title]}>
            <CText style={[ss.title]}>Привет, </CText>
            <CText style={[{ textTransform: 'capitalize' }, ss.title]}>
              {user?.first_name} !
            </CText>
          </CText>
          <Link href="/settings">
            <Icon
              type="ionic"
              name="settings-outline"
              color={colors.black}
              size={24}
              style={{ lineHeight: 40 }}
            />
          </Link>
        </View>

        {/* Поиск ------------ */}
        <Input
          label="Найдите слова или категории"
          onChangeText={(text) => onSearch(text)}
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
    marginTop: sheetHeight - 25,
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
