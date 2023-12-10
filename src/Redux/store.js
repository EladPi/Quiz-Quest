import { configureStore } from '@reduxjs/toolkit';
import summaryReducer from './Reducers/summarySlice';
import quizOptionsReducer from './Reducers/quizOptionsSlice';

export const store = configureStore({
  reducer: {
    summary: summaryReducer,
    quizOptions: quizOptionsReducer,
  }
});