// Source: https://www.google.com/search?client=firefox-b-1-d&q=pass+in+path+to+texture+as+a+parameter+to+a+react+three+fiber+component
// search "pass in path to texture as a parameter to a react three fiber component"

import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { ThreeElements } from '@react-three/fiber'

function TexturedSphere(props: { texturePath: string }) {

// function TexturedSphere(props: { texturePath: string, coords:ThreeElements['mesh'] }) {
  const texture = useLoader(TextureLoader, props.texturePath);

  return (
    <mesh
    // {...props.coords}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function Scene(props: { texturePath: string }) {
    return (
        <>
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} />
            <TexturedSphere texturePath={props.texturePath} />

            {/* <TexturedSphere texturePath={props.texturePath} coords={[-3.6, 0, 0]} /> */}


            {/* Type 'number[]' has no properties in common with type 'MeshProps'.ts(2559)
TextureTest2.tsx(10, 55): The expected type comes from property 'coords' which is declared here on type 'IntrinsicAttributes & { texturePath: string; coords: MeshProps; }'
(property) coords: MeshProps */}
            {/* <TexturedSphere texturePath={props.texturePath} coords={[-3.6, 0, 0]} /> */}

{/* Conversion of type 'number[]' to type 'ThreeElements' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
  Type 'number[]' is missing the following properties from type 'ThreeElements': object3D, audioListener, positionalAudio, mesh, and 134 more.ts(2352) */}
            {/* <TexturedSphere texturePath={props.texturePath} coords={([-3.6, 0, 0] as ThreeElements)} /> */}

            {/* Type '{ texturePath: string; props: true; }' is not assignable to type 'IntrinsicAttributes & { texturePath: string; coords: MeshProps; }'.
  Property 'props' does not exist on type 'IntrinsicAttributes & { texturePath: string; coords: MeshProps; }'.ts(2322) */}
            {/* <TexturedSphere texturePath={props.texturePath} props.coords={[-3.6, 0, 0]} /> */}
        </>
    );
}

export default function TexturedObject() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Scene texturePath="moon.png" />
      </Suspense>
    </Canvas>
  );
}