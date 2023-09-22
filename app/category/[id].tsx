import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CardsLayout } from '~layouts/cards';
import { Card } from '~components/Card';
import { Stack, useSearchParams } from 'expo-router';
import { width } from '~components/Category';
import { useCustomFetch } from '~hooks/useFetch';
import { TCard } from '~types/cards';

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

  /**
   * Вычисляемое ----------------
   */
  // Проверить авторизацию
  React.useEffect(() => {
    (async () => {
      // Получаем данные пользователя
      const data = (await useFetch(`element`, {
        params: { category_id: id },
      })) as TCard[];

      if (data) {
        console.log('cards', data);
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

      <CardsLayout title="Карточки слов">
        <ScrollView contentContainerStyle={[ss.cards]}>
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
    gap: width * 0.39,
    paddingBottom: width * 3 + 10,
  },
});
