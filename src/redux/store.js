import { configureStore } from "@reduxjs/toolkit";
import languageReducer from './languageSlice';
import timeUnitReducer from './timeUnitSlice';

export const store = configureStore({
    reducer: {
        language: languageReducer,
        timeUnit: timeUnitReducer
    }
})