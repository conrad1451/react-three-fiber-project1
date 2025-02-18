// Source: 
// [1]: https://codesandbox.io/p/sandbox/gifted-varahamihira-rrppl0y8l4?file=%2Fsrc%2FApp.js%3A1%2C1-40%2C1
// [2]: https://www.google.com/search?client=firefox-b-1-d&q=using+getBoundingClientRect+in+reactjs (search: using getBoundingClientRect in reactjs)



// import * as THREE from 'three'

import { Ball } from './MyBall'
// import { Ball, BallTest2 } from './MyBall'

// import { Canvas, useLoader } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'

import { TextureLoader } from 'three'

// import { CustomShape } from './CustomShape1'

// FIX: does not appear in code, commenting out
// import MyBox from './TextureTest4'

// FIX: CHQ: The importation and use of this seems to break the entire canvas
// import BallWithProps from './BallPositionTexture'

// [1]
// import { useRef, useState } from 'react'
import { useRef, useState, useEffect } from 'react'

// import { Canvas, useFrame } from '@react-three/fiber'
 // CHQ - below is the line I wrote to test purpose of useFrame in code
// import { Canvas, ThreeElements } from '@react-three/fiber'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
// import { Canvas, useThree, useFrame, ThreeElements } from '@react-three/fiber'



// import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei'

// import { cameraPosition } from 'three/tsl'


// FIXME: FOr some reason this functional component causes the code to crash. 
//       Will debug later
// [1]
function InfoOfBoundingBody() {
  // const elementRef = useRef(null);

  // for below code I got the error 
  /**Type 'MutableRefObject<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
  Type 'MutableRefObject<HTMLElement>' is not assignable to type 'RefObject<HTMLDivElement>'.
    Types of property 'current' are incompatible.
      Property 'align' is missing in type 'HTMLElement' but required in type 'HTMLDivElement'. */
  // const elementRef = useRef(document.body); 

  const elementRef = useRef<HTMLDivElement>(null!);
 
  useEffect(() => {
    const rect = elementRef.current.getBoundingClientRect();
    console.log(rect);
  }, []);

  return <div ref={elementRef}>This is an element</div>;
}

// const ref: React.MutableRefObject<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>>

function Star(props: ThreeElements['mesh'])
{
  return 0;
}

// Note: when I swap const const ref = useRef<THREE.Mesh>(null!) with
// const ref = useRef<ThreeElements['mesh']>(null!), I get the error that 
// 'ref.current.rotation.x/y/z' and 'ref.current.position.x/y/z' is possibly 'undefined'.ts(18048)
  
function Box(props: ThreeElements['mesh']) {
  // const ref = useRef<THREE.Mesh>(null!) // this uses the import of THREE from 'three'
  const ref = useRef<ThreeElements['mesh']>(null!) // this uses the import of ThreeElements from 'react-three-fiber'
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // const colorMap = useLoader(TextureLoader, 'moon.jpg')
  // const colorMap = useLoader(TextureLoader, 'cross.jpg')
  // const colorMap = useLoader(TextureLoader, 'square Profile photo - Iris - profesional.png')
  const colorMap = useLoader(TextureLoader, 'profilePic.png')

  // 
  // let joe=ref.current.position.x;

  let chosenDirection = 1;

  // CHQ: automatically rotate cubes along x axis
  useFrame((state, delta) => {
    
    if(clicked)
    {
      chosenDirection = -1;
    }
    else{
      chosenDirection = 1;
    }
    ref.current.rotation.x += (delta*chosenDirection);
    // OrthographicCamera()
  })
  return (
    <mesh
      {...props}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
    // onClick={click(!clicked)}
      onPointerOver={(event) => hover(true)}
    // onPointerOver={hover(true)}
      onPointerOut={(event) => hover(false)}>
    {/* onPointerOut={hover(false)}> */}
      {/* <boxGeometry args={[3, 3, 3]} /> */}
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={hovered ? 'limegreen' : 'white'} 
        displacementScale={0.0}
        map={colorMap}
        displacementMap={colorMap}
        />
    </mesh>
  )
}

function MyTorus(props: ThreeElements['mesh'])
{ 
    // const ref = useRef<THREE.Mesh>(null!) // this uses the import of THREE from 'three'
    const ref = useRef<ThreeElements['mesh']>(null!) // this uses the import of ThreeElements from 'react-three-fiber'
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // const colorMap = useLoader(TextureLoader, 'profilePic.png')

  let chosenDirection = 1;

  // CHQ: automatically rotate cubes along x axis
  useFrame((state, delta) => {
    
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.005;
    ref.current.rotation.z += 0.01;
    // ref.current.rotation.x += (delta*chosenDirection);
    // OrthographicCamera()
  })

  // const torusSize = 3;
  const torusSize = 1.5;
    // const torusSize = 2;
  return (
    <mesh
      {...props}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
    // onClick={click(!clicked)}
      onPointerOver={(event) => hover(true)}
    // onPointerOver={hover(true)}
      onPointerOut={(event) => hover(false)}>
    {/* onPointerOut={hover(false)}> */}

          <torusGeometry args={[torusSize*(10/3), torusSize*(1), 32, 256]} />
        <meshStandardMaterial 
        color={hovered ? 'limegreen' : 'orange'} 
        displacementScale={0.2}
        // map={colorMap}
        // displacementMap={colorMap}
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
      <Box position={[2, 0, 0]} />
      {/* <Box position={[1.2, 0, 0]} /> */}
      <Ball position={[-10, 0, 30]}  />
      {/* <MyTorus position={[-0.5, 2, 0.2]}/> */}
      <MyTorus position={[0, 0, 0]}/>
      {/* <InfoOfBoundingBody/> */}
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