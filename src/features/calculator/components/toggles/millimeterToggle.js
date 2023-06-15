import React from "react";
export default function MillimeterToggle({colorStyles}){
    
    const millimeterToggleStyles = {
        ...colorStyles,
        borderRadius: "0px 6px 6px 0px",
        height: "60px",
        width: "60px",
        padding: "20px",
        fontSize: "16px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
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