import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TCategory {
  id: number;
  name: string;
}

interface AddSlice {
  category: TCategory | null;
  image: any;
}

/**
 * Начальные значения ----------------
 */
const initialState: AddSlice = {
  category: null,
  image: null,
};

/**
 * Хранилище ----------------
 */
const AddStore = createSlice({
  name: 'Add',
  initialState,

  reducers: {
    setCategory(state, { payload }: PayloadAction<TCategory | null>) {
      state.category = payload;
    },
    setImage(state, { payload }: PayloadAction<any>) {
      state.image = payload;
    },
  },
});

export const AddActions = AddStore.actions;
export { AddStore };
export default AddStore.reducer;
