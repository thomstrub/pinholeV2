import constants from "../../../constants/constants"
import {Item, CalculatorState, Inputs, Results} from "../calculatorSlice"

export default function calculateResults(calculatorState: CalculatorState){

    const inputs: Inputs = calculatorState.inputs;

    // units are for indexing into different calculator Items, or values
    const millimeters = constants.units.millimeters.variable as keyof Item;
    const inches = constants.units.inches.variable as keyof Item;


    // calculate fstop
    function calculateFStopFromMm(diameter: Item, focalLength: Item): string{
        const fStop = Number(focalLength[millimeters])/ Number(diameter[millimeters])
        const formattedFStop = fStop % 1 ? fStop.toFixed(1) : fStop;
        return fStop ? "F-" + formattedFStop : ''
    }

    // calculate angle of view
    function calculateAngleOfViewFromMm(filmDimension: Item, focalLength: Item): string{
        const filmDimensionByFocalLength = Number(filmDimension[millimeters])/(2 * Number(focalLength[millimeters]))
        const angleOfViewInRadians = 2 * Math.atan(filmDimensionByFocalLength)
        const angleOfViewInDegrees = angleOfViewInRadians * 180 / Math.PI
        return angleOfViewInDegrees ? angleOfViewInDegrees.toFixed(0) + "°" : ''
    }

    //calculate image diameter in mm
    function calculateImageDiameterFromMm(focalLength: Item): number{
        const imageDiameter = Number(focalLength[millimeters]) * 1.92
        return imageDiameter ? Number(imageDiameter.toFixed(2)) : 0
    }

// to do: grab formulas for these:

    //calculate optimal pinhole diameter in mm
    function calculateOptimalPinholeDiameterFromMm(focalLength: Item): number{
        const optimalPinholeDiameterFromMm = Math.sqrt(Number(focalLength[millimeters]) * .00007)
        return optimalPinholeDiameterFromMm ? Number(optimalPinholeDiameterFromMm.toFixed(2)) : 0
    }

    //calculate optimal focal length in mm
    function calculateOptimalFocalLengthFromMm(diameter: Item): number{
        const optimalFocalLengthFromMm = Math.pow((Number(diameter[millimeters])/ .03679), 2);
        return optimalFocalLengthFromMm ? Number(optimalFocalLengthFromMm.toFixed(2)) : 0
    }

    // to do - refactor for TS
    return {
        [constants.results.fstop.variable as keyof Results]: inputs.diameter.millimeters && inputs.focalLength.millimeters ? String(calculateFStopFromMm(inputs.diameter, inputs.focalLength)) : '',
        [constants.results.angleOfView.variable as keyof Results]: inputs.filmDimension[millimeters] && inputs.focalLength[millimeters] ? calculateAngleOfViewFromMm(inputs.filmDimension, inputs.focalLength) : '',
        [constants.results.imageDiameter.variable as keyof Results]: {
            [millimeters]: calculateImageDiameterFromMm(inputs.focalLength) ? calculateImageDiameterFromMm(inputs.focalLength): '',
            [inches]: calculateImageDiameterFromMm(inputs.focalLength) ? (calculateImageDiameterFromMm(inputs.focalLength) * constants.units.inches.multiplier).toFixed(2) : '',
            unit : calculatorState.results.imageDiameter.unit
        },
        [constants.results.optimalPinholeDiameter.variable as keyof Results]: {
            [millimeters]: calculateOptimalPinholeDiameterFromMm(inputs.focalLength) ? calculateOptimalPinholeDiameterFromMm(inputs.focalLength): '',
            [inches]: calculateOptimalPinholeDiameterFromMm(inputs.focalLength) ? (calculateOptimalPinholeDiameterFromMm(inputs.focalLength) * constants.units.inches.multiplier).toFixed(2) : '',
            unit : calculatorState.results.optimalPinholeDiameter.unit
        },
        [constants.results.optimalFocalLength.variable as keyof Results]: {
            [millimeters]: calculateOptimalFocalLengthFromMm(inputs.diameter) ? calculateOptimalFocalLengthFromMm(inputs.diameter): '',
            [inches]: calculateOptimalFocalLengthFromMm(inputs.diameter) ? (calculateOptimalFocalLengthFromMm(inputs.diameter) * constants.units.inches.multiplier).toFixed(2) : '',
            unit : calculatorState.results.optimalFocalLength.unit
        }

       
    }
}