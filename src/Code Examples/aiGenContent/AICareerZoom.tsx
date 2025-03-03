import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const ScrollingText: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { camera } = useThree();
  const [scrollPosition, setScrollPosition] = useState(0);

  useFrame(() => {
    if (camera.position.z > 10) { // Adjust zoom threshold
      const scrollSpeed = (camera.position.z - 10) * 0.005; // Adjust scroll speed
      setScrollPosition((prev) => prev + scrollSpeed);
    } else {
      setScrollPosition(0); // Reset scroll when not zoomed
    }
    if (meshRef.current) {
        meshRef.current.position.y = scrollPosition;
    }
  });

  return (
    <Text
      ref={meshRef}
      position={[0, 0, 0]}
      fontSize={0.3}
      color="white"
      anchorX="center"
      anchorY="top" // Anchor to top for scrolling effect
    >
      {`This is scrolling text.\nIt scrolls up when the camera zooms out.\nYou can add more lines to make it longer.\nLike this!\nAnd this!\nAnd so on...\nAnd even more!\nAnd more!\nAnd MORE!`}
    </Text>
  );
};

const Camera: React.FC = () => {
  const camera = useRef<THREE.PerspectiveCamera>(null!);
  const { gl } = useThree();

  useEffect(() => {
    if (camera.current) {
      camera.current.position.set(0, 0, 10); // Initial camera position
      camera.current.lookAt(0, 0, 0);
    }
  }, []);

  useFrame(() => {
    if (camera.current) {
      if (camera.current.position.z > 2) {
          camera.current.position.z -= 0.01;
      }
    }
  })

  return (
    <perspectiveCamera
      ref={camera}
      fov={75}
      aspect={gl.domElement.clientWidth / gl.domElement.clientHeight}
      near={0.1}
      far={1000}
    />
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <Camera />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <ScrollingText />
    </>
  );
};

const AIGenComponent = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};

export default AIGenComponent;