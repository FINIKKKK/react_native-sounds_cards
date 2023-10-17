import React from 'react';
import { View, StyleSheet } from 'react-native';
import { blocks, colors } from '~constants';
import { Loader } from '~components/Loading/Loader';
import { width, width2 } from '~components/Category';

interface CardLoaderProps {
  size?: number;
}

/**
 * CategoryLoader ----------------
 */
export const CategoryLoader: React.FC<CardLoaderProps> = (props) => {
  return (
    <View style={[ss.card, !props.size ? { width } : { width: width2 }]}>
      <View
        style={[
          ss.img_wrapper,
          !props.size ? { height: width } : { height: width2 },
        ]}
      >
        <Loader style={[ss.img]} />
        <View style={[ss.plug]} />
        <View style={[ss.border, ss.border1]} />
        <View style={[ss.border, ss.border2]} />
      </View>
      <Loader style={[ss.text]} />
    </View>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  card: {},
  img_wrapper: {
    position: 'relative',
    width: '100%',
    marginBottom: 16,
  },
  plug: {
    backgroundColor: colors.bg,
    borderRadius: blocks.radius,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  img: {
    backgroundColor: colors.black,
    borderRadius: blocks.radius,
    width: '100%',
    height: '100%',
    zIndex: 20,
  },
  text: {
    backgroundColor: colors.black,
    width: '100%',
    height: 20,
    borderRadius: 10,
  },
  border: {
    borderColor: colors.grayLight,
    borderRadius: blocks.radius,
    borderWidth: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -20,
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
