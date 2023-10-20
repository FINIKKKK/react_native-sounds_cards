import { configureStore } from '@reduxjs/toolkit';
import account from './slices/account';
import cards from './slices/cards';
import add from "~store/slices/add";

/**
 * Глобальное хранилище ----------------
 */
const makeStore = () => {
  const store = configureStore({
    reducer: {
      account,
      cards,
      add
    },
  });
  return store;
};

export const store = makeStore();
export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
