import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  calculateStateResults,
  selectCalculate
} from './calculatorSlice';
import styles from './Counter.module.css';
import InputSection from './components/Input/InputSection';

export function Calculator() {
  const calculator = useAppSelector(selectCalculate);
  const dispatch = useAppDispatch();
  // const [incrementAmount, setIncrementAmount] = useState('2');

//   const incrementValue = Number(incrementAmount) || 0;

  return (
  <main >
  <div style={{display: "flex", width:"100%", maxWidth: "95%", margin: "0 auto",justifyContent: "center"}}>
      <Container>
          <div style={{marginTop: "40px", display: "flex", alignSelf: "center", justifyContent: "center"}}>
              <h1 style={{fontWeight: "800", fontSize: "36px", lineHeight: "42px"}}>Pinhole Calculator</h1>
          </div>
          <InputSection />
          {/* <div style={{width: "100%", height: "4px", background: "#D9D9D9"}}></div>
          <h3 style={{marginTop: "24px", fontSize: "20px", fontWeight: "700", lineHeight: "23px"}}>Results</h3> */}
          <ResultsMiniSection fStop={state.results.fStop} angleOfView={state.results.angleOfView}/>
          <ResultsSection results={state.results} handleUnitToggle={handleUnitToggle}/>
      </Container>
  </div>
</main>
  );
}
