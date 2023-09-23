import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TUser} from "~types/account";
// import * as SecureStore from 'expo-secure-store';

interface TUserSlice {
    user: TUser | null;
    lang: 'ru' | 'kz' | null;
}

/**
 * Начальные значения ----------------
 */
const initialState: TUserSlice = {
    user: null,
    lang: 'ru'
};

// // Получаем язык в куках
// const getInitialLang = async () => await SecureStore.getItemAsync('lang')
// // Если есть то меняем его
// getInitialLang().then((lang) => {
//     if (lang) initialState.lang = lang as 'ru' | 'kz';
// });

/**
 * Хранилище ----------------
 */
const userStore = createSlice({
    name: 'user',
    initialState,

    reducers: {
        setUserData(state, {payload}: PayloadAction<TUser | null>) {
            state.user = payload;
        },
        changeLang(state, {payload}: PayloadAction<'ru' | 'kz'>) {
            state.lang = payload;
        },
    },
});

export const userActions = userStore.actions;
export {userStore};
export default userStore.reducer;