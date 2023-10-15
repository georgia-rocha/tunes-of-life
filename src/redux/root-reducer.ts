import { combineReducers } from 'redux'

import countersReducer from './reducers/counters'

const rootReducer = combineReducers({
  countersReducer
})

export default rootReducer
