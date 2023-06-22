import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  calculateStateResults,
  selectCalculate
} from './calculatorSlice';
import styles from './Counter.module.css';
import InputSection from './components/Input/InputSection';
import ResultsMiniSection from './components/Result/ResultsMiniSection';
import ResultsSection from './components/Result/ResultsSection';

export function Calculator() {

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
          <ResultsMiniSection />
          <ResultsSection />
      </Container>
  </div>
</main>
  );
}
