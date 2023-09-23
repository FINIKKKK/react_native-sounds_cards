import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Category, width } from '~components/Category';
import { CardsLayout } from '~layouts/cards';
import { useCustomFetch } from '~hooks/useFetch';
import { TCategory } from '~types/category';
import axios from '~node_modules/axios';
import * as SecureStore from '~node_modules/expo-secure-store';
import { Link, router } from 'expo-router';

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
      <Link href="/">Back</Link>
      <ScrollView contentContainerStyle={[ss.cards]}>
        {categories?.map((category, index) => (
          <Category key={index} data={category} />
        ))}
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
