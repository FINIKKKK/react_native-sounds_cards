import React from "react";
import {View, StyleSheet, Image} from "react-native";
import {CText} from "./UI";
import {blocks, colors} from "../constants";

interface CategoryProps {
}

/**
 *  ----------------
 */
export const Category: React.FC<CategoryProps> = (props) => {
    return (
        <View style={[ss.category]}>
            <View style={[ss.img_wrapper]}>
                <Image source={{uri: 'https://i.pinimg.com/originals/a7/c5/be/a7c5be6a5b1b5681cb8b09f41939164b.jpg'}}
                       style={ss.img}/>
                <View style={[ss.border, ss.border1]}/>
                <View style={[ss.border, ss.border2]}/>
            </View>
            <CText style={ss.title}>Готовка</CText>
        </View>
    );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
    category: {
        marginBottom: 24,
    },
    title: {
        fontSize: 14,
        lineHeight: 28,
        textTransform: 'uppercase',
    },
    img_wrapper: {
        width: 116,
        height: 116,
        position: 'relative',
        marginBottom: 16
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: blocks.radius,
        zIndex: 10
    },
    border: {
        borderColor: colors.gray,
        borderRadius: blocks.radius,
        borderWidth: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    border1: {
        right: -4,
        bottom: -4,
    },
    border2: {
        right: -8,
        bottom: -8,
    }
});