import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCard } from '~types/cards';

interface CardsSlice {
  cards: TCard[];
  isPlaying: boolean
}

/**
 * Начальные значения ----------------
 */
const initialState: CardsSlice = {
  cards: [],
  isPlaying: false
};

/**
 * Хранилище ----------------
 */
const cardsStore = createSlice({
  name: 'cards',
  initialState,

  reducers: {
    addCard(state, { payload }: PayloadAction<{ data: TCard; name: string }>) {
      state.cards.push(payload.data);
    },
    setIsPlaying(state, {payload}: PayloadAction<boolean>) {
        state.isPlaying = payload;
    },
    removeCard(state, { payload }: PayloadAction<number>) {
      state.cards = state.cards.filter((obj) => obj.id !== payload);
    },
    removeCards(state) {
      state.cards = [];
    },
  },
});

export const cardsActions = cardsStore.actions;
export { cardsStore };
export default cardsStore.reducer;
