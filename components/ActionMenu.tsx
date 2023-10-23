import React from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { CText } from '~components/UI';
import { router } from 'expo-router';
import { useActions } from '~hooks/useActions';
import { CategoriesLang } from '~lang/categories';
import { useTranslate } from '~hooks/useTranslate';

// Высота
const height = Dimensions.get('window').height;

interface ActionMenuProps {
  isVisible: boolean;
  onClose: any;
}

/**
 * ActionMenu ----------------
 */
export const ActionMenu: React.FC<ActionMenuProps> = ({
  isVisible,
  onClose,
}) => {
  /**
   * Переменные ----------------
   */
  const [isMenuVisible, setIsMenuVisible] = React.useState(true);
  const translateY = new Animated.Value(isMenuVisible ? 34 : -height);
  const backgroundOpacity = new Animated.Value(isMenuVisible ? 1 : 0);
  const { setImage } = useActions();
  const $t = useTranslate(CategoriesLang);

  /**
   * Анимации ----------------
   */
  React.useEffect(() => {
    if (!isMenuVisible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 34,
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setIsMenuVisible(true);
      });
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -height,
          duration: 250,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setIsMenuVisible(false);
      });
    }
  }, [isVisible]);

  /**
   * Методы ----------------
   */
  const onPhoto = () => {};
  const onGalery = () => {};
  const onLibrary = () => {};

  return (
    <>
      <Animated.View
        style={[
          ss.container,
          !isVisible && { zIndex: -100 },
          { opacity: backgroundOpacity },
        ]}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
          }}
          activeOpacity={1}
          onPress={() => onClose()}
        />
      </Animated.View>
      <Animated.View style={[ss.menu, { bottom: translateY }]}>
        <View style={[ss.list]}>
          <View style={[ss.header]}>
            <CText style={[ss.title]}>{$t?.modal?.title}</CText>
            <CText style={[ss.pretitle]}>{$t?.modal?.pretitle}</CText>
          </View>
          <TouchableOpacity style={[ss.item]} onPress={onPhoto}>
            <CText style={[ss.item_text]}>{$t?.modal?.on_photo}</CText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[ss.item]}
            onPress={() => router.replace('/add')}
          >
            <CText style={[ss.item_text]}>{$t?.modal?.on_category}</CText>
          </TouchableOpacity>
          <TouchableOpacity style={[ss.item]} onPress={onGalery}>
            <CText style={[ss.item_text]}>{$t?.modal?.on_gallery}</CText>
          </TouchableOpacity>
          <TouchableOpacity style={[ss.item]} onPress={onLibrary}>
            <CText style={[ss.item_text]}>{$t?.modal?.on_library}</CText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[ss.btn]} onPress={() => onClose()}>
          <CText style={[ss.item_text, { fontFamily: 'Bold' }]}>
            {$t?.modal?.close}
          </CText>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 200,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    zIndex: 200,
    position: 'absolute',
    bottom: 34,
    left: 25,
    right: 25,
    width: Dimensions.get('window').width - 50,
  },
  list: {
    borderRadius: 14,
    backgroundColor: 'rgba(218, 217, 218, 0.98)',
  },
  header: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    color: '#847E76',
    fontFamily: 'Bold',
  },
  pretitle: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    color: '#847E76',
  },
  item: {
    padding: 17,
    borderTopColor: '#9EA09F',
    borderTopWidth: 1,
  },
  item_text: {
    fontSize: 17,
    lineHeight: 24,
    color: '#007AFF',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: 'white',
    padding: 17,
    borderRadius: 14,
    marginTop: 8,
  },
});
