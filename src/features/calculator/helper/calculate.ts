import {calculateStateResults, selectCalculate,Item, CalculatorState, Inputs, Results} from "../calculatorSlice"
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {constants} from "../../../constants/constants";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from "../../../app/store";

export function updateInputState(updatedElemId: keyof Inputs, updatedValue: number, currentState: CalculatorState): CalculatorState {
    const unit: string = currentState.inputs[updatedElemId].unit;
    const millimeters = constants.units.millimeters;
    const inches = constants.units.inches

    let adjustedValue: number;
    
    // must convert value for inches since values are stored in mm
    if(unit === inches.variable){
        adjustedValue = updatedValue / millimeters.multiplier;
        console.log(adjustedValue, " <--- adjusted value after conversion");
    } else {
        adjustedValue = updatedValue;
        console.log(adjustedValue, " <--- no unit adjusting");
    }
    let newState: CalculatorState = {
        ...currentState,
        inputs: {
            ...currentState.inputs,
            [updatedElemId]: {
                value: adjustedValue,
                unit: unit
            }
        }
    }
    return newState;
}

// to do - update this to match previous- with type as well as label
export function updateUnitState(type: keyof CalculatorState, updatedElemId: string, currentState: CalculatorState): CalculatorState {
    let inputValue: number;
    let newUnit!: string;
    if(type === 'inputs'){
        newUnit = currentState[type][updatedElemId as keyof Inputs].unit === constants.units.millimeters.variable ? constants.units.inches.variable : constants.units.millimeters.variable;
    } else if (type === 'results'){
        // image diameter is the only toggled result
        newUnit = currentState[type].imageDiameter.unit === constants.units.millimeters.variable ? constants.units.inches.variable : constants.units.millimeters.variable;
    }

    // inputs and results vary in terms of their types and toggles are only used in some places 
    // this is a very clear breakdown of the cases where a toggle is used
    if(String(type) === 'inputs'){
        inputValue = currentState.inputs[updatedElemId as keyof Inputs].value;
    } else if (String(type) === 'results' && updatedElemId === constants.results.imageDiameter.variable){
        inputValue = currentState.results.imageDiameter.value;
    } else {
        throw new Error(`Unit toggle error: ${updatedElemId} is not a valid toggle.`);
    }

    const updatedValue = newUnit === constants.units.millimeters.variable ? inputValue * constants.units.millimeters.multiplier : inputValue * constants.units.inches.multiplier; 
    let newState: CalculatorState = {
        ...currentState,
        [type]:{
            ...currentState[type],
            [updatedElemId]: {
                value: updatedValue.toFixed(2),
                unit: newUnit
            }
        }
    }
    return newState;
}

export function calculateResults(updatedCalculatorState: CalculatorState): CalculatorState{

    const inputs: Inputs = updatedCalculatorState.inputs;

    // units are for indexing into different calculator Items, or values
    const value = "value" as keyof Item;
    const unit = "unit" as keyof Item;

    const inches: string = constants.units.inches.variable;

    // calculate fstop
    function calculateFStop(diameter: Item, focalLength: Item): string{
       
        // adjusting units 
        let adjustedDiameter: number;
        let adjustedFocalLength: number;

        adjustedDiameter = diameter[unit] === inches ? diameter.value / constants.units.inches.multiplier : diameter.value;
        adjustedFocalLength = focalLength[unit] === inches ? focalLength.value / constants.units.inches.multiplier : focalLength.value;

        const fStop: number = Number(adjustedFocalLength)/ Number(adjustedDiameter);
        const formattedFStop = fStop % 1 ? fStop.toFixed(1) : fStop;
        return fStop ? "F-" + formattedFStop : ''
    }

    // calculate angle of view
    function calculateAngleOfViewFromMm(filmDimension: Item, focalLength: Item): string{
        const filmDimensionByFocalLength = Number(filmDimension[value])/(2 * Number(focalLength[value]))
        const angleOfViewInRadians = 2 * Math.atan(filmDimensionByFocalLength)
        const angleOfViewInDegrees = angleOfViewInRadians * 180 / Math.PI
        return angleOfViewInDegrees ? angleOfViewInDegrees.toFixed(0) + "°" : ''
    }

    //calculate image diameter in mm
    function calculateImageDiameterFromMm(focalLength: Item): number{
        const imageDiameter = Number(focalLength[value]) * 1.92
        return imageDiameter ? Number(imageDiameter.toFixed(2)) : 0
    }

// to do: grab formulas for these:

    //calculate optimal pinhole diameter in mm
    function calculateOptimalPinholeDiameterFromMm(focalLength: Item): number{
        const optimalPinholeDiameterFromMm = Math.sqrt(Number(focalLength[value]) * .00007)
        return optimalPinholeDiameterFromMm ? Number(optimalPinholeDiameterFromMm.toFixed(2)) : 0
    }

    //calculate optimal focal length in mm
    function calculateOptimalFocalLengthFromMm(diameter: Item): number{
        const optimalFocalLengthFromMm = Math.pow((Number(diameter[value])/ .03679), 2);
        return optimalFocalLengthFromMm ? Number(optimalFocalLengthFromMm.toFixed(2)) : 0
    }

    return {
        inputs: {
            ...updatedCalculatorState.inputs
        },
        results: {
            fStop: inputs.diameter.value && inputs.focalLength.value ? calculateFStop(inputs.diameter, inputs.focalLength) : '',
            angleOfView: inputs.filmDimension[value] && inputs.focalLength[value] ? calculateAngleOfViewFromMm(inputs.filmDimension, inputs.focalLength) : '',
            imageDiameter: {
            value: calculateImageDiameterFromMm(inputs.focalLength) ? calculateImageDiameterFromMm(inputs.focalLength): 0,
            unit : updatedCalculatorState.results.imageDiameter.unit
            },
            optimalPinholeDiameter: {
                value: calculateOptimalPinholeDiameterFromMm(inputs.focalLength) ? calculateOptimalPinholeDiameterFromMm(inputs.focalLength): 0,
                unit : updatedCalculatorState.results.optimalPinholeDiameter.unit
            },
            optimalFocalLength: {
                value: calculateOptimalFocalLengthFromMm(inputs.diameter) ? calculateOptimalFocalLengthFromMm(inputs.diameter): 0,
                unit : updatedCalculatorState.results.optimalFocalLength.unit
            }

        }
        

       
    }

    
}