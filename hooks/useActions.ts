import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { accountActions } from '~store/slices/account';
import { cardsActions } from '~store/slices/cards';

// Все actions
const allActions = {
  ...accountActions,
  ...cardsActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
