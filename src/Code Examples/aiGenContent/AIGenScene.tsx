// Source: Gemini: 

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Load the space texture.  Make sure you have this image in your project's public folder or import it appropriately.
// const SpaceTexture = () => {
//   const texture = useLoader(THREE.TextureLoader, '/space.jpg'); // Adjust path as needed
//   return <primitive object={texture} />;
// };


const Sphere = () => {  
  //   const mesh = useRef();
  const ref = useRef<THREE.Mesh>(null!)

  // Animate the sphere (optional - you can remove this)
  useFrame((state, delta) => {
    //   mesh.current.rotation.x += 0.01 * delta;
    //   mesh.current.rotation.y += 0.005 * delta;
    ref.current.rotation.x += 0.01 * delta;
    ref.current.rotation.y += 0.005 * delta;
  });

  return (
    // <mesh ref={mesh} position={[0, 0, 0]}>
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 32, 32]} /> {/* Radius, widthSegments, heightSegments */}
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

const Background = () => {
    // const mesh = useRef();
    const ref = useRef<THREE.Mesh>(null!)
    // const texture = useLoader(THREE.TextureLoader, '/space.jpg');
    const texture = useLoader(THREE.TextureLoader, 'space.jpg');

        // <mesh ref={ref} scale={[100, 100, 100]}> 
        {/* Scale it up! */}

          {/* <mesh ref={ref} scale={[400, 400, 400]}>  */}
                      {/* Scale it up! */}
    return (

        <mesh ref={ref} scale={[50, 50, 50]}> 

          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} />   
          {/* Important: BackSide */}
          {/* <meshBasicMaterial map={texture} side={THREE.BackSide} />  */}
        </mesh>
    );
}

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} /> {/* Add some ambient light */}
      <pointLight position={[10, 10, 10]} intensity={0.8} /> {/* Add a point light */}
      <Suspense fallback={null}> <Background /> </Suspense>
      <Sphere />
      <OrbitControls /> {/* Allow camera rotation and zoom */}
    </>
  );
};

const AIGenSpaceComponent = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};

export default AIGenSpaceComponent;