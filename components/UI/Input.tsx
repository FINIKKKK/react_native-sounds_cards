import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {fonts, colors, blocks} from '../../constants';
import {Icon} from './Icon';

interface InputProps {
    label: string;
    onChangeText: (value: string) => void;
    icon?: string
    value?: string;
    errors?: string[];
    type?: 'password';
    style?: any
}

/**
 * Кастомное поле ввода ----------------
 */
export const Input: React.FC<InputProps> = (props) => {
    const [showPassword, setShowPassword] = React.useState(
        props.type === 'password',
    );

    return (
        <View style={[ss.field, props.style && props.style]}>
            <View style={[ss.input_wrapper]}>
                <TextInput
                    style={[ss.input]}
                    placeholder={props.label}
                    placeholderTextColor={colors.black}
                    onChangeText={props.onChangeText}
                    secureTextEntry={showPassword}
                />

                {props.icon &&
                    <Icon name={props.icon} color={colors.white} size={24} style={ss.icon}/>
                }

                {props.type === 'password' && (
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
        marginBottom: 23,
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: blocks.radius
    },

    input_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },

    input: {
        fontSize: fonts.size,
        flex: 1,
    },

    icon: {
        backgroundColor: colors.blue,
        borderRadius: 6,
        padding: 6,
    },

    error: {},

    errors: {
        color: colors.red,
        fontSize: 11,
        position: 'absolute',
        bottom: -15,
    },

    password: {
        marginLeft: 8,
    },

    password_icon: {},
});
