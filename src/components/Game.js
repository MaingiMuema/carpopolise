import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Scene from './Scene';
import Car from './Car';
import { Physics } from '@react-three/rapier';

export default function Game() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas shadows>
        <Suspense fallback={null}>
          <Physics>
            <PerspectiveCamera makeDefault position={[0, 5, 10]} />
            <Scene />
            <Car />
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
}
