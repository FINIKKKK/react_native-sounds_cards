import React from "react";
import {View, StyleSheet, ScrollView} from "react-native";
import {CText, Icon} from "./UI";
import {blocks, colors} from "../constants";
import {Category} from "./Category";
import {Card} from "./Card";

interface BottomSheetProps {
}

/**
 *  ----------------
 */
export const BottomSheet: React.FC<BottomSheetProps> = (props) => {
    return (
        <View style={[ss.sheet]}>
            <View style={[ss.header]}>
                <View style={[ss.title]}>
                    <CText style={[ss.text]}>Панель разговора</CText>
                    <CText style={[ss.span]}>3</CText>
                </View>

                <Icon name='sort-up' color={colors.blue} size={28} style={{marginBottom: -12}}/>
            </View>

            <View style={[ss.cards_wrapper]}>
                <ScrollView contentContainerStyle={[ss.cards]} horizontal>
                    {Array(5).fill(0).map((_, index) => (
                            <Card key={index} style={{marginRight: 8}}/>
                        )
                    )}
                </ScrollView>
                <View style={[ss.controls]}>
                    <Icon name='close' color={colors.blue} size={28} style={{marginBottom: -12}}/>
                    <Icon name='play' color={colors.blue} size={28} style={{marginBottom: -12}}/>
                </View>
            </View>
        </View>
    );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
    sheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        flex: 1,
    },
    header: {
        backgroundColor: colors.grayDark,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flex: 1,
        padding: 20,
        borderTopLeftRadius: blocks.radius,
        borderTopRightRadius: blocks.radius
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        fontFamily: 'Regular'
    },
    text: {
        marginRight: 8
    },
    span: {
        fontSize: 13,
        backgroundColor: colors.blue,
        borderRadius: 50,
        color: colors.white,
        width: 21,
        height: 21,
        textAlign: 'center',
    },
    cards_wrapper: {
        backgroundColor: colors.white,
        padding: 20,
        flexDirection: 'row'
    },
    cards: {
        marginRight: 20
    },
    controls: {},
});