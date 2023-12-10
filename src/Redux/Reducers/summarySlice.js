import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  totalQuestions: 0,
  numOfCorrectQuestions: 0,
  numOfIncorrectQuestions: 0
};

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      const { question, selectedAnswer, correctAnswer } = action.payload;
      const isCorrect = selectedAnswer === correctAnswer;
      state.questions.push({ question, selectedAnswer, correctAnswer, isCorrect });
      state.totalQuestions += 1;
      state.numOfCorrectQuestions += isCorrect ? 1 : 0;
      state.numOfIncorrectQuestions += isCorrect ? 0 : 1;
    },
    resetQuiz: () => initialState
  }
});

export const selectSummary=(state)=> state.summary;

export const { addQuestion, resetQuiz } = summarySlice.actions;
export default summarySlice.reducer;
