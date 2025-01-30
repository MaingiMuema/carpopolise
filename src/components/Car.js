import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Car() {
  const car = useRef();
  const model = useLoader(GLTFLoader, '/models/audi_r8.glb');
  const direction = useRef(new THREE.Vector3());
  const speed = useRef(0);
  const maxSpeed = 0.5;
  const acceleration = 0.01;
  const deceleration = 0.005;
  const turnSpeed = 0.03;

  const [, getKeys] = useKeyboardControls();

  useFrame(() => {
    const { forward, backward, left, right } = getKeys();
    
    if (car.current) {
      // Acceleration and deceleration
      if (forward) {
        speed.current = Math.min(speed.current + acceleration, maxSpeed);
      } else if (backward) {
        speed.current = Math.max(speed.current - acceleration, -maxSpeed / 2);
      } else {
        speed.current *= (1 - deceleration);
      }

      // Rotation
      if (left) car.current.rotation.y += turnSpeed;
      if (right) car.current.rotation.y -= turnSpeed;

      // Update direction vector
      direction.current.set(0, 0, 1).applyQuaternion(car.current.quaternion);
      
      // Update position
      car.current.position.addScaledVector(direction.current, -speed.current);
    }
  });

  return (
    <group ref={car} position={[0, 0, 0]} scale={[0.01, 0.01, 0.01]}>
      <primitive object={model.scene} />
    </group>
  );
}
