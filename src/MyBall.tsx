// Source: 
// [1]: https://codesandbox.io/p/sandbox/gifted-varahamihira-rrppl0y8l4?file=%2Fsrc%2FApp.js%3A1%2C1-40%2C1

// [2]: https://onion2k.github.io/r3f-by-example/examples/cameras/orthographic-camera/

// [3]: https://github.com/pmndrs/react-three-fiber/discussions/630

// [4]: https://www.google.com/search?client=firefox-b-1-d&q=set+cavnas+size+in+react+three+fiber (from GeminiAI response to search "set canvas size in react three fiber")

import * as THREE from 'three'

// [1]
import { useRef, useState } from 'react'
// import { useRef, useState, useEffect } from 'react'

// import { Canvas, useFrame } from '@react-three/fiber'
 // CHQ - below is the line I wrote to test purpose of useFrame in code
// import { Canvas, ThreeElements } from '@react-three/fiber'


// import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
// import { Canvas, useThree, useFrame, ThreeElements } from '@react-three/fiber'
import { useFrame, ThreeElements } from '@react-three/fiber'


// import { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'


// import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei'

// import { cameraPosition } from 'three/tsl'


// function Scene() {
// //   const colorMap = useLoader(TextureLoader, 'PavingStones092_1K_Color.jpg')
// const colorMap = useLoader(TextureLoader, 'cross.jpg')
// // const colorMap = useLoader(TextureLoader, 'moon.jpg')

//   return (
//     <>
//       <ambientLight intensity={0.2} />
//       <directionalLight />
//       <mesh>
//         <sphereGeometry args={[1, 32, 32]} />
//         {/* CHQ: below also worked */}
//         {/* <coneGeometry args={[1, 32, 32]} /> */}
//         <meshStandardMaterial
//           displacementScale={0.2}
//           map={colorMap}
//           displacementMap={colorMap}
//         //   normalMap={colorMap}
//         //   roughnessMap={colorMap}
//         //   aoMap={colorMap}
//         />
//       </mesh>
//     </>
//   )
// }

export function Ball(props: ThreeElements['mesh']) {

// function Ball(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const colorMap = useLoader(TextureLoader, 'moon.jpg')
//   const colorMap = useLoader(TextureLoader, 'cross.jpg')

  // CHQ: automatically rotate ball along y axis
  //   useFrame((delta) => {

  useFrame((_state, delta) => {
    // ref.current.rotation.y += delta;
    ref.current.rotation.y += (clicked ? delta : -delta);

    // ref.current.position.y += (clicked ? Math.cos(delta)/100 : -Math.cos(delta)/100);
    ref.current.position.y = (clicked ? Math.cos(delta)/100 : 0);

    // makes it go up forvere
    // ref.current.position.y = (clicked ? Math.cos(delta) : 0);

    // gotta figure out how to do this
    // ref.current.position.y = (clicked ? mouseX : 0);
    // OrthographicCamera()
  })
  return (
    <mesh
      {...props}
      ref={ref}
    //   scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
       onPointerOver={() => hover(true)}
       onPointerOut={() => hover(false)}>
       <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial 
        color={hovered ? 'limegreen' : 'white'} 
        displacementScale={0.2}
        map={colorMap}
        displacementMap={colorMap}
        />
    </mesh>
  )
}

// function SetCanvasSize(){
//   const { size, setSize } = useThree();
//   useEffect(() => {
//     // Set the canvas size dynamically
//     const handleResize = () => {
//       // Expected 2-5 arguments, but got 1.ts(2554)
//       // setSize({ width: window.innerWidth, height: window.innerHeight });
//       setSize(window.innerWidth=800, window.innerHeight=600);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initial size setting

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);
// }


// 
export function MyBall(props: {windowMinimized:boolean}) {

// export default function MyBall(props: {windowMinimized:boolean}) {

  // [2] - for orthographic shadows
  // [3] - for the size attribute of Canvas
  return (
    // <Canvas orthographic shadows dpr={[1, 2]} camera={{ zoom: 160, position: [-10, 10, 10], fov: 35 }}>
    // <Canvas>
    /** Got error
     * Type '{ children: Element[]; size: { width: number; height: number; }; }' is not assignable to type 'IntrinsicAttributes & Props & RefAttributes<HTMLCanvasElement>'.
  Property 'size' does not exist on type 'IntrinsicAttributes & Props & RefAttributes<HTMLCanvasElement>'.ts(2322)
     */
    // <Canvas size={{ width: 800, height: 600 }}>
    // <Canvas>
      // <SetCanvasSize/>
      // CHQ: got error [4]
      // Type 'boolean' is not assignable to type 'new (cb: ResizeObserverCallback) => ResizeObserver'.ts(2322)
    // <Canvas resize={{ polyfill: true }}>
 
    // given a line like this above failed, I am surprised that the following line worked
    //     <Canvas style={{width: 55, height: 200}}>


    <div className='Threejs-bg-color'>
      
      {/* CHQ: below shrinks the cubes but not the window in which they exist. How does
      one access the full screen button unless it is an overlay? Exaclty. */}
    {/* <Canvas style={{width: innerWidth, height: props.windowMinimized? `20vh`: `30vh`}}> */}
    <Canvas style={{width: innerWidth, height: props.windowMinimized? `200px`: `600px`}}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Ball position={[-3.6, 0, 0]} />
      {/* <Box position={[1.2, 0, 0]} /> */}
      <OrbitControls />
 
    </Canvas>
    </div>
  )
}

// I think I can put
// controls.update();
//  in useFrame since it is something that must be udpated every frame