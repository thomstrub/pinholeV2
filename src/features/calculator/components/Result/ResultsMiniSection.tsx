import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import constants, { ConstantsItem } from "../../../../constants/constants";
import ResultsMini from "./ResultMini";


export default function ResultsMiniSection(){

    return(
       
        <Row>
                <div style={{display:"flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div>
                        <ResultsMini name={constants.results.fstop} />
                    </div>
                    <div >
                        <ResultsMini name={constants.results.angleOfView} />
                    </div>
                </div>
            
        </Row>
        
    )
}