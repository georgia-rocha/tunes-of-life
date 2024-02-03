import { combineReducers } from 'redux';

import userReducer from './reducers/user';
import searchReducer from './reducers/search';
import favoritesReducer from './reducers/favorites';

const rootReducer = combineReducers({
  userReducer,
  searchReducer,
  favoritesReducer,
});

export default rootReducer
