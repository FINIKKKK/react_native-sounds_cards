import React from 'react';
import { View, StyleSheet } from 'react-native';
import { blocks, colors } from '~constants';
import { Loader } from '~components/Loading/Loader';
import { cardWidth, cardWidth2 } from '~components/Card';

interface CardLoaderProps {
  size?: number;
}

/**
 * CardLoader ----------------
 */
export const CardLoader: React.FC<CardLoaderProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const width = cardWidth * 0.985
  const width2 = cardWidth2 * 0.985

  return (
    <View
      style={[
        ss.card,
        !props.size ? { width } : { width: width2 },
      ]}
    >
      <Loader
        style={[
          ss.img,
          !props.size ? { height: width } : { height: width2 },
        ]}
      />
      <Loader style={[ss.text]} />
    </View>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  card: { marginBottom: 10 },
  img: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: colors.black,
    borderRadius: blocks.radius,
    zIndex: 20,
  },
  text: {
    backgroundColor: colors.black,
    width: '100%',
    height: 20,
    borderRadius: 10,
  },
});
