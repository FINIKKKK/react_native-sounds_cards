import React from 'react';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

interface CButtonProps {
  label: string;
  styles?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  disabled?: boolean;
}

/**
 * Кастомная кнопка ----------------
 */
export const CButton: React.FC<CButtonProps> = (props) => {
  return (
    <Button
      underlayColor="#72A3E8"
      style={props.styles}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Label>{props.label}</Label>
    </Button>
  );
};

const Button = styled.TouchableHighlight`
  background-color: #000;
  font-size: 14px;
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 23px;
  border-radius: 2px;

  ${({ disabled }) => disabled && `background-color: #999;`}
`;
const Label = styled.Text`
  color: #ffffff;
`;
