import React from 'react';
import { StyleSheet } from 'react-native';
import { CardsLayout } from '../../layouts/cards';
import { Card } from '../../components/Card';
import { Stack, useSearchParams } from 'expo-router';

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
        {Array(24)
          .fill(0)
          .map((_, index) => (
            <Card key={index} style={{ marginBottom: 24 }} />
          ))}
      </CardsLayout>
    </>
  );
}

/**
 * Styles ----------------
 */
const ss = StyleSheet.create({});
