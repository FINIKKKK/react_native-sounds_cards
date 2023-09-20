import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { CText, Icon, Input } from '~components/UI';
import { colors } from '~constants';
import { MainLayout } from './main';
import { BottomSheet } from '~components/BottomSheet';
import { useSelectors } from '~hooks/useSelectors';

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
  const { user } = useSelectors((state) => state.user);

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
          <Icon
            type="ionic"
            name="settings-outline"
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
    marginTop: 15,
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
});
