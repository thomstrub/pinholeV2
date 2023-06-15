import {Item, CalculatorState, Inputs, Results} from "../calculatorSlice"

export default function calculateResults(calculatorState: CalculatorState): Results{

    const inputs: Inputs = calculatorState.inputs;

    // units are for indexing into different calculator Items, or values
    const value = "value" as keyof Item;

    // calculate fstop
    function calculateFStopFromMm(diameter: Item, focalLength: Item): string{
        const fStop = Number(focalLength[value])/ Number(diameter[value])
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
        fStop: inputs.diameter.value && inputs.focalLength.value ? String(calculateFStopFromMm(inputs.diameter, inputs.focalLength)) : '',
        angleOfView: inputs.filmDimension[value] && inputs.focalLength[value] ? calculateAngleOfViewFromMm(inputs.filmDimension, inputs.focalLength) : '',
        imageDiameter: {
            value: calculateImageDiameterFromMm(inputs.focalLength) ? calculateImageDiameterFromMm(inputs.focalLength): 0,
            unit : calculatorState.results.imageDiameter.unit
        },
        optimalPinholeDiameter: {
            value: calculateOptimalPinholeDiameterFromMm(inputs.focalLength) ? calculateOptimalPinholeDiameterFromMm(inputs.focalLength): 0,
            unit : calculatorState.results.optimalPinholeDiameter.unit
        },
        optimalFocalLength: {
            value: calculateOptimalFocalLengthFromMm(inputs.diameter) ? calculateOptimalFocalLengthFromMm(inputs.diameter): 0,
            unit : calculatorState.results.optimalFocalLength.unit
        }

       
    }

    
}