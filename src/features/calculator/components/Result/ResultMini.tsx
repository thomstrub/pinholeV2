import React from "react";
import { Row, Col } from "react-bootstrap";
import { resultsMiniStyles, labelStyles, rowStyles } from "../../../../styles/inputAndResultsStyles";
import { ConstantsItem } from "../../../../constants/constants";
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import {
    CalculatorState,
    selectCalculate,
    Item,
    Results
  } from '../../calculatorSlice';

  type ResultMiniProps = {
    name: ConstantsItem;
}

export default function ResultsMini({name}: ResultMiniProps){

    const calculatorState = useAppSelector(selectCalculate) as CalculatorState;

    const resultValue = calculatorState.results[name.variable as keyof Results] as string;
    console.log(resultValue, " <--- resultValue")

    return(
        
        <Row style={rowStyles}>
            <Col>
                <Row>
                    <label style={labelStyles} htmlFor={name.variable}>{name.readibleName}</label>
                </Row>
                <Row style={{marginTop: "4px"}}>
                    <Col>

                        <input style={resultsMiniStyles} id={name.variable} value={resultValue ? resultValue : "NO"} readOnly={true}></input>
                        <p>Hello:{resultValue}</p>
                    </Col>
                </Row>
            </Col>
        </Row>
            
       
      
    )
}