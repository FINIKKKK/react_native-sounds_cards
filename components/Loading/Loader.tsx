import React from 'react';
import { Animated, Easing } from 'react-native';
import {ViewStyle} from "~node_modules/react-native";

interface CardLoaderProps {
  style?: ViewStyle | ViewStyle[];
}

/**
 * Loader ----------------
 */
export const Loader: React.FC<CardLoaderProps> = (props) => {
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

  return <Animated.View style={[props.style, { opacity: opacityAnim }]} />;
};
