import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './root-reducer'

const store = configureStore({
  reducer: rootReducer
})

export default store;