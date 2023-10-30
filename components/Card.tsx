import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ViewStyle,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import { CText } from './UI';
import { blocks, colors } from '~constants';
import { useActions } from '~hooks/useActions';
import { TCard } from '~types/cards';
import { useSelectors } from '~hooks/useSelectors';
import { width, width2 } from '~components/Category';

interface CategoryProps {
  data: TCard;
  style?: ViewStyle;
  type?: 'small';
}

// Ширина элемента
export const cardWidth = width * 1.084;
export const cardWidth2 = width2 * 1.05;

/**
 * Card ----------------
 */
export const Card: React.FC<CategoryProps> = ({ data, style, type }) => {
  /**
   * Переменные ----------------
   */
  const { addCard } = useActions();
  const { lang, sizeCard } = useSelectors((state) => state.account);
  const name = data?.name[0]?.[lang] || '';
  const uri = data?.image?.original_url || 'https://i.pinimg.com/originals/a7/c5/be/a7c5be6a5b1b5681cb8b09f41939164b.jpg'

  return (
    <TouchableOpacity
      onPress={() => addCard({ data, name })}
      style={[ss.wrapper, style]}
    >
      <View
        style={[
          ss.card,
          !type && !sizeCard ? { width: cardWidth } : { width: cardWidth2 },
          type === 'small' && { width: width * 0.8 },
        ]}
      >
        <Image
          source={{
            uri,
          }}
          style={[
            ss.img,
            !type && !sizeCard ? { height: cardWidth } : { height: cardWidth2 },
            type === 'small' && { height: width * 0.8 },
          ]}
        />
        <CText style={[ss.title, type === 'small' && ss.small_text]}>
          {name}
        </CText>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  wrapper: {},
  card: {},
  title: {
    fontFamily: 'Regular',
    lineHeight: 20,
    width: '100%',
    marginBottom: 24,
  },
  img: {
    width: '100%',
    borderRadius: blocks.radius,
    borderColor: colors.grayLight,
    marginBottom: 9,
  },
  small_img: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 3,
  },
  small_text: {},
});
