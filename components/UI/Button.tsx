import React from 'react';
import {
  StyleSheet,
  Text,
  ViewStyle,
  Image,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { blocks, colors, fonts } from '~constants';
import {Icon, iconTypes} from '~components/UI/Icon';

interface CButtonProps {
  label: string;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  disabled?: boolean;
  type?: 'google';
  iconName?: string;
  iconType?: iconTypes;
}

/**
 * Кастомная кнопка ----------------
 */
export const Btn: React.FC<CButtonProps> = (props) => {
  const isGoogle = props.type === 'google';

  return (
    <TouchableOpacity
      style={[
        ss.btn,
        props.style,
        props.disabled && ss.disabled,
        isGoogle && ss.btn_icon,
      ]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      {isGoogle && (
        <Image style={[ss.icon]} source={require('~assets/img/google.png')} />
      )}
      {props.iconName && <Icon name={props.iconName} type={props.iconType} color={colors.white} style={{marginRight: 15}} />}
      <Text style={[ss.label, isGoogle && ss.icon_label]}>{props.label}</Text>
    </TouchableOpacity>
  );
};

/**
 * Стили ----------------
 */
const ss = StyleSheet.create({
  btn: {
    backgroundColor: colors.blue,
    fontSize: fonts.size,
    lineHeight: fonts.lh,
    paddingHorizontal: 25,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: blocks.radius,
    width: '100%',
    height: 60,
  },

  disabled: {
    backgroundColor: colors.grayLight,
  },

  label: {
    color: colors.white,
  },

  icon: {
    width: 32,
    height: 32,
    marginRight: 15,
  },

  btn_icon: {
    backgroundColor: colors.white,
    borderColor: '#E8E8E8',
    borderWidth: 1,
  },

  icon_label: {
    color: colors.black,
  },
});
