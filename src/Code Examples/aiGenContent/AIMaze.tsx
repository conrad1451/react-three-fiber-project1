import React, { useRef, useState, useEffect, Suspense } from 'react'

import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { FirstPersonControls } from '@react-three/drei';
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
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Suspense fallback={null}> <Background /> </Suspense>
      <GrowingSphere/>
      <Floor />
      <Spheres /> 
    </>
  )
}
 
const TextOverlayAbout2 = () => {
  const [textTop, setTextTop] = useState('80%'); // Initial top position

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setTextTop((prevTop) => {
          const prevValue = parseFloat(prevTop);
          return `${Math.max(0, prevValue - 5)}%`; // Move up by 5%, prevent going below 0
        });
      } else if (event.key === 'ArrowDown') {
        setTextTop((prevTop) => {
          const prevValue = parseFloat(prevTop);
          return `${Math.min(80, prevValue + 5)}%`; // Move up by 5%, prevent going below 0
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: textTop, // Use the state variable
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: 'relative',
          transform: 'translate(-10%, -30%)',
          left: '75%',
          margin: '1vw',
          padding: '1vw',
          width: '45vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex' }}>
          {Array(1)
            .fill(null)
            .map((_, index) => (
              <div className="html-overlay" key={index}>
                <h1>Conrad</h1>
                <p>
                  My name is Conrad Hansen-Quartey. I live in West Haven, CT. I
                  majored in Engineering Science.
                </p>
                <p>
                  With a combination of self-taught and academic training, I
                  have both the passion and engineering skill of a professional
                  software engineer. Having self-taught programming languages
                  throughout high school and learning computer programming
                  design principles and techniques in college, I have become a
                  well-rounded computer scientist. I have a passion not only
                  for developing software, but for solving problems in creative
                  ways. I am deeply committed to using my talents and gifts to
                  serve those around me and society in general.
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};


const AIMaze: React.FC = () => {
  const [cameraZoom, setCameraZoom] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setCameraZoom((prevZoom) => prevZoom - 2);
      } else if (event.key === 'ArrowRight') {
        setCameraZoom((prevZoom) => prevZoom + 2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const CameraControls = () => {
    const { camera } = useThree();

    useFrame(() => {
      camera.position.z = 10 + cameraZoom;
    });

    return null;
  };

  return (
    <div className="Threejs-bg-outerspace">
      <Canvas style={{ width: `100vw`, height: `100vh` }}>
        <FirstPersonControls movementSpeed={1} autoForward={false} />
        <MySpaceScene />
        <CameraControls />
      </Canvas>
      <TextOverlayAbout2 />
    </div>
  );
};

export default AIMaze;