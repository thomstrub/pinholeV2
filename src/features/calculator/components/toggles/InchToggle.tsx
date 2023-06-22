import React from "react";
import { ColorStyles } from "./ToggleContainer";

type InchProps = {
    colorStyles: ColorStyles
}

export default function InchToggle({colorStyles}: InchProps){
    
    const inchToggleStyles = {
        ...colorStyles,
        borderRadius: "6px 0px 0px 6px",
        height: "20px",
        width: "60px",
        padding: "20px",
        fontSize: "16px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        textAlign: "center" as "center" | undefined,
        justifyContent: "center",
    }
    return(
        <>
            <div style={inchToggleStyles}>
                <p style={{marginTop: "14px"}}>in</p>
            </div>
        </>
        
    )
}