import React from "react";
import {Text} from "react-native";
import {TextProps} from "../Themed";
import fonts from "../../constants/fonts";

interface СTextProps {
    style?: TextProps
}

export const СText: React.FC<СTextProps> = (props) => {
    return (
        <Text  {...props} style={[props.style, {fontFamily: fonts.font, fontSize: fonts.size, lineHeight: fonts.lh}]}/>
    );
};