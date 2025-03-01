// Source: 
// [1]: https://codesandbox.io/p/sandbox/gifted-varahamihira-rrppl0y8l4?file=%2Fsrc%2FApp.js%3A1%2C1-40%2C1
// [2]: https://www.google.com/search?client=firefox-b-1-d&q=using+getBoundingClientRect+in+reactjs (search: using getBoundingClientRect in reactjs)
// [3]: https://www.google.com/search?client=firefox-b-1-d&q=array+fill+with+map+-+expectd+1-3+arguemnts+but+got+0 (search: array fill with map - expected 1-3 arguments but got 0)

import * as THREE from 'three'

import { Ball } from './MyBall'

import { useRef, useState, useEffect, Suspense } from 'react'

import { Canvas, useLoader, useFrame, ThreeElements } from '@react-three/fiber'

import { OrbitControls } from '@react-three/drei'
 
interface TextDisplayProps {
  text: string;
}

// import { OrbitControls, OrthographicCamera } from '@react-three/drei'
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

  const myVector: THREE.Vector3 = new THREE.Vector3(...Array(3).fill(null).map(()=>THREE.MathUtils.randFloatSpread(150)));

  return(
    <>
      <Star position={myVector}/>
    </>
  )
}

function StarDistribution(){
  const myVector: THREE.Vector3 = new THREE.Vector3(...Array(3).fill(null).map(()=>Math.floor(100*Math.random())/(10*2)));

  return(
    <> 
      <Star position={myVector}/> 
      
      {/* if I use the div instead of the empty angle brackets, I get this error:
      Uncaught Error: R3F: Div is not part of the THREE namespace! 
      Did you forget to extend? See: 
      https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively */}
      <>
      {Array(200).fill(null).map((_, index) => (
        <AddRandomStar key={index} />
      ))}
      </> 
    </>
  )
}

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // const colorMap = useLoader(THREE.TextureLoader, 'moon.jpg')
  // const colorMap = useLoader(THREE.TextureLoader, 'cross.jpg')
  // const colorMap = useLoader(THREE.TextureLoader, 'square Profile photo - Iris - profesional.png')
  const colorMap = useLoader(THREE.TextureLoader, 'profilePic.png')

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
  // const colorMap = useLoader(THREE.TextureLoader, 'profilePic.png')

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
 
// Type 'string' is not assignable to type 'TextDisplayProps'.ts(2322)
// const TextDisplay = (props: {theText: TextDisplayProps}) => {
const TextDisplay = (props: {theText: string}) => {

// const TextDisplay: React.FC<TextDisplayProps> = ({ text }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
        meshRef.current.position.y += 0.01;
    //   meshRef.current.rotation.y += 0.01; // Optional: Rotate the text
    }
  });

  return (
    <group>
      <mesh position={[0, 0, -0.1]}> {/* Black background mesh */}
        <planeGeometry args={[5, 1]} /> {/* Adjust size as needed */}
        <meshBasicMaterial color="black" transparent opacity={0.5} />
      </mesh>
      <Text
        ref={meshRef}
        position={[0, 0, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {props.theText}
      </Text>
    </group>
  );
};

const Background = () => {
    // const mesh = useRef();
    const ref = useRef<THREE.Mesh>(null!)
    // const texture = useLoader(THREE.TextureLoader, '/space.jpg');
    const texture = useLoader(THREE.TextureLoader, 'space.jpg');

    return (
        // <mesh ref={mesh} scale={[100, 100, 100]}> {/* Scale it up! */}
        <mesh ref={ref} scale={[100, 100, 100]}> {/* Scale it up! */}
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial map={texture} side={THREE.BackSide} /> {/* Important: BackSide */}
        </mesh>
    );
}

function MySpaceScene(){
  return(
    <>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Suspense fallback={null}> <Background /> </Suspense>
      <Box position={[2, 0, 0]} />
      {/* <Box position={[1.2, 0, 0]} /> */}
      <Ball position={[-10, 0, 30]}  />
      {/* <MyTorus position={[-0.5, 2, 0.2]}/> */}
      <MyTorus position={[0, 0, 0]}/>
      <StarDistribution/>

{/* Type 'string' is not assignable to type 'TextDisplayProps'.ts(2322) */}
      <TextDisplay theText="Hello, React Three Fiber!" />

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
    </>
  )
}


export default function OuterSpaceComponent(props: {windowMinimized:boolean}) {

  
  return (
       <div className='Threejs-bg-outerspace'>
      
      {/* CHQ: below shrinks the cubes but not the window in which they exist. How does
      one access the full screen button unless it is an overlay? Exaclty. */}
    {/* <Canvas style={{width: innerWidth, height: props.windowMinimized? `20vh`: `30vh`}}> */}
    {/* <Canvas style={{width: innerWidth, height: props.windowMinimized? `200px`: `600px `}}> */}
    <Canvas style={{width: props.windowMinimized? `200px`: `100vw`, height: props.windowMinimized? `200px`: `100vh`}}>
      <MySpaceScene/>
    </Canvas>
    </div>
  )
}

// I think I can put
// controls.update();
//  in useFrame since it is something that must be udpated every frame