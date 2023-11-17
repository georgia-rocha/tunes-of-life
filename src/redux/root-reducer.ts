import { combineReducers } from 'redux'

import userReducer from './reducers/user'
import searchReducer from './reducers/search'

const rootReducer = combineReducers({
  userReducer,
  searchReducer,
});

export default rootReducer
