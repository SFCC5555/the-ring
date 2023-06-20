import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('languageStorage')?JSON.parse(localStorage.getItem('languageStorage')):'english'

export const languageSlice = createSlice({
    name:'language',
    initialState,
    reducers: {
        changeLanguage: (state,action)=>{

            state = action.payload;

            localStorage.setItem('languageStorage',JSON.stringify(state));

            return state;


        }
    }

})

export const {changeLanguage} = languageSlice.actions;
export default languageSlice.reducer;