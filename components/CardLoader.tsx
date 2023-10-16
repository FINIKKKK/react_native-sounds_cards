import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { width } from '~components/Category';
import { blocks, colors } from '~constants';

interface CardLoaderProps {
  type?: 'category' | 'card';
  size?: 'small' | 'large';
}

/**
 * CardLoader ----------------
 */
export const CardLoader: React.FC<CardLoaderProps> = (props) => {
  const isCard = props.type === 'card'
  const pulseAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const sharedAnimationConfig = {
      duration: 1000,
      useNativeDriver: true,
    };
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 0,
          easing: Easing.in(Easing.ease),
        }),
      ]),
    ).start();

    return () => {
      // cleanup
      pulseAnim.stopAnimation();
    };
  }, []);

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.15],
  });

  return (
    <View style={[ss.card, isCard && {marginBottom: 10}]}>
      <View style={[ss.img_wrapper, isCard ? {marginBottom: 10} : {marginBottom: 16}]}>
        <Animated.View style={[ss.img, { opacity: opacityAnim }]} />
        {props.type !== 'card' && (
          <>
            <View style={[ss.plug]} />
            <View style={[ss.border, ss.border1]} />
            <View style={[ss.border, ss.border2]} />
          </>
        )}
      </View>
      <Animated.View style={[ss.text, { opacity: opacityAnim }]} />
    </View>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  card: {
    width,
  },
  img_wrapper: {
    position: 'relative',
    width: '100%',
    height: width,
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
