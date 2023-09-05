import React from "react";
import {Text} from "react-native";
import fonts from "../../constants/fonts";
import {Text as DefaultText} from "react-native/Libraries/Text/Text";

/**
 * Кастомный заголовок ----------------
 */
export const СTitle: React.FC<DefaultText['props']> = (props) => {
    return (
        <Text  {...props}
               style={[props.style, {
                   fontFamily: fonts.font,
                   fontSize: fonts.titleSize,
                   lineHeight: fonts.titleHeight
               }]}
        />
    );
};