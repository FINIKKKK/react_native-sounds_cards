import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  Pressable,
} from 'react-native';
import { colors } from '~constants';
import { Card } from './Card';
import { useSelectors } from '~hooks/useSelectors';
import { Icon } from '~components/UI';
import { useActions } from '~hooks/useActions';
import * as SpeechFunc from 'expo-speech';

interface PlayerProps {}

/**
 *  Player ----------------
 */
export const Player: React.FC<PlayerProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const { cards } = useSelectors((state) => state.cards);
  const { removeCards } = useActions();
  const { sentence } = useSelectors((state) => state.cards);
  const [isReady, setIsReady] = React.useState(false);
  const { lang } = useSelectors((state) => state.user);

  /**
   * Методы ----------------
   */
  // Проигрывать карточки слов
  const playCards = async () => {
    const isPlay = await SpeechFunc.isSpeakingAsync();
    // setIsReady(!isReady);

    if (isPlay) {
      // setIsReady(false);
      await SpeechFunc.stop();
    } else {
      // setIsReady(true);
      await SpeechFunc.speak(sentence, {
        language: lang === 'ru' ? 'ru-RU' : 'kk-KZ',
      });
      // setIsReady(false);
    }
  };

  return (
    <View style={[ss.sheet]}>
      <View style={[ss.cards_wrapper, !!cards.length && { marginBottom: -12 }]}>
        <ScrollView contentContainerStyle={[ss.cards]} horizontal>
          {cards.map((card, index) => (
            <Card
              key={`${index}`}
              style={{ marginRight: 8 }}
              data={card}
              type="small"
            />
          ))}
        </ScrollView>
        <View style={[ss.controls]}>
          <Pressable onPress={() => removeCards()}>
            <Icon
              type="font5"
              name="backspace"
              color={colors.grayLight}
              size={35}
              style={[ss.icon, ss.icon_close]}
            />
          </Pressable>

          <Pressable onPress={() => playCards()}>
            <Icon
              type="ant"
              name={isReady ? 'pausecircle' : 'play'}
              color={colors.blue}
              size={44}
              style={[ss.icon, ss.icon_play]}
            />
          </Pressable>
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
    width: '100%',
    borderBottomColor: colors.grayLight,
    borderBottomWidth: 3,
    paddingHorizontal: 16,
  },
  cards_wrapper: {
    paddingVertical: 20,
    flexDirection: 'row',
    zIndex: 10,
  },
  cards: {
    marginRight: 20,
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
    lineHeight: 60,
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
    lineHeight: 35,
    marginBottom: 3,
  },
  icon_play: {
    marginLeft: 3,
  },
});