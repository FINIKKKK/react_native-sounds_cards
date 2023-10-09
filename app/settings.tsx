import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { CText, Icon } from '~components/UI';
import { MainLayout } from '~layouts/main';
import { blocks, colors } from '~constants';
import { Link } from 'expo-router';
import { SizeText } from '~components/SettingsScreen/SizeText';
import { Range } from '~components/SettingsScreen/Range';
import { Langs } from '~components/SettingsScreen/Langs';

/**
 * SettingsScreen ----------------
 */
export default function SettingsScreen() {
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
            <CText style={[ss.back_text]}>Назад</CText>
          </View>
        </Link>
        <CText style={[ss.header_text]}>Настройки</CText>
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

/**
 * Styles Settings ----------------
 */
export const ssSettings = StyleSheet.create({
  block: {
    marginBottom: 48,
  },
  title: {
    fontFamily: 'Bold',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: 16,
  },
  cards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    height: 72,
    width: (Dimensions.get('window').width - 40 - 8) / 2,
    borderRadius: blocks.radius,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  active: {
    borderWidth: 2,
    borderColor: colors.blue,
  },
  card_text: {
    fontSize: 18,
  },
});
