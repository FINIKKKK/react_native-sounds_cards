import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { CText } from '~components/UI/Text';
import { colors } from '~constants';

export interface WarningProps {
  message: string;
  duration?: number;
}

/**
 * Warning ----------------
 */
export const Warning: React.FC<WarningProps> = ({
  message,
  duration = 3000,
}) => {
  const top = new Animated.Value(-150);

  /**
   * Методы ----------------
   */
  // Показать сообщение
  const showMessageWithAnimation = () => {
    Animated.timing(top, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      hideMessageWithAnimation();
    }, duration);
  };

  // Убрать сообщение
  const hideMessageWithAnimation = () => {
    Animated.timing(top, {
      toValue: -150,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  // Запустить анимации
  React.useEffect(() => {
    if (message) {
      showMessageWithAnimation();
    }
  }, [message]);

  return (
    <Animated.View style={[ss.wrapper, { top }]}>
      <View style={[ss.container]}>
        <CText style={[ss.text]}>{message}</CText>
      </View>
    </Animated.View>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#F9CBCB',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  text: {
    fontSize: 14,
    color: colors.redLight,
  },
});
