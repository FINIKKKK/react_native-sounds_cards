import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { Category, width } from '~components/Category';
import { CardsLayout } from '~layouts/cards';
import { useCustomFetch } from '~hooks/useFetch';
import { TCategory } from '~types/category';
import axios from '~node_modules/axios';
import * as SecureStore from '~node_modules/expo-secure-store';
import { Link, router } from 'expo-router';
import { CText, Icon } from '~components/UI';
import { colors } from '~constants';
import { useActions } from '~hooks/useActions';
import {useTranslate} from "~hooks/useTranslate";
import {CategoriesLang} from "~lang/categories";

/**
 * HomeScreen ----------------
 */
export default function HomeScreen() {
  /**
   * Переменные ----------------
   */
  const { useFetch } = useCustomFetch();
  const [categories, setCategories] = React.useState<TCategory[]>([]);
  const $t = useTranslate(CategoriesLang);
  console.log($t.title);

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

  const { changeSizeCard } = useActions();

  return (
    <CardsLayout>
      <Link href="/" style={{ marginBottom: 25 }}>
        Back
      </Link>
      <View style={[ss.header]}>
        <CText style={[ss.title]}>{$t?.title}</CText>
        <Link href="/settings">
          <Icon name="settings-outline" type="ionic" color={colors.black} />
        </Link>
      </View>

      <Pressable onPress={() => changeSizeCard(1)}>
        <CText>press</CText>
      </Pressable>
      <Pressable onPress={() => changeSizeCard(0)}>
        <CText>press</CText>
      </Pressable>

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  title: {
    textTransform: 'uppercase',
    fontFamily: 'Bold',
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // gap: width * 0.18,
    // paddingBottom: width * 2 + 75,
  },
});
