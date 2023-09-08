import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TCard} from "../../types/cards";

interface CardsSlice {
    cards: TCard[]
}

/**
 * Начальные значения ----------------
 */
const initialState: CardsSlice = {
    cards: []
};

/**
 * Хранилище ----------------
 */
const cardsStore = createSlice({
    name: 'cards',
    initialState,

    reducers: {
        addCard(state, {payload}: PayloadAction<TCard>) {
            state.cards.push(payload);
        },
        removeCard(state, {payload}: PayloadAction<number>) {
            state.cards = state.cards.filter((obj) => obj.id !== payload);
        },
    },
});

export const cardsActions = cardsStore.actions;
export {cardsStore};
export default cardsStore.reducer;