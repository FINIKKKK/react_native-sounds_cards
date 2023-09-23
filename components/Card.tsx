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
import { width } from '~components/Category';

interface CategoryProps {
  data: TCard;
  style?: ViewStyle;
  type?: 'small';
}

const cardWidth = width * 0.9;

/**
 * Card ----------------
 */
export const Card: React.FC<CategoryProps> = ({ data, style, type }) => {
  /**
   * Переменные ----------------
   */
  const { addCard } = useActions();
  const { lang } = useSelectors((state) => state.user);
  const name = data?.name[lang === 'ru' ? 0 : 1][lang];

  return (
    <TouchableNativeFeedback onPress={() => addCard({ data, name })}>
      <View style={[ss.card, style && style, type === 'small' && ss.small]}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/a7/c5/be/a7c5be6a5b1b5681cb8b09f41939164b.jpg',
          }}
          style={[ss.img, type === 'small' && ss.small_img]}
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
  card: {
    width: cardWidth,
  },
  small: {
    width: cardWidth * 0.8,
  },
  title: {
    fontFamily: 'Regular',
    textAlign: 'center',
    lineHeight: 20,
    width: '100%',
  },
  img: {
    width: '100%',
    height: cardWidth,
    borderRadius: blocks.radius,
    borderColor: colors.grayLight,
    marginBottom: 9,
  },
  small_img: {
    height: 80,
    marginBottom: 3,
  },
  small_text: {
    // width: 80,
  },
});
