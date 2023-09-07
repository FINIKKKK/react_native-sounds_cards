import {StyleSheet} from 'react-native';
import {MainLayout} from '../../layouts/main';
import React from 'react';
import {CText} from '../../components/UI';

/**
 * Вкладка первая ----------------
 */
export default function HomeTab() {
    return (
        <MainLayout>
            <CText style={styles.title}>Tab One</CText>
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
