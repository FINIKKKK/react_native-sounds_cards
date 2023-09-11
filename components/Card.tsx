import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ViewStyle,
  TouchableNativeFeedback,
} from 'react-native';
import { CText } from './UI';
import { blocks, colors } from '../constants';
import { useActions } from '../hooks/useActions';

interface CategoryProps {
  style?: ViewStyle;
}

/**
 *  ----------------
 */
export const Card: React.FC<CategoryProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const { addCard } = useActions();

  return (
    <TouchableNativeFeedback onPress={() => addCard({})}>
      <View style={[ss.card, props.style && props.style]}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/originals/a7/c5/be/a7c5be6a5b1b5681cb8b09f41939164b.jpg',
          }}
          style={ss.img}
        />
        <CText style={ss.title}>Готовка</CText>
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
});
