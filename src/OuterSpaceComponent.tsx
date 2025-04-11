// Source: 
// [1]: https://codesandbox.io/p/sandbox/gifted-varahamihira-rrppl0y8l4?file=%2Fsrc%2FApp.js%3A1%2C1-40%2C1
// [2]: https://www.google.com/search?client=firefox-b-1-d&q=using+getBoundingClientRect+in+reactjs (search: using getBoundingClientRect in reactjs)
// [3]: https://www.google.com/search?client=firefox-b-1-d&q=array+fill+with+map+-+expectd+1-3+arguemnts+but+got+0 (search: array fill with map - expected 1-3 arguments but got 0)
// [4]: https://www.google.com/search?client=firefox-b-1-d&q=how+to+do+fractional+powers+in+javascript

import * as THREE from 'three'

import { Ball } from './MyBall'

import { useRef, useState, useEffect, Suspense } from 'react'

import { Canvas, useLoader, useFrame, ThreeElements, useThree } from '@react-three/fiber'

// import { OrbitControls, Text } from '@react-three/drei';
 
// interface TextDisplayProps {
//   text: string;
// }


interface LinkButtonProps {
  url: string;
  buttonText: string;
  style?: React.CSSProperties; // Optional styling for the button
}

const LinkButton: React.FC<LinkButtonProps> = ({ url, buttonText, style }) => {
  const handleClick = () => {
    window.open(url, '_blank'); // Opens the URL in a new tab
    // If you want to open in the same tab, use:
    // window.location.href = url;
  };

  return (
    <button onClick={handleClick} style={style}>
      {buttonText}
    </button>
  );
};

// import { OrbitControls, OrthographicCamera } from '@react-three/drei'
// import { cameraPosition } from 'three/tsl'


// FIXME: FOr some reason this functional component causes the code to crash. 
//       Will debug later
// [1]
// function InfoOfBoundingBody() {
//   // const elementRef = useRef(null);

//   // for below code I got the error 
//   /**Type 'MutableRefObject<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
//   Type 'MutableRefObject<HTMLElement>' is not assignable to type 'RefObject<HTMLDivElement>'.
//     Types of property 'current' are incompatible.
//       Property 'align' is missing in type 'HTMLElement' but required in type 'HTMLDivElement'. */
//   // const elementRef = useRef(document.body); 

//   const elementRef = useRef<HTMLDivElement>(null!);
 
//   useEffect(() => {
//     const rect = elementRef.current.getBoundingClientRect();
//     console.log(rect);
//   }, []);

//   return <div ref={elementRef}>This is an element</div>;
// }

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
  useFrame((_state, delta) => {
    
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
      onClick={() => click(!clicked)}
    // onClick={click(!clicked)}
      onPointerOver={() => hover(true)}
    // onPointerOver={hover(true)}
      onPointerOut={() => hover(false)}>
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

  // let chosenDirection = 1;

  // CHQ: edits suggested by Gemini AI
  // CHQ: automatically rotate cubes along x axis
  useFrame((_state, delta) => {
    const rotationSpeed = 0.5; // Adjust as needed
    ref.current.rotation.x += rotationSpeed * delta;
    ref.current.rotation.y += (rotationSpeed / 2) * delta;
    ref.current.rotation.z += rotationSpeed * delta;
  })

  // const torusSize = 3;
  const torusSize = 1.5;
    // const torusSize = 2;
  return (
    <mesh
      {...props}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
    // onClick={click(!clicked)}
      onPointerOver={() => hover(true)}
    // onPointerOver={hover(true)}
      onPointerOut={() => hover(false)}>
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

// function quadraticPath(aVal: number, xVal: number, hVal:number){
//   return ((aVal)*(xVal-hVal)*(xVal-hVal));  
// }

// function quarticPath(aVal: number, xVal: number, hVal:number){
//   return ((aVal)*(xVal-hVal)*(xVal-hVal)*(xVal-hVal)*(xVal-hVal));  
// }

function powerPath(thePower: number, aVal: number, xVal: number, hVal:number){
  return ((aVal)*Math.pow((xVal-hVal), thePower));  
}

// function quarticPath(aVal: number, xVal: number, hVal:number){
//   return ((aVal)*Math.pow((xVal-hVal), 4 / 1));  
// }

function calcInputForDesiredOutputPowerPath(thePower: number, aVal: number, yVal: number, hVal:number){
  return (Math.pow((yVal/aVal), 1 / thePower)+hVal);  
}

// function calcInputForDesiredOutputquarticPath(aVal: number, yVal: number, hVal:number){
//   return (Math.pow((yVal/aVal), 1 / 4)+hVal);  
// }


const CameraPanning: React.FC = () => {
  // const meshRef = useRef<THREE.Mesh>(null!);
  const { camera } = useThree();

  // const [scrollPosition, setScrollPosition] = useState(0);
  // const scrollPosition = 0;
  // const [textRect, setTextRect] = useState({ top: 0, left: 0, width: 0, height: 0 });

  // const scrollContainerRef = useRef<HTMLDivElement>(null);

  const time = useRef(0);
  const movementSpeed = useRef(0.002);

  const isAutopanning = true;

  const movementSelection = useRef(0);
 
  const xForBoundaryYVal = calcInputForDesiredOutputPowerPath(4, 0.01, 120, 2);

  useFrame((_state, delta) => {
    time.current += 0.02*(delta/delta); // Adjust speed 

    if(isAutopanning){
      movementSelection.current = time.current;
    } 
    if(movementSelection.current < xForBoundaryYVal){
      
    camera.position.z += 12*((movementSpeed.current)*movementSelection.current);
    camera.position.x += 1*( powerPath(4, 1*0.01*movementSpeed.current, movementSelection.current, 0.4) ); 
    }


    // weird motion side effects
    // camera.position.x += quadraticPath(movementSpeed.current, time.current, 2); 
    // even weirder motion side effects
    // camera.position.x += quadraticPath(movementSpeed.current, time.current, 6); 

    // too slow to make J movement in time 
    // camera.position.x += (movementSpeed.current)*0.1*(time.current)*(time.current);  

    // OrthographicCamera()
  })

  // useEffect(() => {
  //   if (meshRef.current && meshRef.current.geometry && scrollContainerRef.current) {
  //     meshRef.current.geometry.computeBoundingBox();
  //     const width = meshRef.current.geometry.boundingBox!.max.x - meshRef.current.geometry.boundingBox!.min.x;
  //     const height = meshRef.current.geometry.boundingBox!.max.y - meshRef.current.geometry.boundingBox!.min.y;

  //     const canvasRect = scrollContainerRef.current.getBoundingClientRect();
  //     const textPosition = {
  //       top: canvasRect.top, // Adjust as needed
  //       left: canvasRect.left, // Adjust as needed
  //       width: width,
  //       height: height,
  //     };
  //     setTextRect(textPosition);
  //   }
  // }, [scrollPosition]);   

  return (
    // <Text
    //   ref={meshRef}
    //   // position={[0, 0, 0]}
    //   position={[0, 0, camera.position.z-2.3]}
    //   fontSize={0.3}
    //   color="white"
    //   anchorX="center"
    //   anchorY="top" // Anchor to top for scrolling effect
    // >
    //   {`.`}
    // </Text>
    <></>
  );
};
 
// Type 'string' is not assignable to type 'TextDisplayProps'.ts(2322)
// const TextDisplay = (props: {theText: TextDisplayProps}) => {
// const TextDisplay = (props: {theText: string, verticalIncrement: number}) => {

// // const TextDisplay: React.FC<TextDisplayProps> = ({ text }) => {
//   const meshRef = useRef<THREE.Mesh>(null!);

//   const backgroundRef = useRef<THREE.Mesh>(null!);

//   const time = useRef(0);

//   // const myWidth = 1.2*(meshRef.current.geometry.boundingBox!.max.x - meshRef.current.geometry.boundingBox!.min.x);
//   const myWidth = useRef(0);

//   useFrame(() => {
//     if (meshRef.current && meshRef.current.geometry) {
//       myWidth.current = 1.2*(meshRef.current.geometry.boundingBox!.max.x - meshRef.current.geometry.boundingBox!.min.x)
//       time.current += 0.02; // Adjust speed of oscillation
//       const oscillation = (props.verticalIncrement) * Math.sin(time.current) + 0
//       // meshRef.current.position.y += props.verticalIncrement;
//       meshRef.current.position.y = oscillation;
//       // meshRef.current.rotation.y += 0.01; // Optional: Rotate the text
//       // meshRef.current.geometry.computeBoundingBox();
//       // const width = meshRef.current.geometry.boundingBox!.max.x - meshRef.current.geometry.boundingBox!.min.x;
//       // myWidth = meshRef.current.geometry.boundingBox!.max.x - meshRef.current.geometry.boundingBox!.min.x;
//       // console.log(`Text width (bounding box): ${width}`);
//     }
//     if (backgroundRef.current) {
//       time.current += 0.02; // Adjust speed of oscillation
//       const oscillation = Math.sin(time.current) * (props.verticalIncrement); // Adjust amplitude of oscillation
//       // backgroundRef.current.position.y += props.verticalIncrement;
//       backgroundRef.current.position.y = oscillation;
//       // backgroundRef.current.rotation.y += 0.01; // Optional: Rotate the text
//     }
//   });

//   return (
//     <group>
//       <mesh ref={backgroundRef} position={[0, 0, -0.1]}> {/* Black background mesh */}
//         <planeGeometry args={[myWidth.current, 1]} /> {/* Adjust size as needed */}
//         <meshBasicMaterial color="black" transparent opacity={0.5} />
//       </mesh>
//       <Text
//         ref={meshRef}
//         position={[0, 0, 0]}
//         fontSize={0.5}
//         color="white"
//         anchorX="center"
//         anchorY="middle"
//       >
//         {props.theText}
//       </Text>
//     </group>
//   );
// };

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
  const { camera } = useThree();
  const htmlOverlayRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (htmlOverlayRef.current) {
      const scrollAmount = camera.position.z * 1;
      htmlOverlayRef.current.style.transform = `translateY(-${scrollAmount}px)`;
    }
  });

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
      {/* <TextDisplay theText="Hello, React Three Fiber!" verticalIncrement={0.1}/> */}
      {/* <TextDisplay theText="Hello, React Three Fiber!" verticalIncrement={0.5}/> */}

      <CameraPanning/>

      {/* <Star position={[0,0,0]}/> */}
      {/* <InfoOfBoundingBody/> */} 

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


const TemplateOverlayBlock = (props: {blockTitle: string, blockMessage: string, repeatCount: number}) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' +props.repeatCount+', 1fr)', width: '100vw' }}>
      {Array(props.repeatCount).fill(null).map((_, index) => (
        <div className="html-overlay" key={index}>
          {/* <h1>{props.blockTitle}</h1> */}
          <div className="experienceleftside">
            <h1>{props.blockTitle}</h1>
            <p>{props.blockMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// const IntroBlock = (props: {widthOfTextOverlaySection: number}) => {

//   const blockCount = 4;

// // function IntroBlock() {
//   return (
//         // <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' +16+', 1fr)', width: props.widthOfTextOverlaySection+'vw' }}> {/* Container for four overlays */}

//         // <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' +4*blockCount+', 1fr)', width: props.widthOfTextOverlaySection+'vw' }}> {/* Container for four overlays */}

//     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' +blockCount+', 1fr)', width: props.widthOfTextOverlaySection+'vw' }}> {/* Container for four overlays */}
      
//       {/* const myVector: THREE.Vector3 = new THREE.Vector3(...Array(3).fill(null).map(()=>THREE.MathUtils.randFloatSpread(150))); */}

//     {/* <div>HI</div> */}
    // <TemplateOverlayBlock blockTitle='Conrad' blockMessage='🚀 Welcome to my portfolio!' repeatCount={2}/>
      
//       {/* <div className="html-overlay">
//         <div className="experienceleftside">
//            <p>🚀 Welcome to my portfolio!</p>
//         </div>
//       </div>
//       <div className="html-overlay">
//         <div className="experienceleftside">
//            <p>🚀 Welcome to my portfolio!</p>
//         </div>
//       </div>
//       <div className="html-overlay">
//         <div className="experienceleftside">
//            <p>🚀 Welcome to my portfolio!</p>
//         </div>
//       </div>
//       <div className="html-overlay">
//         <div className="experienceleftside">
//           <h1>Conrad</h1>
//           <p>🚀 Welcome to my portfolio!</p>
//         </div>
//       </div> */}
//     </div>
//   );
// }


// const TextOverlayTest1 = (props: { topAligned: boolean }) => {
//   return (
//     <div style={{ display: 'flex', justifyContent: 'center' }}>
//       <div style={{ display: 'flex' }}>
//         {Array(4).fill(null).map((_, index) => (
//           <div className="html-overlay" key={index}>
//             {/* <div className="experienceleftside"> */}
//               <h1>Conrad</h1>
//               <p>🚀 Welcome to my portfolio!</p>
//             {/* </div> */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// const TextOverlayTitle = () => {
//   return (
//     <div style={{ position: 'relative', transform: 'translate(-50%, -30%)',
//       left: '75%', width: '10vw', display: 'flex', justifyContent: 'center' }}>
//       <div style={{ display: 'flex' }}>
//         {Array(1).fill(null).map((_, index) => (
//           <div className="html-overlay" key={index}>
//                <h1>Conrad</h1>
//               <p>🚀 Welcome to my portfolio!</p>
//            </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// const TextOverlayAbout2 = () => {
// //   const { camera } = useThree();
// //   const htmlOverlayRef = useRef<HTMLDivElement>(null);

// // useFrame(() => {
// //     if (htmlOverlayRef.current) {
// //         const scrollAmount = camera.position.z * 1;
// //         htmlOverlayRef.current.style.transform = `translateY(-${scrollAmount}px)`;
// //     }
// // });
//   return (
//     <div style={{ position: 'relative', transform: 'translate(-10%, -30%)',
//       left: '75%', margin: '1vw', padding: '1vw',  width: '45vw', display: 'flex', justifyContent: 'center' }}>

//       <div style={{ display: 'flex' }}>
//         {Array(1).fill(null).map((_, index) => (
//           <div style={{margin: '0vw', padding: '3vw'}} className="html-overlay" key={index}>
//                <h1>Conrad</h1>
//               <p> My name is Conrad Hansen-Quartey. I live in West Haven, CT. I majored in Engineering Science. </p>
//               <p> With a combination of self-taught and academic training, I have both the passion and engineering skill of a professional software engineer. Having self-taught programming languages throughout high school and learning computer programming design principles and techniques in college, I have become a well-rounded computer scientist. I have a passion not only for developing software, but for solving problems in creative ways. I am deeply committed to using my talents and gifts to serve those around me and society in general.  </p>
//            </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const TextOverlayAbout = () => {
//   return (
//     <div style={{ position: 'relative', transform: 'translate(-10%, -30%)',
//       left: '75%', margin: '1vw', padding: '1vw',  width: '45vw', display: 'flex', justifyContent: 'center' }}>
//       <div style={{ display: 'flex' }}>
//         {Array(1).fill(null).map((_, index) => (
//           <div style={{margin: '0vw', padding: '3vw'}} className="html-overlay" key={index}>
//                <h1>Conrad</h1>
//               <p> My name is Conrad Hansen-Quartey. I live in West Haven, CT. I majored in Engineering Science. </p>
//               <p> With a combination of self-taught and academic training, I have both the passion and engineering skill of a professional software engineer. Having self-taught programming languages throughout high school and learning computer programming design principles and techniques in college, I have become a well-rounded computer scientist. I have a passion not only for developing software, but for solving problems in creative ways. I am deeply committed to using my talents and gifts to serve those around me and society in general.  </p>
//            </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const Note = (props: { theTextTop: string}) => {
  
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
        <p>
            Hint: Use up and down arrow keys to vertically scroll
        </p>  
    </div>
  </div>);

}
const BiographyText = (props: { theTextTop: string }) => {
// const BiographyText = (props: { theTextTop: string; onHeightChange: (height: number) => void }) => {
  // const textRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (textRef.current && props.onHeightChange) {
  //     props.onHeightChange(textRef.current.offsetHeight);
  //   }
  // }, [props.onHeightChange]);

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

  const theURLs = [
    "https://creative-contentions.vercel.app", "https://conrad1451.github.io/bss"
  ]

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
        width: '75vw', // CHQ: NOT for the width of each project tile
        display: 'flex',
        justifyContent: 'center',
      }}
      > 
      <div style={{ display: 'flex' }}>
          {Array(2)
          .fill(null)
          .map((_, index) => (
            <div className="html-overlay" key={index} style={{ 
          width: '75%', // 25 shrinks width of each projec ttile and pushes them upward, but 75 and 95 same. and 45 seems to shift it slightly downwards
          // maybe when this width is sufficently smaller than partent width that the block gets squeezed and pushe dverticall upward
          display: 'flex', 
          margin: '1vw',
          padding: '2vw'
        }}>
          <h1>{projectName[index]}</h1>
          <p>{projectSubtext1[index]}</p>
          <p>{projectSubtext2[index]}</p>
          {/* <p><b>Purpose:</b></p> */}
          {/* <h3><b>Purpose:</b></h3> */}
          <h2>Purpose:</h2> 
          <p>{projectPurposes[index]}</p>
          <h2>Contributions:</h2> 
          <p>{contributionPoints[index]}</p>
          <h2>Link:</h2> {/* [1] */}
          {/* CHQ: Did not work */}
          {/* <a href={theURLs[index]} rel="noreferrer"> 
            {theURLs[index]}
          </a> */}

          {/* CHQ: Still did not work */}
          {/* <a href={theURLs[index]}> 
            {theURLs[index]}
          </a> */}

          <LinkButton
              url={theURLs[index]}
              buttonText={"Go to " + projectName[index]}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: 'lightblue',
                border: 'none',
                cursor: 'pointer',
                marginTop: '20px', // Add some spacing above the button
              }}
            />

        </div>
      ))}
      </div>
    </div>
  </div>

 
  )
}


const OuterTextblock = (props: { theTextTop: string }) => {
// const OuterTextblock = (props: { theTextTop: string; onHeightChange: (height: number) => void }) => {
// const OuterTextblock = (props: {onHeightChange: (height: number) => void }) => {
  // const [textTop, setTextTop] = useState('10%'); // Adjust initial top position
  // const [biographyHeight, setBiographyHeight] = useState(0);
  // const textRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (textRef.current && props.onHeightChange) {
  //     props.onHeightChange(textRef.current.offsetHeight);
  //   }
  // }, [props.onHeightChange]);
  
  return (
    // CHQ: position: sticky would work here excpet I had to disable the vertical scroll os that the 
    // scroll activated three fiber animations function baed on scroll
    <div style={{ position: 'absolute', top: props.theTextTop, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      {/* <p>Use up and down arrow keys to scroll</p> */}
      <div style={{ position: 'absolute', top: -440, left: '2%', width: '45%', zIndex: 10, pointerEvents: 'auto', color:'white', fontSize: '20px'}}>
        <Note theTextTop={'0%'}/>
      </div>
      <div style={{ position: 'absolute', top: 10, left: '2%', width: '45%', zIndex: 10, pointerEvents: 'auto' }}>
        {/* <BiographyText theTextTop={'0%'} onHeightChange={setBiographyHeight} /> */}
        <BiographyText theTextTop={'0%'} />
      </div>
      <div style={{ position: 'absolute', top: '170%', left: '35%', transform: 'translateX(-50%)', width: '96%', maxWidth: '1200px', zIndex: 10, pointerEvents: 'auto' }}>
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
  // const [biographyHeight, setBiographyHeight] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setTextTop((prevTop) => {
          const prevValue = parseFloat(prevTop);
          // return `${Math.max(5, prevValue - 5)}%`; // Move up by 5%
          return `${prevValue - 5}%`; // Move up by 5%
        });
      } else if (event.key === 'ArrowDown') {
        setTextTop((prevTop) => {
          const prevValue = parseFloat(prevTop);
          // return `${Math.min(80, prevValue + 5)}%`; // Move down by 5%
          return `${prevValue + 5}%`; // Move up by 5%
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // const getProjectsTop = () => {
  //   return `${parseFloat(textTop) + biographyHeight + 20}px`; // Adjust spacing
  // };

  // const getProjectsListTop = () => {
  //   return `50%`; // Center the project list vertically (adjust as needed)
  // };

  return (
    // textTop
    <OuterTextblock theTextTop={textTop} />
    // <OuterTextblock theTextTop={textTop} onHeightChange={setBiographyHeight} />
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

export default function OuterSpaceComponent(props: { windowMinimized: boolean }) {
  // const [isScrolling, setIsScrolling] = useState(false);

  const isScrolling = false;

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) {
        // Scrolling allowed, no action needed here
      } else {
        // Scrolling disabled, prevent default behavior
        window.scrollTo(0, 0); // Reset scroll position to top
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling]);

  // let chosenDirection = 1;

  // No longer setting window.onscroll to true or false.
  // The useEffect handles the scroll behavior based on isScrolling.

  return (
    <div
      className="Threejs-bg-outerspace"
      style={{
        position: 'relative',
        height: '100vh',
        overflowY: isScrolling ? 'auto' : 'hidden', // Disable vertical scrolling
      }}
    >
      {/* <div
        style={{
          position: 'absolute',
          top: '80%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          zIndex: 10,
        }}
      >
        <TextOverlayAbout2 />
      </div> */}
      <Canvas
        style={{
          width: props.windowMinimized ? `200px` : `100vw`,
          height: props.windowMinimized ? `200px` : `100vh`,
          zIndex: 1,
        }}
      >
        <MySpaceScene />
      </Canvas>
      <TextOverlayAbout2 />
    </div>
  );
}

// I think I can put
// controls.update();
//  in useFrame since it is something that must be udpated every frame


