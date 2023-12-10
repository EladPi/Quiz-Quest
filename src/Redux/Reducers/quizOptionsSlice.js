import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: null,
    categoryName:'',
    difficulty: null,
    type: null,
    numOfQuestions: null,
}


export const quizOptionsSlice = createSlice({
    name: 'quizOptions',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload.toString();
        },
        setDifficulty: (state, action) => {
            state.difficulty = action.payload;
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
        setNumOfQuestions: (state, action)=>{
            state.numOfQuestions = action.payload.toString();
        },
        setCategoryName: (state, action)=>{
            state.categoryName = action.payload;
        },
        setAll: (state, action)=>{
            const {categoryId , categoryName , numberOfQuestions, type, difficulty}= action.payload;
            state.category = categoryId.toString();
            state.difficulty = difficulty;
            state.type = type;
            state.numOfQuestions = numberOfQuestions.toString();
            state.categoryName = categoryName;
        },
        resetQuizOptions: () => initialState
    },
});

export const selectAll = (state)=> state.quizOptions

export const { setCategory, setDifficulty, setType, setNumOfQuestions, resetQuizOptions,setCategoryName, setAll } = quizOptionsSlice.actions;

export default quizOptionsSlice.reducer;