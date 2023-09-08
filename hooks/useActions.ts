import {bindActionCreators} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {userActions} from "../store/slices/user";
import {cardsActions} from "../store/slices/cards";

// Все actions
const allActions = {
    ...userActions,
    ...cardsActions
}

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allActions, dispatch);
};