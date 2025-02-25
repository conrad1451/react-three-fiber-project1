import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; // For optional camera control
import { useControls } from 'leva';
import * as THREE from 'three';

const Box: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const { color, scale, rotationSpeed } = useControls({
    color: '#ff0000',
    scale: { value: 1, min: 0.1, max: 5 },
    rotationSpeed: { value: 0.01, min: -0.1, max: 0.1 },
  });

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <mesh ref={mesh} scale={scale}>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Camera: React.FC = () => {
  const camera = useRef<THREE.PerspectiveCamera>(null!);
  const { gl } = useThree();
  const { zoom, lookAtX, lookAtY, lookAtZ } = useControls({
    zoom: { value: 1, min: 0.1, max: 5 },
    lookAtX: 0,
    lookAtY: 0,
    lookAtZ: 0,
  });

  useFrame(() => {
      if (camera.current) {
          camera.current.zoom = zoom;
          camera.current.lookAt(lookAtX, lookAtY, lookAtZ)
          camera.current.updateProjectionMatrix();
      }
  })

  useEffect(() => {
    if (camera.current) {
      camera.current.position.set(5, 5, 5);
      camera.current.lookAt(0, 0, 0);
    }
  }, []);

  return <perspectiveCamera ref={camera} fov={75} aspect={gl.domElement.clientWidth / gl.domElement.clientHeight} near={0.1} far={1000} />;
};

const Scene: React.FC = () => {
  const { showOrbitControls } = useControls({ showOrbitControls: false }); // Control OrbitControls

  return (
    <>
      <Camera />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <Box />
      <Floor />
      {showOrbitControls && <OrbitControls />} {/* Conditionally render OrbitControls */}
    </>
  );
};

const Floor: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
};

const ZApp: React.FC = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};

export default ZApp;