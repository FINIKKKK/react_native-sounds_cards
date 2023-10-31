import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Btn } from '~components/UI';
import { router } from 'expo-router';
import { useTranslate } from '~hooks/useTranslate';
import { CategoriesLang } from '~lang/categories';
import { ActionMenu } from '~components/ActionMenu';
import { useActions } from '~hooks/useActions';

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
  const { setImage } = useActions();

  /**
   * Методы ----------------
   */
  // Закрыть меню
  const closeMenu = () => {
    setIsMenuVisible(false);
    setImage(null);
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
          onPress={() => setIsMenuVisible(!isMenuVisible)}
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
    left: 0,
    right: 0,
    bottom: 36,
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
