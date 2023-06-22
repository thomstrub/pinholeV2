import React, { FormEvent } from "react";
import { Row, Col } from "react-bootstrap";
import ToggleContainer from "../toggles/ToggleContainer";
import { ConstantsItem, constants } from "../../../../constants/constants";
import { inputsStyles, labelStyles, rowStyles } from "../../../../styles/inputAndResultsStyles";

import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import {
    calculateStateResults,
    selectCalculate,
    Inputs,
    CalculatorPayload
  } from '../../calculatorSlice';

type InputProps = {
    name: ConstantsItem;
}

export default function Input({name}: InputProps){
    // Redux hook for state
    const calculatorState = useAppSelector(selectCalculate);
    // Redux hook for dispatching action
    const dispatch = useAppDispatch();

    const input = calculatorState.inputs[name.variable as keyof Inputs];

    function newHandleChange(e:FormEvent){
        const target = e.target as HTMLInputElement;
        const updatedElemId = target.id as keyof Inputs;
        let updatedValue!: number;
        if(calculatorState.inputs[name.variable as keyof Inputs].unit === constants.units.millimeters.variable){
            updatedValue = Number(target.value);
        } else if(calculatorState.inputs[name.variable as keyof Inputs].unit === constants.units.inches.variable){
            updatedValue = Number(target.value) * constants.units.millimeters.multiplier;
        }

        const calculatorPayload: CalculatorPayload = {
            updatedElemId: updatedElemId,
            updatedValue: updatedValue,
            calculatorState: calculatorState
        }


        dispatch(calculateStateResults(calculatorPayload));
    }

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
                    value={input.value > .00001 ? input.value : ''}>

                </input>
            
                <ToggleContainer unit={input.unit} type={"inputs"} updatedElemId={name.variable}/>
            </div>
            </Row>
        </Col>
        </Row>       
    )
}