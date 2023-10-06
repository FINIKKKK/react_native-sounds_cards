import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { CText, Icon } from '~components/UI';
import { MainLayout } from '~layouts/main';
import { blocks, colors } from '~constants';
import { useSelectors } from '~hooks/useSelectors';

/**
 * SettingsScreen ----------------
 */
export default function SettingsScreen() {
  /**
   * Переменные ----------------
   */
  const { lang } = useSelectors((state) => state.user);

  return (
    <MainLayout>
      <View style={[ss.header]}>
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
        <CText style={[ss.header_text]}>Настройки</CText>
      </View>

      <View style={[ss.container]}>
        {/* ------- Размер карточек ------- */}
        <View style={[ss.block]}>
          <CText style={[ss.title]}>Размер карточек</CText>

          <CText style={[ss.text]}>
            Передвигайте ползунок для изменения размера карточек
          </CText>
        </View>

        {/* ------- Размер текста ------- */}
        <View style={[ss.block]}>
          <CText style={[ss.title]}>Размер текста</CText>

          <View style={[ss.cards]}>
            <View style={[ss.card, ss.card_size]}>
              <CText style={[ss.card_text, ss.size_text]}>a</CText>
            </View>
            <View style={[ss.card, ss.card_size]}>
              <CText style={[ss.card_text, ss.size_text, ss.size_text_m]}>
                a
              </CText>
            </View>
            <View style={[ss.card, ss.card_size, ss.active]}>
              <CText style={[ss.card_text, ss.size_text, ss.size_text_l]}>
                a
              </CText>
            </View>
          </View>

          <CText style={[ss.text]}>
            Названия карточек будут иметь такой размер
          </CText>
        </View>

        {/* ------- Язык ------- */}
        <View style={[ss.block]}>
          <CText style={[ss.title]}>Выберите язык</CText>

          <View style={[ss.cards]}>
            <View style={[ss.card, lang === 'kz' && ss.active]}>
              <CText style={[ss.card_text]}>Казахский</CText>
            </View>
            <View style={[ss.card, lang === 'ru' && ss.active]}>
              <CText style={[ss.card_text]}>Русский</CText>
            </View>
          </View>

          <CText style={[ss.text]}>Интерфей будет на этом языке</CText>
        </View>
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
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 10,
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
  card_size: {
    width: (Dimensions.get('window').width - 40 - 16) / 3,
  },
  size_text: {
    fontFamily: 'Bold',
    textTransform: 'uppercase',
  },
  size_text_m: {
    fontSize: 26,
    lineHeight: 40
  },
  size_text_l: {
    fontSize: 36,
    lineHeight: 54
  },
});
