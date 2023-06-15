import React from "react";
export default function InchToggle({colorStyles}){
    
    const inchToggleStyles = {
        ...colorStyles,
        borderRadius: "6px 0px 0px 6px",
        height: "60px",
        width: "60px",
        padding: "20px",
        fontSize: "16px",
        fontWeight: "500",
        lineHeight: "20px",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center"
    }
    return(
        <>
            <div style={inchToggleStyles}>
                <p style={{marginTop: "14px"}}>in</p>
            </div>
        </>
        
    )
}