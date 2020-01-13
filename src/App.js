import React from 'react';
import './App.css';
import Canvas from './fiber/components/canvas';
import Engine from './fiber/components/engine';
import Scene from './fiber/components/scene';

function App() {
  return (
    <Canvas className="main-canvas" onClick={console.log}>
      {canvas => (
        <Engine canvas={canvas}>
          <Scene />
        </Engine>
      )}
    </Canvas>
  );
}

export default App;
