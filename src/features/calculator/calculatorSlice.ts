import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import constants from "../../constants/constants";
import calculateResults from "./helper/calculate";

export interface Item {
    inches: number;
    millimeters: number;
    unit: string;
}

export interface Results {
    fStop : string;
    angleOfView: string;
    imageDiameter: Item;
    optimalPinholeDiameter: Item;
    optimalFocalLength: Item;
}

export interface Inputs {
    focalLength: Item;
    diameter: Item;
    filmDimension: Item;
}

export interface CalculatorState {
    inputs: Inputs;
    results: Results;
}

const initialState: CalculatorState = {
    inputs: {
        focalLength: {
            inches: 0,
            millimeters: 0,
            unit: constants.units.inches.variable
        },
        diameter: {
            inches: 0,
            millimeters: 0,
            unit: constants.units.millimeters.variable
        },
        filmDimension: {
            inches: 0,
            millimeters: 0,
            unit: constants.units.inches.variable
        },
    },
    results: {
        fStop: '',
        angleOfView: '',
        imageDiameter: {
            inches: 0,
            millimeters: 0,
            unit: constants.units.inches.variable
        },
        optimalPinholeDiameter: {
            inches: 0,
            millimeters: 0,
            unit: constants.units.millimeters.variable
        },
        optimalFocalLength: {
            inches: 0,
            millimeters: 0,
            unit: constants.units.inches.variable
        }
    }
}

export const calculatorSlice = createSlice({
   name: 'calculator',
   initialState,
   reducers:{
    calculateStateResults: (state, action: PayloadAction<CalculatorState>) => {
        state.results = calculateResults(action.payload);
    }
   } 
})

export const {calculateStateResults} = calculatorSlice.actions;

export const selectCalculate = (state: RootState) => state.calculator;

export default calculatorSlice.reducer;