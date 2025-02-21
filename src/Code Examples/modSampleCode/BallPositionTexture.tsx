// Source: https://www.google.com/search?q=code+for+threejs+sphere+in+react+three+fiber+that+takes+in+position+and+texture+as+inputs&client=firefox-b-1-d&sca_esv=37989991c7ab7d35&ei=WsGwZ8LbCNqsptQP64G5kQc&ved=0ahUKEwjC8MaSjcaLAxValokEHetALnIQ4dUDCBA&uact=5&oq=code+for+threejs+sphere+in+react+three+fiber+that+takes+in+position+and+texture+as+inputs&gs_lp=Egxnd3Mtd2l6LXNlcnAiWWNvZGUgZm9yIHRocmVlanMgc3BoZXJlIGluIHJlYWN0IHRocmVlIGZpYmVyIHRoYXQgdGFrZXMgaW4gcG9zaXRpb24gYW5kIHRleHR1cmUgYXMgaW5wdXRzSJIlUMMIWN0dcAJ4AZABAJgBmgGgAY4NqgEEMy4xMrgBA8gBAPgBAZgCAaACB8ICChAAGLADGNYEGEeYAwCIBgGQBgiSBwExoAfXJQ&sclient=gws-wiz-serp (search: code for threejs sphere in react three fiber that takes in position and texture as inputs)

// import React from 'react';
import {  useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
// import { ThreeElements } from '@react-three/fiber'

// import * as THREE from 'three';

// I understand because https://threejs.org/docs/#api/en/core/BufferGeometry

// export const SphereWithTexture = ({ position, textureUrl }) => {

// const SphereWithTexture = (props: { position:THREE.Mesh, textureUrl:string }) => {
  interface MeshProps {
    position: [number, number, number];
   }

  // I purposely made a type like this to show how Type and Interface operation 
  // functionally the same here
  type TheMeshProps = {
    position: [number, number, number];
   }
  
// v1 works
  const SphereWithTextureV1 = (props: { MyMeshProp:MeshProps, textureUrl:string }) => {
  // const SphereWithTexture = (props: { position:THREE.Mesh, textureUrl:string }) => {
    const texture = useLoader(TextureLoader, props.textureUrl); 

  return (
    <mesh position={props.MyMeshProp.position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

// v2 ...
const SphereWithTextureV2 = (props: { TheMesh:TheMeshProps, textureUrl:string }) => {
  // const SphereWithTexture = (props: { position:THREE.Mesh, textureUrl:string }) => {
    const texture = useLoader(TextureLoader, props.textureUrl); 

  return (
    <mesh position={props.TheMesh.position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};


const View1 = () =>{
  const meshPropCoords: MeshProps = {
    position: [0, 0, 5]
  }
  return (
    <SphereWithTextureV1 
    MyMeshProp={meshPropCoords} 
    textureUrl='moon.jpg'
  />
  );
}

const View2 = () =>{
  const meshPropCoords: MeshProps = {
    position: [1.4, 2, 2.5]
  }
  return (
    <SphereWithTextureV2 
    TheMesh={meshPropCoords} 
    textureUrl='moon.jpg'
  />
  );
}

// const SphereWithTexture = (props: { MyMeshProp:MeshProps, textureUrl:string }) => {
//   // const SphereWithTexture = (props: { position:THREE.Mesh, textureUrl:string }) => {
//     // const texture = useLoader(TextureLoader, 'moon.jpg')




// };
function BallPicked(props:{choice: number}){
  return(
    <>
    <div>
      {(() => {
        switch (props.choice) {
          case 1:
            return <p><View1/></p>;
          case 2:
            return <p><View2/></p>; 
          default:
            return <p><View2/></p>;
        }
      })()}
    </div>
    </>
  )
}


export default function BallWithProps() {
  return(
    <>
    <div>
      <BallPicked choice={1}/>
      {/* <BallPicked choice={2}/> */}
      {/* <BallPicked choice={3}/> */}
      {/* <BallPicked choice={4}/> */}
      {/* <BallPicked choice={5}/> */}
    </div>
    </>
  )
}