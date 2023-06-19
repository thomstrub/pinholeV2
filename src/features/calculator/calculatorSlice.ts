import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import constants from "../../constants/constants";
import {calculateResults, updateInputState} from "./helper/calculate";

export interface Item {
    value: number;
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

export interface CalculatorPayload {
    updatedElemId: keyof Inputs;
    updatedValue: number;
    calculatorState: CalculatorState;
}

const initialState: CalculatorState = {
    inputs: {
        focalLength: {
            value: 0,
            unit: constants.units.inches.variable
        },
        diameter: {
            value: 0,
            unit: constants.units.millimeters.variable
        },
        filmDimension: {
            value: 0,
            unit: constants.units.inches.variable
        },
    },
    results: {
        fStop: '',
        angleOfView: '',
        imageDiameter: {
            value: 0,
            unit: constants.units.inches.variable
        },
        optimalPinholeDiameter: {
            value: 0,
            unit: constants.units.millimeters.variable
        },
        optimalFocalLength: {
            value: 0,
            unit: constants.units.inches.variable
        }
    }
}

// 6/16/23 Tyler - shouldn't take in state- should take in values and handle the state
// keep state controlled by redux - 6/19 Different approach using hooks

export function calculateAction(calculatorPayload: CalculatorPayload): CalculatorState{

// first update in the input values based on the changed element
const updatedInputState: CalculatorState = updateInputState(calculatorPayload.updatedElemId, calculatorPayload.updatedValue, calculatorPayload.calculatorState);

// use these new values to update the state using the Redux hooks
// in order to leverage redux hooks, you have to access the state from the functional component
const newResults: CalculatorState = calculateResults(updatedInputState);

return newResults;

}


export const calculatorSlice = createSlice({
   name: 'calculator',
   initialState,
   reducers:{
    calculateStateResults: (state, action: PayloadAction<CalculatorPayload>) => {
        // have to return something
        return calculateAction(action.payload);

    }
   } 
})

export const {calculateStateResults} = calculatorSlice.actions;

export const selectCalculate = (state: RootState) => state.calculator;

export default calculatorSlice.reducer;