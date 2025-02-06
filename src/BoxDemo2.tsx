// Source: 
// [1]: https://codesandbox.io/p/sandbox/gifted-varahamihira-rrppl0y8l4?file=%2Fsrc%2FApp.js%3A1%2C1-40%2C1

// [2]: https://onion2k.github.io/r3f-by-example/examples/cameras/orthographic-camera/

// [3]: https://github.com/pmndrs/react-three-fiber/discussions/630

// [4]: https://www.google.com/search?client=firefox-b-1-d&q=set+cavnas+size+in+react+three+fiber (from GeminiAI response to search "set canvas size in react three fiber")

import * as THREE from 'three'

// [1]
// import { useRef, useState } from 'react'
import { useRef, useState, useEffect } from 'react'

// import { Canvas, useFrame } from '@react-three/fiber'
 // CHQ - below is the line I wrote to test purpose of useFrame in code
// import { Canvas, ThreeElements } from '@react-three/fiber'
// import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { Canvas, useThree, useFrame, ThreeElements } from '@react-three/fiber'



// import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei'

// import { cameraPosition } from 'three/tsl'

function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

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
      <meshStandardMaterial color={hovered ? 'limegreen' : 'orange'} />
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
export default function BoxDemo2() {

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
      
    <Canvas style={{width: innerWidth, height: `200px`}}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
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