import React from "react";
import {Text} from "react-native";
import {TextProps} from "../Themed";

interface СTextProps {
    style?: TextProps
}

export const СText: React.FC<СTextProps> = (props) => {
    return (
        <Text  {...props} style={[props.style, {fontFamily: 'Circe', fontSize: 16}]}/>
    );
};