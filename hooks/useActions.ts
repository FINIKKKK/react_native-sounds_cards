import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { accountActions } from '~store/slices/account';
import { cardsActions } from '~store/slices/cards';
import {AddActions} from "~store/slices/add";

// Все actions
const allActions = {
  ...accountActions,
  ...cardsActions,
  ...AddActions
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
