import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { colors } from '~constants';
import { Card } from './Card';
import { useSelectors } from '~hooks/useSelectors';
import { Icon } from '~components/UI';
import { useActions } from '~hooks/useActions';
import { Audio } from 'expo-av';
import { useCustomFetch } from '~hooks/useFetch';
import * as SpeechFunc from 'expo-speech';

interface PlayerProps {}

/**
 *  Player ----------------
 */
export const Player: React.FC<PlayerProps> = (props) => {
  /**
   * Переменные ----------------
   */
  const { cards, isPlaying: isReady } = useSelectors((state) => state.cards);
  const { removeCards } = useActions();
  const { lang } = useSelectors((state) => state.account);
  const { useFetch } = useCustomFetch();
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Пример использования
  const audioUrls = cards.map((card) => card?.audio[0]?.original_url);
  const [sound, setSound] = React.useState(new Audio.Sound());

  // Функция задержки
  const sleep = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  // Проигрывать список аудио
  const playCards = async () => {
    for (const url of audioUrls) {
      // Создать новый объект звука
      try {
        // Загрузить текущий аудиофайл
        await sound.loadAsync({ uri: url });
        setSound(sound);
        const status = await sound.getStatusAsync();

        // Воспроизвести аудио
        await sound.playAsync();

        // Ожидаем, пока аудио не закончится
        await sleep(status.durationMillis - 250);
      } catch (error) {
        console.error('Ошибка при воспроизведении аудио:', error);
      } finally {
        setIsPlaying(false);
        await sound.unloadAsync();
      }
    }
  };

  const togglePlayback = async () => {
    console.log('isPlaying', isPlaying);
    if (isPlaying) {
      // Остановить воспроизведение
      console.log('stop');
      setIsPlaying(false);
      if (sound) {
        await sound.stopAsync();
      }
    } else {
      console.log('start');
      // Начать воспроизведение
      setIsPlaying(true);
      await playCards();
    }
  };

  // if (lang === 'kz') {
  //   // Проигрывать карточки слов на казахчком языке
  //   // const data = await useFetch('', {
  //   //   body: { text: sentence },
  //   //   method: 'POST',
  //   // });
  //
  //   const { sound: sound1 } = await Audio.Sound.createAsync({
  //     uri: cards[0].audio[0].original_url,
  //   });
  //   await sound1.playAsync();
  //
  //   const { sound: sound2 } = await Audio.Sound.createAsync({
  //     uri: cards[1].audio[0].original_url,
  //   });
  //   await sound2.playAsync();
  // } else {
  //   await SpeechFunc.speak(sentence, {
  //     language: 'ru-RU',
  //   });
  // }

  return (
    <View style={[ss.sheet]}>
      <View style={[ss.cards_wrapper, !!cards.length && { marginBottom: -12 }]}>
        {/* Список карточек -------------- */}
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
          {/* Очистить карточки -------------- */}
          <Pressable onPress={() => removeCards()}>
            <Icon
              type="font5"
              name="backspace"
              color={colors.grayLight}
              size={35}
              style={[ss.icon, ss.icon_close]}
            />
          </Pressable>

          {/* Запустить проигрывание карточек -------------- */}
          <Pressable onPress={togglePlayback} style={isReady && {opacity: 0.5}} disabled={isReady}>
            <Icon
              type="ant"
              name={isPlaying ? 'pausecircle' : 'play'}
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
