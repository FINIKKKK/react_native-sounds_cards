import {ScrollView, StyleSheet, View} from 'react-native';
import {MainLayout} from '../../layouts/main';
import React from 'react';
import {CText, Icon, Input, Title} from '../../components/UI';
import {colors} from "../../constants";
import {Category} from "../../components/Category";
import {BottomSheet} from "../../components/BottomSheet";

/**
 * Вкладка первая ----------------
 */
export default function HomeTab() {
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <MainLayout>
            <View style={[ss.header]}>
                <Title style={[ss.title]}>Привет, Александр!</Title>
                <Icon name='cog' color={colors.black} size={22} style={{lineHeight: 40}}/>
            </View>

            <Input label="Найдите слова или категории" onChangeText={(text) => setSearchValue(text)} icon="search"
                   style={{marginBottom: 48}}/>

            <View style={[ss.cards_block]}>
                <CText style={[ss.cards_title]}>Готовые наборы слов</CText>
                <ScrollView contentContainerStyle={[ss.cards]}>
                    {Array(24).fill(0).map((_, index) => (
                            <Category key={index}/>
                        )
                    )}
                </ScrollView>
            </View>

            <BottomSheet />
        </MainLayout>
    );
}

/**
 * Стили ----------------
 */
const ss = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginBottom: 24
    },
    title: {
        fontSize: 32,
        lineHeight: 28,
    },
    cards_title: {
        textTransform: 'uppercase',
        marginBottom: 20,
    },
    cards_block: {},
    cards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: "wrap"
    }
});
