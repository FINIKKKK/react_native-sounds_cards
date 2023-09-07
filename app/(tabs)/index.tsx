import {StyleSheet} from 'react-native';
import {MainLayout} from '../../layouts/main';
import React from 'react';
import {CText} from '../../components/UI';
import {useTranslate} from "../../hooks/useTranslate";
import {loginLang} from "../../lang/login";

/**
 * Вкладка первая ----------------
 */
export default function HomeTab() {
    const $t = useTranslate(loginLang);

    console.log('$t', $t?.title);
    // console.log('$t', loginLang?.ru.title);

    return (
        <MainLayout>
            <CText style={styles.title}>Tab One</CText>
            <CText>{$t?.title}</CText>
        </MainLayout>
    );
}

/**
 * Стили ----------------
 */
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
    },
});
