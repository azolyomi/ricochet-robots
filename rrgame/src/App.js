import React, { useState, useEffect } from 'react'
import Home from './components/Home/Home';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`
function App() {
  
  return (
    <Container>
      <Home />
    </Container>
  );
}

export default App;
