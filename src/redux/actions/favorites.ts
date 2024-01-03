import { GET_FAVORITES, actionFavoritesType } from '../actionTypes/favorites';

export const getSearch = (action: actionFavoritesType): actionFavoritesType => {
  return {
    type: GET_FAVORITES,
    payload: action.payload
  }
}
