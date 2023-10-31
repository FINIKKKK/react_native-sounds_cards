import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { CText } from './UI';
import { blocks, colors } from '~constants';
import { useActions } from '~hooks/useActions';
import { TCard } from '~types/cards';
import { useSelectors } from '~hooks/useSelectors';
import { width, width2 } from '~components/Category';
import { Audio } from '~node_modules/expo-av';

interface CategoryProps {
  data: TCard;
  style?: ViewStyle;
  type?: 'small';
}

// Ширина элемента
export const cardWidth = width * 1.084;
export const cardWidth2 = width2 * 1.05;

/**
 * Card ----------------
 */
export const Card: React.FC<CategoryProps> = ({ data, style, type }) => {
  /**
   * Переменные ----------------
   */
  const { addCard, setIsPlaying } = useActions();
  const { lang, sizeCard } = useSelectors((state) => state.account);
  const name = data?.name[0]?.[lang] || '';
  const uri =
    data?.image?.original_url ||
    'https://i.pinimg.com/originals/a7/c5/be/a7c5be6a5b1b5681cb8b09f41939164b.jpg';

  /**
   * Методы ----------------
   */
  // Обработчик клика на карточку
  const handleClickCard = async () => {
    if (type === 'small') {
      setIsPlaying(true)
      const sound = new Audio.Sound();
      await sound.loadAsync({ uri: data?.audio[0].original_url });
      const status = await sound.getStatusAsync();
      // Воспроизвести аудио
      await sound.playAsync();
      setIsPlaying(false)
    } else {
      addCard({ data, name });
    }
  };

  return (
    <TouchableOpacity onPress={handleClickCard} style={[ss.wrapper, style]}>
      <View
        style={[
          ss.card,
          !type && !sizeCard ? { width: cardWidth } : { width: cardWidth2 },
          type === 'small' && { width: width * 0.8 },
        ]}
      >
        <Image
          source={{
            uri,
          }}
          style={[
            ss.img,
            !type && !sizeCard ? { height: cardWidth } : { height: cardWidth2 },
            type === 'small' && { height: width * 0.8 },
          ]}
        />
        <CText style={[ss.title, type === 'small' && ss.small_text]}>
          {name}
        </CText>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  wrapper: {},
  card: {},
  title: {
    fontFamily: 'Regular',
    lineHeight: 20,
    width: '100%',
    marginBottom: 24,
  },
  img: {
    width: '100%',
    borderRadius: blocks.radius,
    borderColor: colors.grayLight,
    marginBottom: 9,
  },
  small_img: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 3,
  },
  small_text: {},
});
