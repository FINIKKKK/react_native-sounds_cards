import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { fonts, colors, blocks } from '~constants';
import { Icon } from './Icon';

interface InputProps {
  label: string;
  onChangeText: (value: string) => void;
  icon?: string;
  value?: string;
  errors?: string[];
  type?: 'password';
  style?: any;
}

/**
 * Кастомное поле ввода ----------------
 */
export const Input: React.FC<InputProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const [showPassword, setShowPassword] = React.useState(
    props.type === 'password',
  );

  return (
    <View style={[ss.field, props.style && props.style]}>
      <View style={[ss.input_wrapper, !!props.errors?.length && ss.error]}>
        <TextInput
          style={[ss.input]}
          placeholder={props.label}
          placeholderTextColor={colors.black}
          onChangeText={props.onChangeText}
          secureTextEntry={showPassword}
          value={props.value}
        />

        {props.icon && (
          <Icon
            name={props.icon}
            color={colors.white}
            size={22}
            style={ss.icon}
          />
        )}

        {props.type === 'password' && props.value && (
          <TouchableOpacity
            style={ss.password}
            onPress={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <Icon
                name="eye"
                style={ss.password_icon}
                color={colors.blue}
                size={fonts.iconSize}
              />
            ) : (
              <Icon
                name="eye-slash"
                style={ss.password_icon}
                color={colors.blue}
                size={fonts.iconSize}
              />
            )}
          </TouchableOpacity>
        )}
      </View>

      {props.errors?.length && <Text style={ss.errors}>{props.errors[0]}</Text>}
    </View>
  );
};

/**
 * Стили ----------------
 */
const ss = StyleSheet.create({
  field: {
    marginBottom: 15,
    width: '100%',
    shadowColor: 'rgba(167, 188, 220, 0.15)',
    elevation: 5,
  },

  input_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: colors.white,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: blocks.radius,
  },

  input: {
    fontSize: fonts.size,
    flex: 1,
    height: 60,
  },

  icon: {
    backgroundColor: colors.blue,
    borderRadius: 6,
    width: 36,
    height: 36,
    textAlign: 'center',
    lineHeight: 34,
  },

  error: {
    borderColor: colors.redLight,
    borderWidth: 1,
  },

  errors: {
    color: colors.red,
    fontSize: 11,
  },

  password: {
    marginLeft: 8,
  },

  password_icon: {},
});
