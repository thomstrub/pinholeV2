import React from "react";
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
    Inputs
  } from '../../calculatorSlice';


type InputProps = {
    name: ConstantsItem;
}

export default function Input({name}: InputProps){

    const calculatorState = useAppSelector(selectCalculate);
    const dispatch = useAppDispatch();

    const itemValue: Item = calculatorState.inputs[name.variable as keyof Inputs];

return(
    
    <Row style={rowStyles}>
    <Col>
        <Row style={{marginBottom: "4px"}}>
            <label style={labelStyles} htmlFor={name.variable}>{name.readibleName}</label>
        </Row>
        <Row style={{marginTop: "4px"}}>
        <div style={{display: "flex", justifyContent: "space-between", width:"100%", margin: "0 auto"}}> 
            
            <input style={inputsStyles} type="number" pattern="/d*" inputMode="decimal" id={name.variable} onChange={() => dispatch(calculateStateResults(calculatorState))} value={itemValue.value}></input>
        
            {/* <ToggleContainer unit={value.unit} handleUnitToggle={handleUnitToggle} type={"inputs"} label={name.variable}/> */}
        </div>
        </Row>
    </Col>
    </Row>       
)
}