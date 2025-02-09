// Source: https://r3f.docs.pmnd.rs/tutorials/loading-textures

import { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

function SceneMulti() {
    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
      'PavingStones092_1K_Color.jpg',
      'PavingStones092_1K_Displacement.jpg',
      'PavingStones092_1K_Normal.jpg',
      'PavingStones092_1K_Roughness.jpg',
      'PavingStones092_1K_AmbientOcclusion.jpg',
    ])
    return (
      <mesh>
        {/* Width and height segments for displacementMap */}
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial
          displacementScale={0.2}
          map={colorMap}
          displacementMap={displacementMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
        />
      </mesh>
    )
  }
  
function Scene() {
//   const colorMap = useLoader(TextureLoader, 'PavingStones092_1K_Color.jpg')
const colorMap = useLoader(TextureLoader, 'cross.jpg')
// const colorMap = useLoader(TextureLoader, 'moon.jpg')

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        {/* CHQ: below also worked */}
        {/* <coneGeometry args={[1, 32, 32]} /> */}
        <meshStandardMaterial
          displacementScale={0.2}
          map={colorMap}
          displacementMap={colorMap}
        //   normalMap={colorMap}
        //   roughnessMap={colorMap}
        //   aoMap={colorMap}
        />
      </mesh>
    </>
  )
}

export default function MyScene() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        {/* <SceneMulti /> */}
        <Scene />
      </Suspense>
    </Canvas>
  )
}
