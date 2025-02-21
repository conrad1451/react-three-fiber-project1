import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useScroll } from '@react-three/drei';
import * as THREE from 'three';

const NUMBER_OF_SPHERES = 20;

interface SphereProps {
  position: [number, number, number];
}

const Sphere: React.FC<SphereProps> = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

const Floor: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
};

const Spheres: React.FC = () => {
  const spheres = Array.from({ length: NUMBER_OF_SPHERES }, (_, i) => {
    const x = (Math.random() - 0.5) * 20;
    const z = (Math.random() - 0.5) * 20;
    return <Sphere key={i} position={[x, 0, z]} />;
  });
  return <>{spheres}</>;
};

const Camera: React.FC = () => {
  const camera = useRef<THREE.PerspectiveCamera>(null!); // Non-null assertion (!)
  const { gl } = useThree();
  const scroll = useScroll();
  const [targetSphereIndex, setTargetSphereIndex] = useState(0);

  const spherePositions = Array.from({ length: NUMBER_OF_SPHERES }, (_, i) => {
    const x = (Math.random() - 0.5) * 20;
    const z = (Math.random() - 0.5) * 20;
    return new THREE.Vector3(x, 0.5, z);
  });

  useFrame(() => {
    const scrollProgress = scroll.offset;

    const newTargetIndex = Math.floor(scrollProgress * NUMBER_OF_SPHERES);
    if (newTargetIndex !== targetSphereIndex && newTargetIndex < NUMBER_OF_SPHERES) {
      setTargetSphereIndex(newTargetIndex);
    }

    const targetPosition = spherePositions[targetSphereIndex];

    if (targetPosition) {
      camera.current.position.lerp(targetPosition, 0.05);
      const lookAtPosition = new THREE.Vector3(
        targetPosition.x,
        targetPosition.y + 0.2,
        targetPosition.z + 1
      );

      camera.current.lookAt(lookAtPosition);
    }
  });

  useEffect(() => {
    camera.current.position.set(0, 2, 10);
    camera.current.lookAt(new THREE.Vector3(0, 0, 0));
  }, []);

//   const myVar = gl.getSize;
//   alert(myVar.toString())
  
  return (
    <perspectiveCamera
      ref={camera}
      fov={75}
      aspect={100/ 200}
      aspect={gl.viewport.width / gl.viewport.height}
      near={0.1}
      far={100}
    />
  );
};

const Scene: React.FC = () => {
  return (
    <>
      <Camera />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <Floor />
      <Spheres />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};

export default App;