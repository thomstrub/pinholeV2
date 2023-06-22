import React from "react";

import {constants} from "../../../../constants/constants";
import Result from "./Result";


export default function ResultsSection(){
    // const imageDiameter = results[constants.results.imageDiameter.variable]
    // const optimalPinholeDiameter = results[constants.results.optimalPinholeDiameter.variable]
    // const optimalFocalLength = results[constants.results.optimalFocalLength.variable]
return(
    <>
        <Result name={constants.results.imageDiameter}/>
        {/* <Result name={constants.results.optimalPinholeDiameter} result={optimalPinholeDiameter ? optimalPinholeDiameter : ''} handleUnitToggle={handleUnitToggle}/>
        <Result name={constants.results.optimalFocalLength} result={optimalFocalLength ? optimalFocalLength : ''} handleUnitToggle={handleUnitToggle}/> */}
    </>
)
}