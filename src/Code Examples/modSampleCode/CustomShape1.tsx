// Source: https://www.google.com/search?client=firefox-b-1-d&q=code+for+threejs+shape+in+react+three+fiber (search: code for threejs shape in react three fiber)

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CustomShape = () => {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  const shape = new THREE.Shape();

  shape.moveTo(0, 0);
  shape.lineTo(1, 0);
  shape.lineTo(1, 1);
  shape.lineTo(0, 1);
  shape.closePath();

  const geometry = new THREE.ShapeGeometry(shape);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial color="blue" side={THREE.DoubleSide} />
    </mesh>
  );
};

// const App = () => {
//   return (
//     <Canvas>
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />
//       <CustomShape />
//     </Canvas>
//   );
// };

// export default App;