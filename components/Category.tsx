import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { blocks, colors } from '~constants';
import { Link } from 'expo-router';
import { TCategory } from '~types/category';
import { useSelectors } from '~hooks/useSelectors';
import { useActions } from '~hooks/useActions';
import { CText } from '~components/UI';

interface CategoryProps {
  data?: TCategory;
}

// Ширина элемента
export const width = (Dimensions.get('window').width - 80) / 3;
export const width2 = (Dimensions.get('window').width - 62) / 2;

/**
 *  Category ----------------
 */
export const Category: React.FC<CategoryProps> = ({ data }) => {
  /**
   * Переменные ----------------
   */
  const { lang, sizeCard } = useSelectors((state) => state.account);
  const { setCategoryName } = useActions();
  const name = data?.name[0]?.[lang];
  const isLarge = sizeCard === 1

  return (
    <Link
      href={`/category/${data?.id}`}
      style={[ss.wrapper]}
      onPress={() => setCategoryName(name)}
    >
      <View style={[ss.category, isLarge && ss.category2]}>
        <View style={[ss.img_wrapper, isLarge && ss.img_wrapper2]}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/originals/a7/c5/be/a7c5be6a5b1b5681cb8b09f41939164b.jpg',
            }}
            style={ss.img}
          />
          <View style={[ss.border, ss.border1]} />
          <View style={[ss.border, ss.border2]} />
        </View>
        <CText style={[ss.title]}>{name}</CText>
      </View>
    </Link>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  wrapper: {
    // marginBottom: 24,
  },
  category: {
    flexDirection: 'column',
    width: width,
  },
  category2: {
    width: width2,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    textTransform: 'uppercase',
    fontFamily: 'Bold',
    width: '100%',
  },
  img_wrapper: {
    position: 'relative',
    width: '100%',
    height: width,
    marginBottom: 16,
    marginRight: 8,
  },
  img_wrapper2: {
    height: width2,
  },
  img: {
    borderRadius: blocks.radius,
    width: '100%',
    height: '100%',
    zIndex: 10
  },
  border: {
    borderColor: colors.grayLight,
    borderRadius: blocks.radius,
    borderWidth: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  border1: {
    right: -4,
    bottom: -4,
  },
  border2: {
    right: -8,
    bottom: -8,
  },
});
