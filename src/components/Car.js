import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Car() {
  const car = useRef();
  const model = useLoader(
    GLTFLoader,
    '/models/audi_r8.glb',
    (loader) => {
      console.log('Model loading started');
    },
    (event) => {
      console.log('Model loading progress:', event);
    },
    (error) => {
      console.error('Error loading model:', error);
    }
  );

  const direction = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const targetRotation = useRef(0);
  
  // Adjusted parameters for smoother control
  const maxSpeed = 0.3;
  const acceleration = 0.008;
  const deceleration = 0.004;
  const turnSpeed = 0.02;
  const rotationLerp = 0.1;
  const velocityLerp = 0.1;

  const [, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    if (!car.current) return;

    const { forward, backward, left, right } = getKeys();
    
    // Calculate target velocity
    let targetSpeed = 0;
    if (forward) targetSpeed = maxSpeed;
    if (backward) targetSpeed = -maxSpeed * 0.5;

    // Calculate target rotation
    if (left) targetRotation.current += turnSpeed;
    if (right) targetRotation.current -= turnSpeed;

    // Smoothly interpolate current rotation to target rotation
    car.current.rotation.y = THREE.MathUtils.lerp(
      car.current.rotation.y,
      targetRotation.current,
      rotationLerp
    );

    // Update direction based on current rotation
    direction.current.set(0, 0, 1).applyQuaternion(car.current.quaternion);

    // Smoothly interpolate velocity
    const currentSpeed = velocity.current.length();
    const targetVelocity = direction.current.multiplyScalar(targetSpeed);
    
    velocity.current.lerp(targetVelocity, velocityLerp);

    // Apply natural deceleration when no input
    if (!forward && !backward) {
      velocity.current.multiplyScalar(1 - deceleration);
    }

    // Update position
    car.current.position.add(velocity.current);
  });

  return (
    <group ref={car} position={[0, 0, 0]}>
      {model ? (
        <primitive 
          object={model.scene} 
          scale={[0.05, 0.05, 0.05]}
          position={[0, 0, 0]}
          rotation={[0, Math.PI, 0]} // Rotate 180 degrees to face forward
        />
      ) : (
        // Fallback box for debugging
        <mesh>
          <boxGeometry args={[1, 1, 2]} />
          <meshStandardMaterial color="red" wireframe />
        </mesh>
      )}
    </group>
  );
}
