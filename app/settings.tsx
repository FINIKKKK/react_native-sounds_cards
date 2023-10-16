import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { CText, Icon } from '~components/UI';
import { MainLayout } from '~layouts/main';
import { blocks, colors } from '~constants';
import { Link } from 'expo-router';
import { SizeText } from '~components/SettingsScreen/SizeText';
import { Range } from '~components/SettingsScreen/Range';
import { Langs } from '~components/SettingsScreen/Langs';
import { useTranslate } from '~hooks/useTranslate';
import { SettingsLang } from '~lang/settings';

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
      <View style={[ss.header]}>
        <Link href="/categories" style={[ss.back_wrapper]}>
          <View style={[ss.back]}>
            <Icon
              name="chevron-back-sharp"
              type="ionic"
              color={colors.black}
              size={30}
              style={[ss.back_icon]}
            />
            <CText style={[ss.back_text]}>{$t?.back}</CText>
          </View>
        </Link>
        <CText style={[ss.header_text]}>{$t?.title}</CText>
      </View>

      <View style={[ss.container]}>
        {/* ------- Размер карточек ------- */}
        <Range />

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
  header: {
    position: 'relative',
    marginBottom: 40,
    marginTop: 48,
  },
  back_wrapper: {
    position: 'absolute',
    top: 0,
    left: 10,
    zIndex: 10,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back_icon: {},
  back_text: {},
  header_text: {
    fontFamily: 'Bold',
    fontSize: 32,
    lineHeight: 42,
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 20,
  },
  card_wrapper: {},
});
