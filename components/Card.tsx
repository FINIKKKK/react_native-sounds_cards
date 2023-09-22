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

interface CategoryProps {
  data: TCard;
  style?: ViewStyle;
  type?: 'small'
}

/**
 *  ----------------
 */
export const Card: React.FC<CategoryProps> = ({ data, style , type}) => {
  /**
   * Переменные ----------------
   */
  const { addCard } = useActions();

  return (
    <TouchableNativeFeedback onPress={() => addCard(data)}>
      <View style={[ss.card, style && style]}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/a7/c5/be/a7c5be6a5b1b5681cb8b09f41939164b.jpg',
          }}
          style={[ss.img, type === 'small' && ss.small]}
        />
        <CText style={ss.title}>{data?.name}</CText>
      </View>
    </TouchableNativeFeedback>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  card: {},
  title: {
    fontFamily: 'Regular',
    textAlign: 'center',
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: blocks.radius,
    borderColor: colors.grayLight,
    marginBottom: 9,
  },
  small: {
    width: 80,
    height: 80,
    marginBottom: 3,
  }
});
