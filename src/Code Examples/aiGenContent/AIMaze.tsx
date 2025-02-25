// import React, { useRef, useEffect, useState } from 'react';
import { useRef, useState, useEffect, Suspense } from 'react'

import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useScroll } from '@react-three/drei';
import * as THREE from 'three';

const NUMBER_OF_SPHERES = 20;

const SPHERE_SIZE = 0.5;

const INTERSPHERE_SPACING = 2;

interface SphereProps {
  position: [number, number, number];
}

const Sphere: React.FC<SphereProps> = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[SPHERE_SIZE, 32, 32]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

const Floor: React.FC = () => {
  return (
    // <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -(SPHERE_SIZE)/1, 0]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
};

const Spheres: React.FC = () => {
  const spheres = Array.from({ length: NUMBER_OF_SPHERES }, (_, i) => {
    const x = INTERSPHERE_SPACING*((2.0*SPHERE_SIZE)*Math.floor((Math.random() - 0.5) * 20));
    const z = INTERSPHERE_SPACING*((2.0*SPHERE_SIZE)*Math.floor((Math.random() - 0.5) * 20));
    return <Sphere key={i} position={[x, 0, z]} />;
  }); 
  return <>{spheres}</>;
};

// FIXME: causing all sorts of issues
const CameraControl1: React.FC = () => {
  const camera = useRef<THREE.PerspectiveCamera>(null!); // Non-null assertion (!)
  const { gl } = useThree();
  const scroll = useScroll();
  const [targetSphereIndex, setTargetSphereIndex] = useState(0);

  const spherePositions = Array.from({ length: NUMBER_OF_SPHERES }, (_, i) => {
    const x = (Math.random() - 0.5) * 20;
    const z = (Math.random() - 0.5) * 20;
    return new THREE.Vector3(x, 0.5, z);
  });

  useFrame(() => {
    if (scroll) { // Check if scroll is available
        const scrollProgress = scroll.offset;

    const newTargetIndex = Math.floor(scrollProgress * NUMBER_OF_SPHERES);
    if (newTargetIndex !== targetSphereIndex && newTargetIndex < NUMBER_OF_SPHERES) {
      setTargetSphereIndex(newTargetIndex);
    }

    const targetPosition = spherePositions[targetSphereIndex];
    if (false) {
    // if (targetPosition) {
        camera.current.position.lerp(targetPosition, 0.05);
        const lookAtPosition = new THREE.Vector3(
          targetPosition.x,
          targetPosition.y + 0.2,
          targetPosition.z + 1
        );
  
        camera.current.lookAt(lookAtPosition);
      }
    }

    camera.current.position.setComponent(0.13, 0.14)
  });

  useEffect(() => {
    camera.current.position.set(0, 2, 10);
    camera.current.lookAt(new THREE.Vector3(0, 0, 0));
  }, []);

//   const myVar = gl.getSize;
//   alert(myVar.toString())
  
  return (
    <perspectiveCamera
      ref={camera}
      fov={75}
    //   aspect={100/ 200}
      aspect={gl.domElement.clientWidth/ gl.domElement.clientHeight}
      near={0.1}
      far={100}
    />
  );
};


const CameraControl2: React.FC = () => {
  const camera = useRef<THREE.PerspectiveCamera>(null!);
  const { gl } = useThree();
  const targetZ = -50; // How far the camera should zoom

  useEffect(() => {
    // This is the ONLY place where you should directly manipulate camera.current
    if (camera.current) {
      camera.current.position.set(0, 5, 10);
      camera.current.lookAt(0, 0, 0);
    }
  }, []); // Empty dependency array ensures this runs only once after mount

  useFrame((state, delta) => {
    if (camera.current) {  // Still important to check in useFrame!
      camera.current.position.z -= 0.5 * 10 * delta;

      if (camera.current.position.z <= targetZ) {
        camera.current.position.z = targetZ;
      }
    }
  });
  return (
    <perspectiveCamera
      ref={camera}
      fov={75}
      aspect={gl.domElement.clientWidth / gl.domElement.clientHeight}
      near={0.1}
      far={1000} // Increased far plane for better visibility
    />
  );
};



const Scene: React.FC = () => {
  return (
    <>
      <CameraControl1 />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <Floor />
      <Spheres />
    </>
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
      {/* <CameraControl1 /> */}
      <CameraControl2 />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Suspense fallback={null}> <Background /> </Suspense>
      <Floor />
      <Spheres /> 

      {/* will comment out later when I get the movement of camera working */}
      {/* <OrbitControls /> */}

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

const AIMaze: React.FC = () => {

    // const myChoice = 1;

  return (
    <div className='Threejs-bg-outerspace'>
    <Canvas style={{width: `100vw`, height:`100vh`}}>
        {/* {
            if(myChoice === 1)
            {<Scene />}
            else
            {
            <MySpaceScene /> 
            }
        } */}
        <MySpaceScene /> 
        {/* <Scene />  */}
    </Canvas>
    </div>

  );
};

export default AIMaze;