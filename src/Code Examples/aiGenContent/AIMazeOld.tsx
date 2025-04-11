import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
// import { Canvas, useFrame, useThree } from '@react-three/fiber'
// import { OrbitControls, useScroll } from '@react-three/drei';
import { useScroll } from '@react-three/drei';

import * as THREE from 'three';

const NUMBER_OF_SPHERES = 20;

const Sphere = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 32, 32]} /> {/* Adjust radius as needed */}
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[50, 50]} /> {/* Adjust size as needed */}
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
};

const Spheres = () => {
  const spheres = Array.from({ length: NUMBER_OF_SPHERES }, (_, i) => {
    const x = (Math.random() - 0.5) * 20; // Random x within -10 to 10
    const z = (Math.random() - 0.5) * 20; // Random z within -10 to 10
    return <Sphere key={i} position={[x, 0, z]} />;
  });
  return <>{spheres}</>;
};

const Camera = () => {
  const camera = useRef<THREE.PerspectiveCamera>(null!)
  
  // const { gl } = useThree();
//   const { gl, camera: defaultCamera } = useThree();


  //   CHQ: added typo below just to better understand the code
  //   Property 'camesra' does not exist on type 'RootState'.ts(2339)
    // const { gl, camesra: defaultCamera } = useThree();
  const scroll = useScroll();
  const [targetSphereIndex, setTargetSphereIndex] = useState(0);

  const spherePositions = Array.from(
    { length: NUMBER_OF_SPHERES },
    (_, i) => {
      const x = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      return new THREE.Vector3(x, 0.5, z); // Y is sphere radius
    }
  );

  useFrame(() => {
    const scrollProgress = scroll.offset; // 0 to 1

    // Calculate the target sphere index based on scroll position
    const newTargetIndex = Math.floor(scrollProgress * NUMBER_OF_SPHERES);
    if (newTargetIndex !== targetSphereIndex && newTargetIndex < NUMBER_OF_SPHERES) {
      setTargetSphereIndex(newTargetIndex);
    }

    const targetPosition = spherePositions[targetSphereIndex];

    if (targetPosition) {
      // Smoothly interpolate camera position and lookAt
      camera.current.position.lerp(targetPosition, 0.05); // Adjust speed
      const lookAtPosition = new THREE.Vector3(
        targetPosition.x,
        targetPosition.y + 0.2, // Look slightly above
        targetPosition.z + 1 // Look slightly ahead
      );

      camera.current.lookAt(lookAtPosition);
    }
  });

  useEffect(() => {
    // Set initial camera position (can be outside the spheres initially)
    camera.current.position.set(0, 2, 10);
    camera.current.lookAt(new THREE.Vector3(0, 0, 0));
  }, []);
  // return (<perspectiveCamera ref={camera} fov={75} aspect={gl.getCurrentViewport(targetSphereIndex) / gl.viewport.height} near={0.1} far={100} />);
  return (<perspectiveCamera ref={camera} fov={75} near={0.1} far={100} />);
};

const Scene = () => {
  return (
    <>
      <Camera />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <Floor />
      <Spheres />
      {/* <OrbitControls />  */} {/* Remove OrbitControls */}
    </>
  );
};

const AIMazeOld = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};

export default AIMazeOld;