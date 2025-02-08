import React, { useState, useRef, useEffect } from 'react';

import BoxDemo2 from './BoxDemo2'


// Source: 
// [1]: https://www.google.com/search?client=firefox-b-1-d&sca_esv=e780fd848325495e&q=reactjs+make+component+full+screen&spell=1&sa=X&ved=2ahUKEwi4zJ7r47CLAxXOGVkFHRO0PXQQBSgAegQICxAB (from GeminiAI response to search "reactjs make component full screen")
// [2]: 
// https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen

// The Element.requestFullscreen() method issues an asynchronous request to make the element be displayed in fullscreen mode.
// [1]
function FullscreenComponent() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Type 'Element' is missing the following properties from type 'HTMLDivElement': align, accessKey, accessKeyLabel, autocapitalize, and 128 more.ts(2322)
//   const componentRef = useRef<Element>(null!) //[2]
  const componentRef = useRef<HTMLDivElement>(null!) //[2]

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      componentRef.current.requestFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    //       Type 'Element' is missing the following properties from type 'HTMLDivElement': align, accessKey, accessKeyLabel, autocapitalize, and 128 more.ts(2322)
    // <div ref={componentRef}> 
    <div ref={componentRef}>
      {/* Content of your component */}
      <BoxDemo2 windowMinimized={false}/>
      <button onClick={toggleFullscreen}>
        {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </button>
    </div>
  );
}

export default FullscreenComponent;