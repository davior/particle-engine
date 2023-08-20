import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ParticleCanvas } from './Components/ParticleCanvas/ParticleCanvas';


function App() {
  return (
    <div className="App">
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div id="root" className="col-md-9 col-lg-10 p-0">
            <ParticleCanvas />
          </div>
          <div className="col-md-3 col-lg-2 bg-light">
            <p>Sidebar content goes here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
