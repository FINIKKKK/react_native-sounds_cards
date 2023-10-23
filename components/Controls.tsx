import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Btn } from '~components/UI';
import { router } from 'expo-router';
import { useTranslate } from '~hooks/useTranslate';
import { CategoriesLang } from '~lang/categories';
import { ActionMenu } from '~components/ActionMenu';

interface ControlsProps {}

/**
 * Controls ----------------
 */
export const Controls: React.FC<ControlsProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const $t = useTranslate(CategoriesLang);

  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  const openMenu = () => {
    setIsMenuVisible(true);
  };

  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  /**
   * Методы ----------------
   */
  const transitionOnAdd = async () => {
    await router.replace('/add');
  };

  return (
    <>
      <ActionMenu isVisible={isMenuVisible} onClose={closeMenu} />

      <View style={[ss.controls]}>
        <Btn
          label={$t?.search}
          iconName="search1"
          iconType="ant"
          style={[ss.btn, { marginRight: 18 }]}
        />
        <Btn
          label={$t?.add}
          iconName="plus"
          iconType="ant"
          style={[ss.btn]}
          onPress={openMenu}
        />
      </View>
    </>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 34,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: Dimensions.get('window').width / 2.3,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
