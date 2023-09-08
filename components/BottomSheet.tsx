import React from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Animated,
    Easing,
    TouchableNativeFeedback
} from "react-native";
import {CText, Icon} from "./UI";
import {blocks, colors} from "../constants";
import {Card} from "./Card";

interface BottomSheetProps {
}

/**
 *  BottomSheet ----------------
 */
export const BottomSheet: React.FC<BottomSheetProps> = (props) => {
    /**
     * Переменные ----------------
     */
    const [isOpen, setIsOpen] = React.useState(false);
    const [animatedValue] = React.useState(new Animated.Value(0));

    /**
     * Методы ----------------
     */
    const toggleOpen = () => {
        setIsOpen(!isOpen);

        Animated.timing(animatedValue, {
            toValue: isOpen ? 0 : 1,
            duration: 250,
            easing: Easing.exp,
            useNativeDriver: false,
        }).start();
    };

    // Настройки для анимации
    const bottomInterpolate = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-175, 0],
    });
    const animatedStyle = {
        bottom: bottomInterpolate,
    };

    return (
        <Animated.View style={[ss.sheet, animatedStyle]}>
            <TouchableNativeFeedback onPress={toggleOpen}>
                <View style={[ss.header]}>
                    <View style={[ss.title]}>
                        <CText style={[ss.text]}>Панель разговора</CText>
                        <CText style={[ss.span]}>3</CText>
                    </View>

                    <Icon name='sort-up' color={colors.blue} size={28} style={[{marginBottom: -12}]}/>
                </View>
            </TouchableNativeFeedback>

            <View style={[ss.cards_wrapper]}>
                <ScrollView contentContainerStyle={[ss.cards]} horizontal>
                    {Array(5).fill(0).map((_, index) => (
                            <Card key={index} style={{marginRight: 8}}/>
                        )
                    )}
                </ScrollView>
                <View style={[ss.controls]}>
                    <View style={[ss.control, ss.close]}>
                        <Icon name='close' color={colors.white} size={25} style={[ss.icon, ss.icon_close]}/>
                    </View>

                    <View style={[ss.control, ss.play]}>
                        <Icon name='play' color={colors.white} size={28} style={[ss.icon, ss.icon_play]}/>
                    </View>
                </View>
            </View>
        </Animated.View>
    );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
    sheet: {
        position: 'absolute',
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
        borderTopRightRadius: blocks.radius,
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
        lineHeight: 22
    },
    cards_wrapper: {
        backgroundColor: colors.white,
        padding: 20,
        flexDirection: 'row'
    },
    cards: {
        marginRight: 20
    },
    controls: {
        paddingLeft: 20,
    },
    control: {
        width: 50,
        height: 50,
    },
    icon: {
        textAlign: 'center',
        lineHeight: 50
    },
    close: {
        backgroundColor: colors.grayLight,
        height: 30,
        lineHeight: 30,
        marginBottom: 20,
    },
    play: {
        backgroundColor: colors.blue,
        borderRadius: 50,
    },
    icon_close: {
        lineHeight: 30,
    },
    icon_play: {
        marginLeft: 3
    },
});