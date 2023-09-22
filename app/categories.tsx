import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Category, width } from '~components/Category';
import { CardsLayout } from '~layouts/cards';
import { useCustomFetch } from '~hooks/useFetch';
import { TCategory } from '~types/category';

/**
 * HomeScreen ----------------
 */
export default function HomeScreen() {
  /**
   * Переменные ----------------
   */
  const { useFetch } = useCustomFetch();
  const [categories, setCategories] = React.useState<TCategory[]>([]);

  /**
   * Вычисляемое ----------------
   */
  // Проверить авторизацию
  React.useEffect(() => {
    (async () => {
      // Получаем данные пользователя
      const data = (await useFetch(`category`)) as TCategory[];

      if (data) {
        console.log('categories', data);
        // Сохраняем в хранилище данные пользователя
        setCategories(data);
      }
    })();
  }, []);

  return (
    <CardsLayout title="Готовые наборы слов">
      <ScrollView contentContainerStyle={[ss.cards]}>
        {[]
          .concat(...Array(5).fill(categories))
          ?.map((category, index) => <Category key={index} data={category} />)}
      </ScrollView>
    </CardsLayout>
  );
}

/**
 * Стили ----------------
 */
const ss = StyleSheet.create({
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: width * 0.14,
    paddingBottom: width * 2 + 75,
  },
});
