import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MainLayout } from '~layouts/main';
import { SizeText } from '~components/SettingsScreen/SizeText';
import { SizeCard } from '~components/SettingsScreen/SizeCard';
import { Langs } from '~components/SettingsScreen/Langs';
import { useTranslate } from '~hooks/useTranslate';
import { SettingsLang } from '~lang/settings';
import { Header } from '~components/Header';

/**
 * SettingsScreen ----------------
 */
export default function SettingsScreen() {
  /**
   * Переменные ----------------
   */
  const $t = useTranslate(SettingsLang);

  return (
    <MainLayout>
      <View style={{ paddingHorizontal: 15 }}>
        <Header title={$t?.title} link="/categories" />
      </View>

      <View style={[ss.container]}>
        {/* ------- Размер карточек ------- */}
        <SizeCard />

        {/* ------- Размер текста ------- */}
        <SizeText />

        {/* ------- Язык ------- */}
        <Langs />
      </View>
    </MainLayout>
  );
}

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  card_wrapper: {},
});
