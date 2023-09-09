import { StyleSheet } from 'react-native';
import React from 'react';
import { Category } from '../components/Category';
import { CardsLayout } from '../layouts/cards';

/**
 * HomeScreen ----------------
 */
export default function HomeScreen() {
  return (
    <CardsLayout title="Готовые наборы слов">
      {Array(24)
        .fill(0)
        .map((_, index) => (
          <Category key={index} />
        ))}
    </CardsLayout>
  );
}

/**
 * Стили ----------------
 */
const ss = StyleSheet.create({});
