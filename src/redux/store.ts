import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './root-reducer'

export const store = configureStore({
  reducer: rootReducer
});
