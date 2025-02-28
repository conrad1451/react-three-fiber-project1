import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface TextDisplayProps {
  text: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ text }) => {
  const meshRef = React.useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
        meshRef.current.position.y += 0.01;
    //   meshRef.current.rotation.y += 0.01; // Optional: Rotate the text
    }
  });

  return (
    <group>
      <mesh position={[0, 0, -0.1]}> {/* Black background mesh */}
        <planeGeometry args={[5, 1]} /> {/* Adjust size as needed */}
        <meshBasicMaterial color="black" transparent opacity={0.5} />
      </mesh>
      <Text
        ref={meshRef}
        position={[0, 0, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};

// const Scene: React.FC = () => {
export function Scene(){
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <TextDisplay text="Hello, React Three Fiber!" />
    </>
  );
};

// const AIScrollApp: React.FC = () => {
export function AIScrollApp(){
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};

// export default AIScrollApp;