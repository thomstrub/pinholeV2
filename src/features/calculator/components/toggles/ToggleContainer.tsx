import React from "react";
import InchToggle from "./InchToggle";
import MillimeterToggle from "./MillimeterToggle";
import {constants} from "../../../../constants/constants";
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import {
    toggleUnit,
    selectCalculate,
    Inputs,
    CalculatorState, 
    UnitPayload 
  } from '../../calculatorSlice';

type FlexDirection = "column" | "inherit" | "initial" | "revert" | "unset" | "column-reverse" | "row" | "row-reverse" | undefined;

type ToggleContainerStyles = {
    width: string;
    height: string;
    display: string;
    flexDirection: FlexDirection;
}

export interface ColorStyles {
    border: string;
    color: string;
    background: string;
}

type ToggleProps = {
    unit: string;
    type: keyof CalculatorState;
    updatedElemId: string;
}

export default function ToggleContainer({unit, type, updatedElemId}: ToggleProps){
    
    // Redux hook for state
    const calculatorState = useAppSelector(selectCalculate);
    // Redux hook for dispatching action
    const dispatch = useAppDispatch();

    const toggleContainerStyles: ToggleContainerStyles = {
     width: "110px",
     height: "20px",
     display: "flex",
     flexDirection: "row"
    }
    const notSelectedColorStyles: ColorStyles = {
        border: "1px solid #cccccc",
        background: "#F2F3F5",
        color: "#BCBCBC"
    }
    const selectedColorStyles: ColorStyles = {
        background: "#248CFF",
        color: "white",
        border: ''
    }

    function assignColorStyles(unit: string, type: string){
        if(unit === type){
            return selectedColorStyles
        } else {
            return notSelectedColorStyles
        }
    }

    console.log(unit, " ", updatedElemId," ", " <--- unit toggle")
    const toggleUnitArguments: UnitPayload = {
        type: type,
        updatedElemId: updatedElemId as keyof Inputs,
        calculatorState: calculatorState
    }

    return(
        <>
            <div onClick={() => dispatch(toggleUnit(toggleUnitArguments))} style={toggleContainerStyles}>
                <InchToggle colorStyles={assignColorStyles(unit, constants.units.inches.variable)}/>
                <MillimeterToggle colorStyles={assignColorStyles(unit, constants.units.millimeters.variable)}/>       
            </div>
        </>
        
    )
}