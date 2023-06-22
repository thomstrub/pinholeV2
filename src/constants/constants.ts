import { Inputs } from "../features/calculator/calculatorSlice";

export interface ConstantsItem {
    variable: string | keyof Inputs
    readibleName: string;
}

interface Unit {
    variable: string;
    readibleName: string;
    multiplier: number;
}

export interface ConstantsInterface {
    inputs: {
        [key: string]: ConstantsItem
    };
    results: {
        [key: string]: ConstantsItem
    };
    units: {
        [key: string]: Unit
    }
}
export const constants: ConstantsInterface = {
    inputs: {
        focalLength: {
            variable: 'focalLength' as keyof Inputs,
            readibleName: "Focal Length"
        },
        diameter: {
            variable: 'diameter' as keyof Inputs,
            readibleName: "Pinhole Diameter"
        },
        filmDimension: {
            variable: 'filmDimension' as keyof Inputs,
            readibleName: 'Film Dimension'
        }
    },
    results: {
        fstop: {
            variable: "fStop",
            readibleName: "F-Stop"
        },
        angleOfView: {
            variable: "angleOfView",
            readibleName: "Angle of View"
        },
        imageDiameter: {
            variable: "imageDiameter",
            readibleName: "Image Diameter"
        },
        optimalPinholeDiameter: {
            variable: "optimalPinholeDiameter",
            readibleName: "Optimal Pinhole Diameter"
        },
        optimalFocalLength: {
            variable: "optimalFocalLength",
            readibleName: "Optimal Focal Length"
        }
    },
    units: {
        millimeters: {
            variable: "millimeters",
            readibleName: "mm",
            multiplier: 25.4
        },
        inches: {
            variable: "inches",
            readibleName: "in",
            multiplier: .0393701
        }
    }
    
}
