import { GET_FAVORITES } from '../actionTypes/favorites';

const initialState = {
  data: [],
};

const favoritesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_FAVORITES:
      return {
        ...state,
        data: [ ...action.payload ],
      }
    default:
      return state
  }
}

export default favoritesReducer;
