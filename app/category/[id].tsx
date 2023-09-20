import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CardsLayout } from '../../layouts/cards';
import { Card } from '../../components/Card';
import { Stack, useSearchParams } from 'expo-router';
import { width } from '~components/Category';

/**
 * Screen ----------------
 */
export default function CategoryScreen() {
  /**
   * Переменные ----------------
   */
  const { id } = useSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Category #${id}`,
        }}
      />

      <CardsLayout title="Карточки слов">
        <ScrollView contentContainerStyle={[ss.cards]}>
          {Array(24)
            .fill(0)
            .map((_, index) => (
              <Card key={index} style={{ marginBottom: -20 }} />
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
