import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// import Box from './Box'
import BoxDemo2 from './BoxDemo2'

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

function App(){
  return(
    <>
    <div className='App-bg'> 
      <DefaultApp/>
      <BoxDemo2/>
    </div>
    </>
  )
}

export default App
