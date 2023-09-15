import React from 'react';
import { Text } from 'react-native';
import { Text as DefaultText } from 'react-native/Libraries/Text/Text';
import { fonts } from '../../constants';

/**
 * Кастомный заголовок ----------------
 */
export const Title: React.FC<DefaultText['props']> = (props) => {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: 'Regular',
          fontSize: fonts.titleSize,
          lineHeight: fonts.titleHeight,
        },
        props.style,
      ]}
    />
  );
};
