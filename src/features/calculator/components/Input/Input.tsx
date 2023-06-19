import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import ToggleContainer from "../toggles/toggleContainer";
import { ConstantsItem } from "../../../../constants/constants";
import { inputsStyles, labelStyles, rowStyles } from "../../../../styles/inputAndResultsStyles";

import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import {
    calculateStateResults,
    CalculatorState,
    selectCalculate,
    Item,
    Inputs,
    CalculatorPayload
  } from '../../calculatorSlice';
import constants from "../../../../constants/constants";
import e from "express";
import { useSelector } from "react-redux";

type InputProps = {
    name: ConstantsItem;
}

export default function Input({name}: InputProps){

    const calculatorState = useAppSelector(selectCalculate);
    
    const dispatch = useAppDispatch();
    const [newValue, setNewValue] = useState(0);
    const [elemId, setElemId] = useState('');
    const [state, setState] = useState(calculatorState);

    const itemValue: Item = calculatorState.inputs[name.variable as keyof Inputs];
    
    // handler to dispatch to Redux based on current state

//     function handleChange(e:FormEvent){
//         e.preventDefault();
        
//         if(e.target){
//             console.log(e.target);
//             const target = e.target as HTMLInputElement;
//             // const id = target.id as keyof Inputs;
//             // let newState: CalculatorState = calculatorState;
//             // newState.inputs[id] = {
//             //     value: Number(target.value),
//             //     unit: constants.units.millimeters.variable
//             // }
//             console.log(newValue, " <----new value");
//             let newState: CalculatorState = {
//                 ...calculatorState,
//                 inputs: {
//                     ...calculatorState.inputs,
//                     [elemId]: {
//                         value: newValue,
//                         unit: constants.units.millimeters.variable
//                     }
//                 }
//             }

//             dispatch(calculateStateResults(newState));

//     }
// }
function newHandleChange(e:FormEvent){
    const target = e.target as HTMLInputElement;
    console.log(target, "  <--- target")
    const updatedElemId = target.id as keyof Inputs;
    setElemId(updatedElemId);
    const updatedValue = Number(target.value);
    setNewValue(updatedValue);

    const calculatorPayload: CalculatorPayload = {
        updatedElemId: updatedElemId,
        updatedValue: updatedValue,
        calculatorState: calculatorState
    }

    // to do - put this into a helper function w/ dispatches
    // let newState: CalculatorState = {
    //     ...calculatorState,
    //     inputs: {
    //         ...calculatorState.inputs,
    //         [updatedElemId]: {
    //             value: updatedValue,
    //             unit: constants.units.millimeters.variable
    //         }
    //     }
    // }
    dispatch(calculateStateResults(calculatorPayload));
}

// useEffect(() => {
//     setState(calculatorState);
// }, [calculatorState.inputs]);

return(
    
    <Row style={rowStyles}>
    <Col>
        <Row style={{marginBottom: "4px"}}>
            <label style={labelStyles} htmlFor={name.variable}>{name.readibleName}</label>
        </Row>
        <Row style={{marginTop: "4px"}}>
        <div style={{display: "flex", justifyContent: "space-between", width:"100%", margin: "0 auto"}}> 
            
            <input style={inputsStyles} type="number" pattern="/d*" inputMode="decimal" id={name.variable} 
                   onInput={(e) => newHandleChange(e)}
                //    onBlur={(e) => handleChange(e)}
                   value={newValue}>

            </input>
        
            {/* <ToggleContainer unit={value.unit} handleUnitToggle={handleUnitToggle} type={"inputs"} label={name.variable}/> */}
        </div>
        </Row>
    </Col>
    </Row>       
)
}