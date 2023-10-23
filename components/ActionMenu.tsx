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

const screenHeight = Dimensions.get('window').height;

interface ActionMenuProps {
  isVisible: boolean;
  onClose: any;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  isVisible,
  onClose,
}) => {
  const [isMenuVisible, setIsMenuVisible] = React.useState(isVisible);
  const translateY = new Animated.Value(isVisible ? 0 : screenHeight);

  React.useEffect(() => {
    if (isVisible) {
      setIsMenuVisible(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => {
        setIsMenuVisible(false);
      });
    }
  }, [isVisible]);

  const closeMenu = () => {
    onClose();
  };

  if (!isMenuVisible) return null;

  return (
    <View style={[ss.container]}>
      <TouchableOpacity
        style={{
          flex: 1,
          width: '100%',
        }}
        activeOpacity={1}
        onPress={closeMenu}
      />
      <Animated.View style={[ss.menu]}>
        <View style={[ss.list]}>
          <View style={[ss.header]}>
            <CText style={[ss.title]}>Что вы хотите сделать?</CText>
            <CText style={[ss.pretitle]}>Выберите один из пунктов ниже</CText>
          </View>
          <TouchableOpacity style={[ss.item]} onPress={closeMenu}>
            <CText style={[ss.item_text]}>Сделать фоторграфию</CText>
          </TouchableOpacity>
          <TouchableOpacity style={[ss.item]} onPress={closeMenu}>
            <CText style={[ss.item_text]}>Добавить новую категорию</CText>
          </TouchableOpacity>
          <TouchableOpacity style={[ss.item]} onPress={closeMenu}>
            <CText style={[ss.item_text]}>
              Добавить изображение из галереи
            </CText>
          </TouchableOpacity>
          <TouchableOpacity style={[ss.item]} onPress={closeMenu}>
            <CText style={[ss.item_text]}>Найти изображение в библиотеке</CText>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[ss.btn]} onPress={closeMenu}>
          <CText style={[ss.item_text, { fontFamily: 'Bold' }]}>Закрыть</CText>
        </TouchableOpacity>
      </Animated.View>
    </View>
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
