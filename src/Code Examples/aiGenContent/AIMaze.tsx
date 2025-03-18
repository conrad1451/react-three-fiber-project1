// import React, { useRef, useEffect, useState } from 'react';
import { useRef, useState, useEffect, Suspense } from 'react'

import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { OrbitControls, useScroll } from '@react-three/drei';
import { FirstPersonControls, useScroll } from '@react-three/drei';
// import { useScroll } from '@react-three/drei';

import * as THREE from 'three';

const NUMBER_OF_SPHERES = 20;

const SPHERE_SIZE = 0.5;

const INTERSPHERE_SPACING = 2;

interface SphereProps {
  position: [number, number, number];
}

const GrowingSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sphereScale, setSphereScale] = useState(1); // Initial scale

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Adjust scale based on scroll position
    const newScale = 1 + scrollPosition * 0.001; // Adjust multiplier for sensitivity
    setSphereScale(newScale);
  }, [scrollPosition]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(sphereScale, sphereScale, sphereScale);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 2, 0]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

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

const CameraControl: React.FC = () => {
  const camera = useRef<THREE.PerspectiveCamera>(null!);
  const { gl } = useThree();
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "w": // Also allow 'w' for forward
          setMovement({ ...movement, forward: true });
          break;
        case "ArrowDown":
        case "s": // Also allow 's' for backward
          setMovement({ ...movement, backward: true });
          break;
        case "ArrowLeft":
        case "a": // Also allow 'a' for left
          setMovement({ ...movement, right: true });
          break;
        case "ArrowRight":
        case "d": // Also allow 'd' for right
          setMovement({ ...movement, right: true });
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
          setMovement({ ...movement, forward: true });
          break;
        case "ArrowDown":
        case "s":
          setMovement({ ...movement, backward: false });
          break;
        case "ArrowLeft":
        case "a":
          setMovement({ ...movement, right: false });
          break;
        case "ArrowRight":
        case "d":
          setMovement({ ...movement, right: false });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (camera.current) {
      camera.current.position.set(0, 5, 10);
      camera.current.lookAt(0, 0, 0);
    }
  }, []);

  useFrame((state, delta) => {
    if (camera.current) {
      const moveSpeed = 5 * delta; // Adjust speed as needed

      if (movement.forward) {
        camera.current.position.z -= moveSpeed; // Move forward
      }
      if (movement.backward) {
        camera.current.position.z += moveSpeed; // Move backward
      }
      if (movement.left) {
        camera.current.position.x -= moveSpeed; // Move left
      }
      if (movement.right) {
        camera.current.position.x += moveSpeed; // Move right
      }
    }
  });

  return (
    <perspectiveCamera
      ref={camera}
      fov={75}
      aspect={gl.domElement.clientWidth / gl.domElement.clientHeight}
      near={0.1}
      far={1000}
    />
  );
};

const CameraControlAlt: React.FC = () => {
    const camera = useRef<THREE.PerspectiveCamera>(null!);
    const { gl } = useThree();
    const [movement, setMovement] = useState({
      forward: false,
      backward: false,
      left: false,
      right: false,
    });
    const [rotation, setRotation] = useState(0); // Rotation angle
  
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case "ArrowUp":
          case "i":
            setMovement({ ...movement, forward: true });
            break;
          case "ArrowDown":
          case "k":
            setMovement({ ...movement, backward: true });
            break;
          case "ArrowLeft":
          case "j":
            setMovement({ ...movement, left: true });
            setRotation(-0.02); // Start rotating left
            break;
          case "ArrowRight":
          case "l":
            setMovement({ ...movement, right: true });
            setRotation(0.02); // Start rotating right
            break;
        }
      };
  
      const handleKeyUp = (event: KeyboardEvent) => {
        switch (event.key) {
          case "ArrowUp":
          case "i":
            setMovement({ ...movement, forward: false });
            break;
          case "ArrowDown":
          case "k":
            setMovement({ ...movement, backward: false });
            break;
          case "ArrowLeft":
          case "j":
          case "ArrowRight":
          case "l":
            setMovement({ ...movement, left: false, right: false });
            setRotation(0); // Stop rotating
            break;
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }, []);
  
    useEffect(() => {
      if (camera.current) {
        camera.current.position.set(0, 5, 10);
        camera.current.lookAt(0, 0, 0);
      }
    }, []);
  
    useFrame((state, delta) => {
      if (camera.current) {
        const moveSpeed = 5 * delta;
        const rotationSpeed = 2 * delta;  // Adjust rotation speed
  
        if (movement.forward) {
          camera.current.position.z -= moveSpeed * Math.cos(rotation);
          camera.current.position.x -= moveSpeed * Math.sin(rotation);
        }
        if (movement.backward) {
          camera.current.position.z += moveSpeed * Math.cos(rotation);
          camera.current.position.x += moveSpeed * Math.sin(rotation);
        }
  
        // Apply rotation
        camera.current.rotation.y += rotation * rotationSpeed;
  
      }
    });
  
    return (
      <perspectiveCamera
        ref={camera}
        fov={75}
        aspect={gl.domElement.clientWidth / gl.domElement.clientHeight}
        near={0.1}
        far={1000}
      />
    );
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



const TextOverlayAbout2 = () => {
  //   const { camera } = useThree();
  //   const htmlOverlayRef = useRef<HTMLDivElement>(null);
  
  // useFrame(() => {
  //     if (htmlOverlayRef.current) {
  //         const scrollAmount = camera.position.z * 1;
  //         htmlOverlayRef.current.style.transform = `translateY(-${scrollAmount}px)`;
  //     }
  // });
    return (
      <div style={{ position: 'relative', transform: 'translate(-10%, -30%)',
        left: '75%', margin: '1vw', padding: '1vw',  width: '45vw', display: 'flex', justifyContent: 'center' }}>
  
        <div style={{ display: 'flex' }}>
          {Array(1).fill(null).map((_, index) => (
            <div style={{margin: '0vw', padding: '3vw'}} className="html-overlay" key={index}>
                 <h1>Conrad</h1>
                <p> My name is Conrad Hansen-Quartey. I live in West Haven, CT. I majored in Engineering Science. </p>
                <p> With a combination of self-taught and academic training, I have both the passion and engineering skill of a professional software engineer. Having self-taught programming languages throughout high school and learning computer programming design principles and techniques in college, I have become a well-rounded computer scientist. I have a passion not only for developing software, but for solving problems in creative ways. I am deeply committed to using my talents and gifts to serve those around me and society in general.  </p>
             </div>
          ))}
        </div>
      </div>
    );
};

const Scene: React.FC = () => {
  return (
    <>
      {/* <CameraControl1 /> */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <GrowingSphere />

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
      {/* <CameraControl2 /> */}
      {/* <CameraControlAlt /> */}
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Suspense fallback={null}> <Background /> </Suspense>
      <GrowingSphere/>
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
      <div
        style={{
          position: 'absolute',
          top: '80%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          zIndex: 10,
        }}
      >
        <TextOverlayAbout2 />
      </div> 
    <Canvas style={{width: `100vw`, height:`100vh`}}>
    {/* <FirstPersonControls mouseDragOn={true}/> */}
      <FirstPersonControls movementSpeed={1} autoForward={false}/>
      {/* <FirstPersonControls movementSpeed={-1} autoForward={false}/> */}
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