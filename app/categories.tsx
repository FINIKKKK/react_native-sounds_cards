import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import {Category, width, width2} from '~components/Category';
import { CardsLayout } from '~layouts/cards';
import { useCustomFetch } from '~hooks/useFetch';
import { TCategory } from '~types/category';
import { Link } from 'expo-router';
import { CText, Icon } from '~components/UI';
import { colors } from '~constants';
import { useTranslate } from '~hooks/useTranslate';
import { CategoriesLang } from '~lang/categories';
import { CardLoader } from '~components/CardLoading';
import { useSelectors } from '~hooks/useSelectors';

/**
 * HomeScreen ----------------
 */
export default function HomeScreen() {
  /**
   * Переменные ----------------
   */
  const { useFetch, isLoading } = useCustomFetch();
  const [categories, setCategories] = React.useState<TCategory[]>([]);
  const $t = useTranslate(CategoriesLang);
  const { sizeCard } = useSelectors((state) => state.account);

  /**
   * Вычисляемое ----------------
   */
  // Проверить авторизацию
  React.useEffect(() => {
    (async () => {
      // Получаем данные пользователя
      const data = (await useFetch(`category`)) as TCategory[];

      if (data) {
        // Сохраняем в хранилище данные пользователя
        setCategories(data);
      }
    })();
  }, []);

  return (
    <CardsLayout key={sizeCard}>
      <Link href="/" style={{ marginBottom: 25 }}>
        Back
      </Link>
      <View style={[ss.header]}>
        <CText style={[ss.title]}>{$t?.title}</CText>
        <Link href="/settings">
          <Icon name="settings-outline" type="ionic" color={colors.black} />
        </Link>
      </View>

      <ScrollView contentContainerStyle={[ss.cards, sizeCard === 1 && ss.cards2]} key={sizeCard}>
        {isLoading ? (
          <CardLoader />
        ) : (
          categories?.map((category) => (
            <Category key={category.id} data={category} />
          ))
        )}
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
    gap: width * 0.18,
    paddingBottom: width * 2 + 75,
  },
  cards2: {
    gap: width2 * 0.12,
    paddingBottom: width2 * 2 + 75,
  }
});
