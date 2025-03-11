import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const GrowingSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sphereScale, setSphereScale] = useState(1); // Initial scale

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Adjust scale based on scroll position
    const newScale = 1 + scrollPosition * 0.001; // Adjust multiplier for sensitivity
    setSphereScale(newScale);
  }, [scrollPosition]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(sphereScale, sphereScale, sphereScale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

const Camera: React.FC = () => {
  const camera = useRef<THREE.PerspectiveCamera>(null!);
  const { gl } = useThree();

  useEffect(() => {
    if (camera.current) {
      camera.current.position.set(0, 0, 5);
      camera.current.lookAt(0, 0, 0);
    }
  }, []);

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
      <GrowingSphere />
    </>
  );
};

const AIScrollSphereGrow: React.FC = () => {
  return (
    <>
      <div style={{ height: '200vh' }}> {/* Create scrollable content */}
        <Canvas>
          <Scene />
        </Canvas>
      </div>
    </>
  );
};

export default AIScrollSphereGrow;