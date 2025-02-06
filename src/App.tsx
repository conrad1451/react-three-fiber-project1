// Source:
// [1]: https://www.freecodecamp.org/news/react-conditional-rendering/

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// import Box from './Box'
import BoxDemo2 from './BoxDemo2'
import ToggleBobble from './ToggleBobble'

import './App.css'
// import { color } from 'three/tsl'

function DefaultApp(){
  const [count, setCount] = useState(0)

  // const myStyles = {
  //   // textAlign: 'center',
  //   // marginTop: '2rem',
  //   color: '#F43596',
  // };

  return (
              // <div className='App-bg-color component-window-size-1'>
    <div className='App-bg'>
      {/* <div>  */}
      {/* <div style={myStyles}> */}
      {/* <div className='App-icon-bg-color component-window-size-1'> */}
      <div className='App-icon-bg-color'>
      {/* <div>  */}
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
      <BoxDemo2 windowMinimized={true}/>
    </div>
    </>
  )
}

function View2(){
  return(
    <>
      <BoxDemo2 windowMinimized={false}/>
    </>
  )
}

function View3(){
  return(
    <>
      <ToggleBobble/>
    </>
  )
}

function ViewPicker(props:{choice: number}){
  return(
    <>
    <div>
      {(() => {
        switch (props.choice) {
          case 1:
            return <p><View1/></p>;
          case 2:
            return <p><View2/></p>;
          case 3:
            return <p><View3/></p>;
          default:
            return <p><View2/></p>;
        }
      })()}
    </div>
    </>
  )
}

function App(){

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
