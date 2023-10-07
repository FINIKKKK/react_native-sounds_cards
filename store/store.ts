import { configureStore } from '@reduxjs/toolkit';
import account from './slices/account';
import cards from './slices/cards';

/**
 * Глобальное хранилище ----------------
 */
const makeStore = () => {
  const store = configureStore({
    reducer: {
      account,
      cards,
    },
  });
  return store;
};

export const store = makeStore();
export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
