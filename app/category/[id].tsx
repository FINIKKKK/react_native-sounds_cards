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
import { Header } from '~components/Header';
import { CardLoader } from '~components/CardLoader';

/**
 * Screen ----------------
 */
export default function CategoryScreen() {
  /**
   * Переменные ----------------
   */
  const { useFetch, isLoading } = useCustomFetch();
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
        <Header
          title={categoryName}
          link="/categories"
          style={{ marginBottom: 10 }}
        />

        <ScrollView
          contentContainerStyle={[ss.cards, sizeCard === 1 && ss.cards2]}
        >
          {isLoading
            ? Array(20)
                .fill(0)
                .map((_, index) => <CardLoader key={index} size={sizeCard} />)
            : cards?.map((card) => (
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
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'Bold',
    textAlign: 'center',
  },
});
