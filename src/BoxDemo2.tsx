// Source: 
// [1]: https://codesandbox.io/p/sandbox/gifted-varahamihira-rrppl0y8l4?file=%2Fsrc%2FApp.js%3A1%2C1-40%2C1
 
import * as THREE from 'three'

import { Ball } from './MyBall'
// import { Ball, BallTest2 } from './MyBall'

// import { Canvas, useLoader } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'

import { TextureLoader } from 'three'

import { CustomShape } from './CustomShape1'

// FIX: does not appear in code, commenting out
// import MyBox from './TextureTest4'

// FIX: CHQ: The importation and use of this seems to break the entire canvas
// import BallWithProps from './BallPositionTexture'

// [1]
import { useRef, useState } from 'react'
// import { useRef, useState, useEffect } from 'react'

// import { Canvas, useFrame } from '@react-three/fiber'
 // CHQ - below is the line I wrote to test purpose of useFrame in code
// import { Canvas, ThreeElements } from '@react-three/fiber'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
// import { Canvas, useThree, useFrame, ThreeElements } from '@react-three/fiber'



// import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei'

// import { cameraPosition } from 'three/tsl'

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  const colorMap = useLoader(TextureLoader, 'moon.jpg')

  // CHQ: automatically rotate cubes along x axis
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    // OrthographicCamera()
  })
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
      <meshStandardMaterial 
        color={hovered ? 'limegreen' : 'white'} 
        displacementScale={0.2}
        map={colorMap}
        displacementMap={colorMap}
        />
    </mesh>
  )
}
 
export default function ShapeArena(props: {windowMinimized:boolean}) {

  
  return (
       <div className='Threejs-bg-color'>
      
      {/* CHQ: below shrinks the cubes but not the window in which they exist. How does
      one access the full screen button unless it is an overlay? Exaclty. */}
    {/* <Canvas style={{width: innerWidth, height: props.windowMinimized? `20vh`: `30vh`}}> */}
    <Canvas style={{width: innerWidth, height: props.windowMinimized? `200px`: `600px`}}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <Ball position={[-3.6, 0, 0]} />
      {/* <MyBox position={[2.1, 0.2, 5]}/> */}
      {/* <BallWithProps/> */}

      {/* <CustomShape/> */}

{/* Type '{ position: [number, number, number]; textureInput: string; }' is not assignable to type 'IntrinsicAttributes & Omit<ExtendedColors<Overwrite<Partial<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>, NodeProps<...>>>, NonFunctionKeys<...>> & { ...; } & EventHandlers'.
 */}
 {/*   Property 'textureInput' does not exist on type 'IntrinsicAttributes & Omit<ExtendedColors<Overwrite<Partial<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>, NodeProps<...>>>, NonFunctionKeys<...>> & { ...; } & EventHandlers'.ts(2322)
 */}
      {/* <BallTest2 position={[-3.6, 0, 0] textureInput={'moon.jpg''}} /> */}

      '

      {/* <BallTest objGeometry={[-3.6, 0, 0]} textureSource={'moon.jpg'}/> */}

      {/* <Ball position={[3.6, 0, 0]} /> */}
      {/* <MyBall theCoords={{xPos=3.6, yPos=0, zPos=0}}} /> */}

      <OrbitControls />

      {/*[2]  */}
      {/* Got this warning when implenneting below code:
      WebGL warning: drawElementsInstanced: Drawing to a destination rect smaller than the viewport rect. (This warning will only be given once)
       */}
      {/* <OrthographicCamera
        makeDefault
        zoom={1}
        top={200}
        bottom={-200}
        left={200}
        right={-200}
        near={1}
        far={2000}
        position={[0, 0, 200]}
      /> */}
    </Canvas>
    </div>
  )
}

// I think I can put
// controls.update();
//  in useFrame since it is something that must be udpated every frame