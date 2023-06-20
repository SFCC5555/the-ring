import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('timeUnitStorage')?JSON.parse(localStorage.getItem('timeUnitStorage')):'days';

export const timeUnitSlice = createSlice({
    name:'timeUnit',
    initialState,
    reducers: {
        changeTimeUnit: (state,action)=>{

            state = action.payload;
            localStorage.setItem('timeUnitStorage',JSON.stringify(state));

            return state;

        }
    }

})

export const {changeTimeUnit} = timeUnitSlice.actions;
export default timeUnitSlice.reducer;