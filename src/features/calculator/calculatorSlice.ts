import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CounterState } from "../counter/counterSlice";

import constants from "../../constants/constants";

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