import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ViewStyle,
  TouchableNativeFeedback,
} from 'react-native';
import { CText } from './UI';
import { blocks, colors } from '~constants';
import { useActions } from '~hooks/useActions';
import { TCard } from '~types/cards';
import { useSelectors } from '~hooks/useSelectors';
import {width, width2} from '~components/Category';

interface CategoryProps {
  data: TCard;
  style?: ViewStyle;
  type?: 'small';
}


const cardWidth = width * 1.084
const cardWidth2 = width2 * 1.05

/**
 * Card ----------------
 */
export const Card: React.FC<CategoryProps> = ({ data, style, type }) => {
  /**
   * Переменные ----------------
   */
  const { addCard } = useActions();
  const { lang, sizeCard } = useSelectors((state) => state.account);
  const name = data?.name[lang === 'ru' ? 0 : 1][lang];
  const isLarge = sizeCard === 1

  return (
    <TouchableNativeFeedback onPress={() => addCard({ data, name })} style={ss.wrapper}>
      <View style={[ss.card, style && style, type === 'small' && ss.small, isLarge && ss.card2]}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/a7/c5/be/a7c5be6a5b1b5681cb8b09f41939164b.jpg',
          }}
          style={[ss.img, type === 'small' && ss.small_img, isLarge && ss.img2]}
        />
        <CText style={[ss.title, type === 'small' && ss.small_text]}>
          {name}
        </CText>
      </View>
    </TouchableNativeFeedback>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  wrapper: {
    // marginBottom: 50
  },
  card: {
    width: cardWidth,
    marginBottom: 50
  },
  small: {
    width: width * 0.8,
  },
  card2: {
    width: cardWidth2,
  },
  title: {
    fontFamily: 'Regular',
    lineHeight: 20,
    width: '100%',
    marginBottom: 24
  },
  img: {
    width: '100%',
    height: cardWidth,
    borderRadius: blocks.radius,
    borderColor: colors.grayLight,
    marginBottom: 9,
  },
  img2: {
    width: cardWidth2,
    height: cardWidth2,
  },
  small_img: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 3,
  },
  small_text: {

  },
});
