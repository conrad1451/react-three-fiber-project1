// Source: 
// [1]: https://codesandbox.io/p/sandbox/gifted-varahamihira-rrppl0y8l4?file=%2Fsrc%2FApp.js%3A1%2C1-40%2C1
// [2]: https://www.google.com/search?client=firefox-b-1-d&q=using+getBoundingClientRect+in+reactjs (search: using getBoundingClientRect in reactjs)
// [3]: https://www.google.com/search?client=firefox-b-1-d&q=array+fill+with+map+-+expectd+1-3+arguemnts+but+got+0 (search: array fill with map - expected 1-3 arguments but got 0)


import * as THREE from 'three'

import { Ball } from './MyBall'
// import { Ball, BallTest2 } from './MyBall'

// import { Canvas, useLoader } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'

// import { TextureLoader } from 'three'
import { Vector3, TextureLoader } from 'three'

 
// interface Vector3 {
//   position: [0,0,0]; 
// }


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
  // CHQ: changing the color worked when I stopped 
  return (
    <mesh
      {...props}
      // ref={ref} 
      >  
      <sphereGeometry args={[0.25, 24, 24]} />
      <meshStandardMaterial 
        // color="#ADD8E6"
        color="#FFFFFF"
        // color="#000000"
        displacementScale={0.0}
        // map={colorMap}
        // displacementMap={colorMap}
        />
    </mesh>
  )
}

// It took me about 45+15 min to realize that I should use a helpper function and then call it
// in another one to achieve the array of objects
// Also I did not realize that I should just import Vector3, i kep trying to recreate it which was 
// giving me isseues - close reading is important
function AddRandomStar(){
  // const myVector: Vector3 = new THREE.Vector3(...Array(3).fill(null).map(()=>Math.floor(100*Math.random())/(1 )));

  const myVector: Vector3 = new THREE.Vector3(...Array(3).fill(null).map(()=>THREE.MathUtils.randFloatSpread(150)));

  return(
    <>
      <Star position={myVector}/>
    </>
  )
}

function StarDistribution(){

  // const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  // const [x, y, z] = Array(3).map(() => THREE.MathUtils.randFloatSpread(100));
  // const [x, y, z] = Array(3).map(() => THREE.MathUtils.randFloatSpread(50));

  // const [x1, y1, z1] = Array(3).fill(THREE.MathUtils.randFloatSpread(50));
  //  [3]
  // const [x2, y2, z2] = Array(3).fill(null).map(()=>Math.floor(100*Math.random())/10);

  // const listOfStarCoords = Array(100).fill(null).map(()=> Array(3).fill(null).map(()=>Math.floor(100*Math.random())/10));
  // const listOfStarCoords2:number[][] = Array(100).fill(null).map(()=> Array(3).fill(null).map(()=>Math.floor(100*Math.random())/10));
  // const listOfStarCoords3:Vector3[] = Array(100).fill(null).map(()=> Array(3).fill(null).map(()=>Math.floor(100*Math.random())/10));

  // const a = new THREE.Vector3( 0, 1, 0 );

  // Property 'fill' does not exist on type 'Vector3'.ts(2339)
  // const a = new THREE.Vector3().fill(null).map(()=>Math.floor(100*Math.random())/10);

  // Property 'fill' does not exist on type 'Vector3'.ts(2339)
  // const a = new THREE.Vector3().setComponent().fill()
  // .fill(null).map(()=>Math.floor(100*Math.random())/10);

  // const myVector = new THREE.Vector3(...array);

  const myVector: Vector3 = new THREE.Vector3(...Array(3).fill(null).map(()=>Math.floor(100*Math.random())/(10*2)));
  

  // const myStarCount = 100;
  // for (let index = 0; index < myStarCount; ++index) {
  //   const element = Array(3).fill(null).map(()=>Math.floor(100*Math.random())/10); 
  // }
/**<Star position={[0,0,0]}/>
      <Star position={[0.4,0,0]}/>
      <Star position={[0,0.6,0]}/> */

      // solution = change the top on the array being used
      /**
       * Type 'number[]' is not assignable to type 'Vector3 | undefined'.
  Type 'number[]' is not assignable to type 'Vector3 | [x: number, y: number, z: number] | readonly [x: number, y: number, z: number]'.
    Type 'number[]' is not assignable to type '[x: number, y: number, z: number]'.
      Target requires 3 element(s) but source may have fewer.ts(2322)
       */
  return(
    <>
    {/* {Array(100).map((item, index) => (
        <Star key={index} position={new THREE.Vector3(...Array(3).fill(null).map(()=>Math.floor(100*Math.random())/(10*2)))}/>
      ))} */}
          {/* {listOfStarCoords.map((item, index) => (
        <Star key={index} position={item}/>
      ))} */}

      {/* {Array(100).map((item, index) => (
        <AddRandomStar key={index} />
      ))}  */}

      <Star position={myVector}/>
      {/* <AddRandomStar/>
      <AddRandomStar/>
      <AddRandomStar/>
      <AddRandomStar/>
      <AddRandomStar/> */}
      
      {/* if I use the div instead of the empty angle brackets, I get this error:
      Uncaught Error: R3F: Div is not part of the THREE namespace! 
      Did you forget to extend? See: 
      https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively */}
      <>
      {Array(200).fill(null).map((_, index) => (
        <AddRandomStar key={index} />
      ))}
      </>

      {/* <Star position={new THREE.Vector3(...Array(3).fill(null).map(()=>Math.floor(100*Math.random())/(10*2)))}/> */}
      {/* <Star position={new THREE.Vector3(...Array(3).fill(null).map(()=>Math.floor(100*Math.random())/(10*2)))}/> */}
    </>
  )
}

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // const colorMap = useLoader(TextureLoader, 'moon.jpg')
  // const colorMap = useLoader(TextureLoader, 'cross.jpg')
  // const colorMap = useLoader(TextureLoader, 'square Profile photo - Iris - profesional.png')
  const colorMap = useLoader(TextureLoader, 'profilePic.png')

  // 

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
  const ref = useRef<THREE.Mesh>(null!)
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
      <StarDistribution/>
      {/* <Star position={[0,0,0]}/> */}
      {/* <InfoOfBoundingBody/> */} 

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