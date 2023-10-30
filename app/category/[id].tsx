import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CardsLayout } from '~layouts/cards';
import { Card } from '~components/Card';
import { Stack, useSearchParams } from 'expo-router';
import { width, width2 } from '~components/Category';
import { useCustomFetch } from '~hooks/useFetch';
import { TCard } from '~types/cards';
import { useSelectors } from '~hooks/useSelectors';
import { Header } from '~components/Header';
import { CardLoader } from '~components/CardLoader';

/**
 * CategoryScreen ----------------
 */
export default function CategoryScreen() {
  /**
   * Переменные ----------------
   */
  const { useFetch, isLoading } = useCustomFetch();
  const [cards, setCards] = React.useState<TCard[]>([]);
  const { id } = useSearchParams();
  const { category } = useSelectors((state) => state.add);
  const { sizeCard } = useSelectors((state) => state.account);
  const [page, setPage] = React.useState(1);
  const [isEnd, setIsEnd] = React.useState(false);
  const limit = 20;

  /**
   * Вычисляемое ----------------
   */
  // Получаем карточки
  React.useEffect(() => {
    (async () => {
      // Получаем карточки
      const data = (await useFetch(`element`, {
        query: { category_id: id },
      })) as TCard[];

      if (data) {
        setCards(data);
        setPage(2);
        console.log(data);
      }
    })();
  }, []);

  /**
   * Методы ----------------
   */
  // Получить карточки
  const getCards = async () => {
    if (!isEnd) {
      const newCards = (await useFetch(`element`, {
        query: {
          category_id: id,
          limit,
          page,
        },
      })) as TCard[];

      if (newCards?.length < limit) {
        setIsEnd(true);
      }
      setCards([...cards, ...newCards]);
      setPage(page + 1);
    }
  };

  // Обработчик скролла
  const handleScroll = async (e: any) => {
    const yOffset = e.nativeEvent.contentOffset.y;
    const contentHeight = e.nativeEvent.contentSize.height;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;

    if (yOffset + scrollViewHeight >= contentHeight - 20) {
      await getCards();
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Category #${id}`,
        }}
      />

      <CardsLayout>
        <Header
          title={category?.name}
          link="/categories"
          style={{ marginBottom: 10 }}
        />

        <ScrollView
          contentContainerStyle={[ss.cards, sizeCard === 1 && ss.cards2]}
          onScroll={handleScroll}
          scrollEventThrottle={400}
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
    paddingTop: 5,
  },
  cards2: {
    gap: width2 * 0.07,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'Bold',
    textAlign: 'center',
  },
});
