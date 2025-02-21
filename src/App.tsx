// Source:
// [1]: https://www.freecodecamp.org/news/react-conditional-rendering/
// [2]: https://www.google.com/search?q=switch+statement+reactjs&client=firefox-b-1-d&sca_esv=fd368f2ad05e4b13&ei=_gGlZ5GYB6LS5NoPpdTX4Ak&ved=0ahUKEwiRj5-N2a-LAxUiKVkFHSXqFZwQ4dUDCBI&uact=5&oq=switch+statement+reactjs&gs_lp=Egxnd3Mtd2l6LXNlcnAiGHN3aXRjaCBzdGF0ZW1lbnQgcmVhY3RqczIGEAAYBxgeMgsQABiABBiGAxiKBTILEAAYgAQYhgMYigUyCxAAGIAEGIYDGIoFMggQABiABBiiBDIFEAAY7wVI4hRQmgFYkxNwBHgBkAEAmAGUAaABrAqqAQM3Lja4AQPIAQD4AQGYAg6gArIIwgIKEAAYsAMY1gQYR8ICCBAAGAUYDRgewgIIEAAYCBgNGB7CAgcQABiABBgNwgIIECEYoAEYwwSYAwCIBgGQBgiSBwM5LjWgB8BE&sclient=gws-wiz-serp (from GeminiAI response to search "switch statement reactjs")


import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// import Box from './Box'
// import BoxDemo2 from './BoxDemo2'
import ToggleBobble from './Code Examples/modSampleCode/ToggleBobble'
// import FullscreenComponent from './FullscreenTest'
import OuterSpaceComponent from './OuterSpaceComponent'
import MyScene from './Code Examples/testsForTexture/TextureTest1'

import AIGenSpaceComponent from './Code Examples/aiGenContent/AIGenScene'
import AIMazeOld from './Code Examples/aiGenContent/AIMazeOld'

// import Scene from './TextureTest3'

import MyBox from './Code Examples/testsForTexture/TextureTest4'

import AIMaze from './Code Examples/aiGenContent/AIMazeOld'

import './App.css'
// import { color } from 'three/tsl'

function DefaultApp(){
  const [count, setCount] = useState(0)

  //  This worked but I got a warning not to do it this way

  // const myStyles = {
  //   // textAlign: 'center',
  //   // marginTop: '2rem',
  //   color: '#F43596',
  // };

  return (
              // <div className='App-bg-color component-window-size-1'>
    // <div className='App-bg'>
      <div> 
      {/* <div style={myStyles}> */}
      {/* <div className='App-icon-bg-color component-window-size-1'> */}
      {/* <div className='App-icon-bg-color'> */}
      <div> 
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

function View1(){
  return(
    <>
    <div className='App-bg'> 
      <DefaultApp/>
      {/* <BoxDemo2 windowMinimized={true}/> */}
    </div>
    </>
  )
}

function View2(){
  return(
    <>
    <div className='App-bg'>
      {/* <FullscreenComponent/> */}
      <OuterSpaceComponent windowMinimized={false}/>
    </div>
    </>
  )
}
function View3(){
  return(
    <>
    <div className='App-bg'>
      {/* <MyScene/> */}
      {/* <AIGenSpaceComponent/> */}
      <AIMaze/>
    </div>
    </>
  )
}

// CHQ: found this error in console: <div> cannot appear as a descendant of <p>.
// fix: change the view components so instead of being nested between <p>, 
// they are nested between emtpy angle brackets
function ViewPicker(props:{choice: number}){
  return(
    <>
    <div>
      {(() => {
        switch (props.choice) {
          case 1: // standard Vite + React intro display
            // return <p><View1/></p>;
            return <><View1/></>;
          case 2: // react-three-fiber space scenne
            // return <p><View2/></p>;
            return <><View2/></>;
          case 3: // react-three-fiber object in non-three-fiber background
            // return <p><View3/></p>;
            return <><View3/></>;
          default:
            // return <p><View1/></p>;
            return <><View1/></>;
        }
      })()}
    </div>
    </>
  )
}

function App(){
  // view 2 is text that just says hi
  // view 3 of toggle bobble is broken (replaced)
  // view 5 is a still 3D image - not that useful

  // const displayView1 = true;
  // const displayView1 = false;
  return(
    <>
    <div>
      {/* <ViewPicker choice={1}/> */}
      {/* <ViewPicker choice={2}/> */}
      <ViewPicker choice={3}/>
    </div>
    </>
  )
}

export default App
