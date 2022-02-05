import logo from './assets/logo.svg';
import React, { useState, useEffect } from 'react'

function App() {
  const callBackendAPI = async () => {
    const response = await fetch('http://localhost:3001/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
         "lmfao"
        </p>
      </header>
    </div>
  );
}

export default App;
