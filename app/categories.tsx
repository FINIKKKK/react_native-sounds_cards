import { StyleSheet } from 'react-native';
import React from 'react';
import { Category } from '../components/Category';
import { CardsLayout } from '../layouts/cards';
import { useCustomFetch } from '~hooks/useFetch';
import { TCategory } from '~types/category';
import { router } from 'expo-router';
import axios, { AxiosRequestConfig, AxiosResponse } from '~node_modules/axios';
import * as SecureStore from '~node_modules/expo-secure-store';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

/**
 * HomeScreen ----------------
 */
export default function HomeScreen() {
  const { useFetch } = useCustomFetch();
  const [categories, setCategories] = React.useState<TCategory[]>([]);
  const isFocused = useIsFocused();

  /**
   * Вычисляемое ----------------
   */
  // Проверить авторизацию
  React.useEffect(() => {
    console.log('isFocused', isFocused);
    if (isFocused) {
      (async () => {
        // Получаем данные пользователя
        // const { data }: { data: TCategory[] } = await useFetch(`/category`);

        const token = await SecureStore.getItemAsync('token');

        console.log(token);

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        axios
          .get('https://api.lmt.app.itl.systems/category', { headers })
          .then(({ data }) => {
            console.log('first data', data.data);
            setCategories(data.data);
          });

        // console.log('data', data);
        //
        // if (data) {
        //   // Сохраняем в хранилище данные пользователя
        //   setCategories(data);
        //
        //   console.log('categories', data);
        // }
      })();
    }
  }, [isFocused]);

  return (
    <CardsLayout title="Готовые наборы слов">
      {!!categories.length &&
        categories?.map((category) => <Category key={category.id} />)}
    </CardsLayout>
  );
}

/**
 * Стили ----------------
 */
const ss = StyleSheet.create({});
