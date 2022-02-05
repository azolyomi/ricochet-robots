import React, { useState, useEffect } from 'react'
import Game from './components/Game/GameComponent';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: black;
`

const App = () => {
  
  return (
    <Container>
      <Game />
    </Container>
  );
}

export default App;
