import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  TouchableNativeFeedback,
  Pressable,
} from 'react-native';
import { blocks, colors } from '~constants';
import { Card } from './Card';
import { useSelectors } from '../hooks/useSelectors';
import { CText, Icon } from '~components/UI';
import { useActions } from '~hooks/useActions';

interface BottomSheetProps {}

/**
 *  BottomSheet ----------------
 */
export const BottomSheet: React.FC<BottomSheetProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const [isOpen, setIsOpen] = React.useState(false);
  const [animatedValue] = React.useState(new Animated.Value(0));
  const { cards } = useSelectors((state) => state.cards);
  const { removeCards } = useActions();

  /**
   * Методы ----------------
   */
  const toggleOpen = () => {
    setIsOpen(!isOpen);

    Animated.timing(animatedValue, {
      toValue: isOpen ? 0 : 1,
      duration: 250,
      easing: Easing.exp,
      useNativeDriver: false,
    }).start();
  };

  // Настройки для анимации
  const bottomInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-138, 0],
  });
  const animatedStyle = {
    bottom: bottomInterpolate,
  };

  // Проигрывать карточки слов
  const playCards = () => {};

  return (
    <Animated.View style={[ss.sheet, animatedStyle]}>
      <TouchableNativeFeedback onPress={toggleOpen}>
        <View style={[ss.header]}>
          <View style={[ss.title]}>
            <CText style={[ss.text]}>Панель разговора</CText>
            {!!cards.length && <CText style={[ss.span]}>{cards.length}</CText>}
          </View>

          <Icon
            name="sort-up"
            color={colors.blue}
            size={28}
            style={[{ marginBottom: -12 }]}
          />
        </View>
      </TouchableNativeFeedback>

      <View style={[ss.cards_wrapper, !!cards.length && { marginBottom: -12 }]}>
        <ScrollView contentContainerStyle={[ss.cards]} horizontal>
          {cards.map((card, index) => (
            <Card
              key={`${card.id}_${index}`}
              style={{ marginRight: 8 }}
              data={card}
              type="small"
            />
          ))}
        </ScrollView>
        <View style={[ss.controls]}>
          <Pressable onPress={() => removeCards()}>
            <Icon
              type="font5"
              name="backspace"
              color={colors.grayLight}
              size={35}
              style={[ss.icon, ss.icon_close]}
            />
          </Pressable>

          <Pressable onPress={() => playCards()}>
            <Icon
              type="ant"
              name="play"
              color={colors.blue}
              size={44}
              style={[ss.icon, ss.icon_play]}
            />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    width: '100%',
    flex: 1,
  },
  header: {
    backgroundColor: colors.grayDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    padding: 20,
    borderTopLeftRadius: blocks.radius,
    borderTopRightRadius: blocks.radius,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Regular',
  },
  text: {
    marginRight: 8,
  },
  span: {
    fontSize: 13,
    backgroundColor: colors.blue,
    borderRadius: 50,
    color: colors.white,
    width: 21,
    height: 21,
    textAlign: 'center',
    lineHeight: 22,
  },
  cards_wrapper: {
    backgroundColor: colors.white,
    padding: 20,
    flexDirection: 'row',
  },
  cards: {
    marginRight: 20,
  },
  controls: {
    paddingLeft: 20,
  },
  control: {
    width: 50,
    height: 50,
  },
  icon: {
    textAlign: 'center',
    lineHeight: 60,
  },
  close: {
    backgroundColor: colors.grayLight,
    height: 30,
    lineHeight: 30,
    marginBottom: 20,
  },
  play: {
    backgroundColor: colors.blue,
    borderRadius: 50,
  },
  icon_close: {
    lineHeight: 35,
    marginBottom: 3,
  },
  icon_play: {
    marginLeft: 3,
  },
});
