import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user';
import cards from './slices/cards';

/**
 * Глобальное хранилище ----------------
 */
const makeStore = () => {
  const store = configureStore({
    reducer: {
      user,
      cards,
    },
  });
  return store;
};

export const store = makeStore();
export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
