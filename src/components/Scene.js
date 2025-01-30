import React, { Suspense } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Scene() {
  const gltf = useLoader(GLTFLoader, '/models/city.glb');

  return (
    <Suspense fallback={null}>
      {gltf && (
        <primitive 
          object={gltf.scene} 
          scale={[0.01, 0.01, 0.01]} 
          position={[0, 0, 0]}
          receiveShadow
          castShadow
        />
      )}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.5, 0]} 
        receiveShadow
      >
        <planeGeometry args={[1000, 1000]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
    </Suspense>
  );
}
