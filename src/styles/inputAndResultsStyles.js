const basicBoxStyles = {
    color: "#3E3D3D",
    fontFamily: "Karla",
    fontSize: "32px",
    border: "1px solid #cccccc",
    borderRadius: "6px",
    // boxSizing: "border-box",
    marginBottom:"14px",
    paddingLeft:"12px",
    display: "flex",
    alignItems: "center"
}

const inputsStyles = {
    ...basicBoxStyles,
    height: "60px",
    width: "200px",
    
}

const resultsStyles = {
    ...inputsStyles,
    background: "#ECECEC"
}

const resultsMiniStyles = {
    ...basicBoxStyles,
    background: "#ECECEC",
    height: "60px",
    width: "160px"     
}

const labelStyles = {
    color: "#555B6F",
    lineHeight: "20px"
}

const rowStyles = {marginTop:"12px"}

export {inputsStyles, resultsStyles, resultsMiniStyles, labelStyles, rowStyles}