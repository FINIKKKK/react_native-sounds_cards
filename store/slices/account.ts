import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '~types/account';

export type TLang = 'ru' | 'kz';

interface TAccountSlice {
  user: TUser | null;
  lang: TLang | null;
  sizeText: number;
  sizeCard: number;
}

/**
 * Начальные значения ----------------
 */
const initialState: TAccountSlice = {
  user: null,
  lang: 'ru',
  sizeText: 0,
  sizeCard: 0
};

/**
 * Хранилище ----------------
 */
const accountStore = createSlice({
  name: 'account',
  initialState,

  reducers: {
    setUserData(state, { payload }: PayloadAction<TUser | null>) {
      state.user = payload;
    },
    changeLang(state, { payload }: PayloadAction<TLang>) {
      state.lang = payload;
    },
    changeSizeText(state, { payload }: PayloadAction<number>) {
      state.sizeText = payload;
    },
    changeSizeCard(state, { payload }: PayloadAction<number>) {
      state.sizeCard = payload;
    },
  },
});

export const accountActions = accountStore.actions;
export { accountStore };
export default accountStore.reducer;
