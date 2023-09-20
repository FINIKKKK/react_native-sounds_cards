import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TextStyle } from 'react-native';
import { colors, fonts } from '~constants';
import {AntDesign, FontAwesome5, Ionicons} from '@expo/vector-icons';

interface IconProps {
  name: string;
  type?: 'ionic' | 'font5' | 'ant';
  size?: number;
  color?: string;
  style?: TextStyle | TextStyle[];
  onPress?: () => void;
}

/**
 * Иконка Fontawesome ----------------
 */
export const Icon: React.FC<IconProps> = (props) => {
  switch (props.type) {
    case 'ionic':
      return (
        <Ionicons
          name={props.name}
          size={props.size || fonts.iconSize}
          color={props.color || colors.blue}
          style={[props.style]}
        />
      );

    case 'font5':
      return (
        <FontAwesome5
          name={props.name}
          size={props.size || fonts.iconSize}
          color={props.color || colors.blue}
          style={[props.style]}
        />
      );

    case 'ant':
      return (
        <AntDesign
          name={props.name}
          size={props.size || fonts.iconSize}
          color={props.color || colors.blue}
          style={[props.style]}
        />
      );

    default:
      return (
        <FontAwesome
          name={props.name}
          size={props.size || fonts.iconSize}
          color={props.color || colors.blue}
          style={[props.style]}
        />
      );
  }
};
