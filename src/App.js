import React from 'react';
import { KeyboardControls } from '@react-three/drei';
import Game from './components/Game';
import './App.css';

function App() {
  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
        { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
        { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
        { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
      ]}
    >
      <Game />
    </KeyboardControls>
  );
}

export default App;
