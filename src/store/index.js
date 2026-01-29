import { configureStore } from '@reduxjs/toolkit';
import hospitalsReducer from './hospitals/hospitalsSlice';
import paymentsReducer from './payments/paymentsSlice';

export const store = configureStore({
  reducer: {
    hospitals: hospitalsReducer,
    payments: paymentsReducer,
  },
});


