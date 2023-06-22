import React from "react";
import { ColorStyles } from "./ToggleContainer";

type MillimeterProps = {
    colorStyles: ColorStyles;
}

export default function MillimeterToggle({colorStyles}: MillimeterProps){
    
    const millimeterToggleStyles = {
        ...colorStyles,
        borderRadius: "0px 6px 6px 0px",
        height: "20px",
        width: "60px",
        padding: "20px",
        fontSize: "16px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        textAlign: "center" as "center" | undefined,
        justifyContent: "center"
    }
    return(
        <>
            <div style={millimeterToggleStyles}>
                <p style={{marginTop: "14px"}}>mm</p>
            </div>
        </>
        
    )
}