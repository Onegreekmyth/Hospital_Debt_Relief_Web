import { configureStore } from '@reduxjs/toolkit';
import hospitalsReducer from './hospitals/hospitalsSlice';

export const store = configureStore({
  reducer: {
    hospitals: hospitalsReducer,
  },
});


