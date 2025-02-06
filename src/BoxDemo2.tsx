// Source: https://codesandbox.io/p/sandbox/gifted-varahamihira-rrppl0y8l4?file=%2Fsrc%2FApp.js%3A1%2C1-40%2C1
import * as THREE from 'three'

import { useRef, useState } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
    // onClick={click(!clicked)}
      onPointerOver={(event) => hover(true)}
    // onPointerOver={hover(true)}
      onPointerOut={(event) => hover(false)}>
    {/* onPointerOut={hover(false)}> */}
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function BoxDemo2() {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <OrbitControls />
    </Canvas>
  )
}
