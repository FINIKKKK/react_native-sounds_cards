import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CardsLayout } from '~layouts/cards';
import { Card } from '~components/Card';
import { Link, Stack, useSearchParams } from 'expo-router';
import { width, width2 } from '~components/Category';
import { useCustomFetch } from '~hooks/useFetch';
import { TCard } from '~types/cards';
import { CText, Icon } from '~components/UI';
import { useSelectors } from '~hooks/useSelectors';
import { colors } from '~constants';
import { CategoriesLang } from '~lang/categories';
import { useTranslate } from '~hooks/useTranslate';

/**
 * Screen ----------------
 */
export default function CategoryScreen() {
  /**
   * Переменные ----------------
   */
  const { useFetch } = useCustomFetch();
  const [cards, setCards] = React.useState<TCard[]>([]);
  const { id } = useSearchParams();
  const { categoryName } = useSelectors((state) => state.cards);
  const { sizeCard } = useSelectors((state) => state.account);
  const $t = useTranslate(CategoriesLang);

  /**
   * Вычисляемое ----------------
   */
  // Проверить авторизацию
  React.useEffect(() => {
    (async () => {
      // Получаем данные пользователя
      const data = (await useFetch(`element`, {
        query: { category_id: id },
      })) as TCard[];

      if (data) {
        // Сохраняем в хранилище данные пользователя
        setCards(data);
      }
    })();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Category #${id}`,
        }}
      />

      <CardsLayout>
        <View style={[ss.header]}>
          <Link href="/categories" style={[ss.back_wrapper]}>
            <View style={[ss.back]}>
              <Icon
                name="chevron-back-sharp"
                type="ionic"
                color={colors.black}
                size={30}
                style={ss.back_icon}
              />
              <CText style={[ss.back_text]}>{$t?.back}</CText>
            </View>
          </Link>

          <CText style={[ss.title]}>{categoryName}</CText>
        </View>

        <ScrollView
          contentContainerStyle={[ss.cards, sizeCard === 1 && ss.cards2]}
        >
          {!!cards.length &&
            cards?.map((card) => (
              <Card key={card.id} data={card} style={{ marginBottom: -20 }} />
            ))}
        </ScrollView>
      </CardsLayout>
    </>
  );
}

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: width * 0.09,
    paddingBottom: width * 3 + 10,
  },
  cards2: {
    gap: width2 * 0.07,
    paddingBottom: width2 * 3 + 10,
  },
  header: {
    position: 'relative',
    marginBottom: 10,
    marginTop: 32
  },
  back_wrapper: {
    position: 'absolute',
    top: 0,
    left: -5,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 30,
  },
  back_icon: {},
  back_text: {},
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'Bold',
    textAlign: 'center',
  },
});
