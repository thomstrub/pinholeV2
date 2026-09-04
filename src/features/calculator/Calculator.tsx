import React from 'react';
import { Container, Row } from 'react-bootstrap';
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
          <ResultsMiniSection />
          <ResultsSection />
      </Container>
  </div>
</main>
  );
}
