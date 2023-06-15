import React from "react";
import Result from "./result/result";
import constants from "../../constants/constants";


export default function ResultsSection({results, handleUnitToggle}){
    const imageDiameter = results[constants.results.imageDiameter.variable]
    const optimalPinholeDiameter = results[constants.results.optimalPinholeDiameter.variable]
    const optimalFocalLength = results[constants.results.optimalFocalLength.variable]
return(
    <>
        <Result name={constants.results.imageDiameter} result={imageDiameter ? imageDiameter : ''} handleUnitToggle={handleUnitToggle}/>
        {/* <Result name={constants.results.optimalPinholeDiameter} result={optimalPinholeDiameter ? optimalPinholeDiameter : ''} handleUnitToggle={handleUnitToggle}/>
        <Result name={constants.results.optimalFocalLength} result={optimalFocalLength ? optimalFocalLength : ''} handleUnitToggle={handleUnitToggle}/> */}
    </>
)
}