import React from "react";
import { Row, Col } from "react-bootstrap";
// import ToggleContainer from "../toggles/toggleContainer";
import { resultsStyles, labelStyles, rowStyles } from "../../../../styles/inputAndResultsStyles";
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { ConstantsItem } from "../../../../constants/constants";

import {
    CalculatorState,
    selectCalculate,
    Item,
    Results
  } from '../../calculatorSlice';

type ResultMiniProps = {
    name: ConstantsItem;
}

export default function Result({name}: ResultMiniProps){
    // const resultInUnit = result[result.unit]
    
    const calculatorState = useAppSelector(selectCalculate) as CalculatorState;

    const resultValue = calculatorState.results[name.variable as keyof Results] as Item;


    return(
        <>
        <Row style={rowStyles}>
            <Col>
        <Row>
            <label style={labelStyles} htmlFor={name.variable}>{name.readibleName}</label>
        </Row>
        <Row style={{marginTop: "4px"}}>
            <div style={{display: "flex", justifyContent: "space-between", width:"100%", margin: "0 auto"}}>
                <input style={resultsStyles} id={name.variable} value={resultValue.value} readOnly={true}></input>
                {/* <ToggleContainer unit={result.unit} handleUnitToggle={handleUnitToggle} type={"results"} label={name.variable}/> */}
            </div> 
        </Row>
            </Col>
        </Row>
        </>
        
    )
}