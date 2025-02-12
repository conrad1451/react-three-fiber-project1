import React from 'react';
import { Canvas } from '@react-three/fiber';

const CustomObject = ({ position, color, size }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Scene = () => {
  const objectProps = {
    position: [0, 0, 0],
    color: 'blue',
    size: 1,
  };

  const anotherObjectProps = {
      position: [2, 1, -1],
      color: 'red',
      size: 0.5
  }
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <CustomObject {...objectProps} />
      <CustomObject {...anotherObjectProps}/>
    </Canvas>
  );
};

export default Scene;