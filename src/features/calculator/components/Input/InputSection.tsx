import React from "react";

import {constants} from "../../../../constants/constants";
import Input from "./Input";

export default function InputSection(){
return(
    <>
        <Input name={constants.inputs.focalLength}  />
        <Input name={constants.inputs.diameter} />
        <Input name={constants.inputs.filmDimension} />
    </>
    
)
}