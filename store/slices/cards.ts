import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCard } from '~types/cards';

interface CardsSlice {
  isOpen: boolean;
  cards: TCard[];
  sentence: string;
  categoryName: string;
}

/**
 * Начальные значения ----------------
 */
const initialState: CardsSlice = {
  isOpen: false,
  cards: [],
  sentence: '',
  categoryName: '',
};

/**
 * Хранилище ----------------
 */
const cardsStore = createSlice({
  name: 'cards',
  initialState,

  reducers: {
    openSheet(state) {
      state.isOpen = true;
    },
    closeSheet(state) {
      state.isOpen = false;
    },
    toggleOpenSheet(state) {
      state.isOpen = !state.isOpen;
    },
    addCard(state, { payload }: PayloadAction<{ data: TCard; name: string }>) {
      state.cards.push(payload.data);
      state.sentence = `${state.sentence} ${payload.name}`;
      state.isOpen = true;
    },
    removeCard(state, { payload }: PayloadAction<number>) {
      state.cards = state.cards.filter((obj) => obj.id !== payload);
    },
    removeCards(state) {
      state.cards = [];
      state.sentence = ``;
      state.isOpen = false;
    },
    setCategoryName(state, { payload }: PayloadAction<string>) {
      state.categoryName = payload;
    },
  },
});

export const cardsActions = cardsStore.actions;
export { cardsStore };
export default cardsStore.reducer;
