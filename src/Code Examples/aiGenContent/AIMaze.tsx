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

// const BiographyText = (props: {theTextTop: number}) => {
// const BiographyText = (props: {theTextTop: string}) => {
const BiographyText = (props: { theTextTop: string; onHeightChange: (height: number) => void }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && props.onHeightChange) {
      props.onHeightChange(textRef.current.offsetHeight);
    }
  }, [props.onHeightChange]);

  return(
    <div
    style={{
      position: 'absolute',
      top: props.theTextTop, // Use the state variable
      // top: (props.theTextTop)+'%', // Use the state variable
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
            <div className="html-overlay" key={index} style={{ 
          display: 'flex', 
          margin: '1vw',
          padding: '2vw'
        }}>
          <h1>About Me</h1>
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
  </div>);

}

const ProjectsText = (props: {theTextTop: string}) => {
  return(
    <div
    style={{
      position: 'absolute',
      top: props.theTextTop, // Use the state variable
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
          <div className="html-overlay">
              <h1>PROJECTS</h1>
            </div> 
      </div>
    </div>
  </div>);

}

 
const ProjectList = (props: {theTextTop: string}) => {

  const projectName = [
    "Creative Contentions", 
    "Bee Swarm Simulator (bss)"
  ];
  const projectSubtext1 = [
    "(2D block world game)", 
    "(spin-off of block character 3D world in roblox)"
  ]; 
  const projectSubtext2 = [
    "Programming Language: Processing (based on Java)", 
    "Programming Language: JavaScript (aka VanillaJS)"
  ];
  
  const projectPurposes = [
    "This is a 2D world of block characters, where the player can break down and collect blocks, craft new items, and fight mobs and monsters.",
    "This is a 3D world of block characters in which the main player controls a swarm of bees. The main player can talk to characters (mostly bears) to receive and complete quests and earn honey and items. The player can use honey to buy bee eggs and items to upgrade their tools and storage pack."
  ];

  const contributionPoints = [
    [
      "Reduced CPU utilization by 42% through code refactoring to reduce time complexity of several sections of code.",
      "Reduced time complexity of multiple functions from linear to constant time and removed duplicated sections of code.", 
      "Make technical trade-offs to balance time complexity with file size to ensure execution speed at scale."
    ],
    [
        "Improved readability of code by introducing comments for all edits from May 2023 and onward",
        "Improved playability of game in several ways, including \n\t*Making all menus easily accessible by keyboard shortcut \n\t*Fixed an issue where the camera panning following the mouse position prevented the user from being able to select menus with the mouse"
    ] 
  ];

  return(
    <div
    style={{
      position: 'absolute',
      top: props.theTextTop, // Use the state variable
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
          {Array(2)
          .fill(null)
          .map((_, index) => (
            <div className="html-overlay" key={index} style={{ 
          display: 'flex', 
          margin: '1vw',
          padding: '2vw'
        }}>
          <h1>{projectName[index]}</h1>
          <p>{projectSubtext1[index]}</p>
          <p>{projectSubtext2[index]}</p>
          <p>{projectPurposes[index]}</p>
          <p>{contributionPoints[index]}</p>
        </div>
      ))}
      </div>
    </div>
  </div>

 
  )
}

const OuterTextblock = (props: { theTextTop: string; onHeightChange: (height: number) => void }) => {
// const OuterTextblock = (props: {onHeightChange: (height: number) => void }) => {
  // const [textTop, setTextTop] = useState('10%'); // Adjust initial top position
  const [biographyHeight, setBiographyHeight] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current && props.onHeightChange) {
      props.onHeightChange(textRef.current.offsetHeight);
    }
  }, [props.onHeightChange]);
  
  return (
    // CHQ: position: sticky would work here excpet I had to disable the vertical scroll os that the 
    // scroll activated three fiber animations function baed on scroll
    <div style={{ position: 'absolute', top: props.theTextTop, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: 10, left: '2%', width: '45%', zIndex: 10, pointerEvents: 'auto' }}>
        <BiographyText theTextTop={'0%'} onHeightChange={setBiographyHeight} />
      </div>
      <div style={{ position: 'absolute', top: '200%', left: '50%', transform: 'translateX(-50%)', width: '96%', maxWidth: '1200px', zIndex: 10, pointerEvents: 'auto' }}>
      {/* <div style={{ position: 'absolute', top: getProjectsListTop(), left: '50%', transform: 'translateX(-50%)', width: '96%', maxWidth: '1200px', zIndex: 10, pointerEvents: 'auto' }}> */}
        <ProjectList theTextTop={'0%'} />
        {/* <ProjectList theTextTop={'50%'} /> */}
      </div>
      {/* <ProjectsText theTextTop={getProjectsTop()} /> */}
    </div>
  );
}
 
const TextOverlayAbout2 = () => {
  const [textTop, setTextTop] = useState('10%'); // Adjust initial top position
  const [biographyHeight, setBiographyHeight] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setTextTop((prevTop) => {
          const prevValue = parseFloat(prevTop);
          return `${Math.max(5, prevValue - 5)}%`; // Move up by 5%
        });
      } else if (event.key === 'ArrowDown') {
        setTextTop((prevTop) => {
          const prevValue = parseFloat(prevTop);
          return `${Math.min(80, prevValue + 5)}%`; // Move down by 5%
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getProjectsTop = () => {
    return `${parseFloat(textTop) + biographyHeight + 20}px`; // Adjust spacing
  };

  const getProjectsListTop = () => {
    return `50%`; // Center the project list vertically (adjust as needed)
  };

  return (
    // textTop
    <OuterTextblock theTextTop={textTop} onHeightChange={setBiographyHeight} />
    // <OuterTextblock theTextTop={'0%'} onHeightChange={setBiographyHeight} />

    // <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
    //   <div style={{ position: 'absolute', top: textTop, left: '2%', width: '45%', zIndex: 10, pointerEvents: 'auto' }}>
    //     <BiographyText theTextTop={'0%'} onHeightChange={setBiographyHeight} />
    //   </div>
    //   <div style={{ position: 'absolute', top: getProjectsListTop(), left: '50%', transform: 'translateX(-50%)', width: '96%', maxWidth: '1200px', zIndex: 10, pointerEvents: 'auto' }}>
    //     <ProjectList theTextTop={'0%'} />
    //   </div>
    //   {/* <ProjectsText theTextTop={getProjectsTop()} /> */}
    // </div>
  );
};

const AIMaze: React.FC = () => {
  const [cameraZoom, setCameraZoom] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) {
        // Scrolling allowed, no action needed here
      } else {
        // Scrolling disabled, prevent default behavior
        window.scrollTo(0, 0); // Reset scroll position to top
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setCameraZoom((prevZoom) => prevZoom - 2);
      } else if (event.key === 'ArrowRight') {
        setCameraZoom((prevZoom) => prevZoom + 2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling]);

  const CameraControls = () => {
    const { camera } = useThree();

    useFrame(() => {
      camera.position.z = 10 + cameraZoom;
    });

    return null;
  };

  return (
    <div
      className="Threejs-bg-outerspace"
      style={{
        position: 'relative',
        height: '100vh',
        overflowY: isScrolling ? 'auto' : 'hidden',
      }}
    >
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