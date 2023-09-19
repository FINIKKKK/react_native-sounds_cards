import { StyleSheet } from 'react-native';
import React from 'react';
import { Category } from '~components/Category';
import { CardsLayout } from '~layouts/cards';
import { useCustomFetch } from '~hooks/useFetch';
import { TCategory } from '~types/category';

/**
 * HomeScreen ----------------
 */
export default function HomeScreen() {
  const { useFetch } = useCustomFetch();
  const [categories, setCategories] = React.useState<TCategory[]>([]);

  /**
   * Вычисляемое ----------------
   */
  // Проверить авторизацию
  React.useEffect(() => {
    (async () => {
      // Получаем данные пользователя
      const data = await useFetch(`category`) as TCategory[];

      if (data) {
        console.log('categories', data);
        // Сохраняем в хранилище данные пользователя
        setCategories(data);
      }
    })();
  }, []);

  return (
    <CardsLayout title="Готовые наборы слов">
      {!!categories.length &&
        categories?.map((category) => (
          <Category key={category.id} data={category} />
        ))}
    </CardsLayout>
  );
}

/**
 * Стили ----------------
 */
const ss = StyleSheet.create({});
