// import React, { useRef } from 'react'

// const App = () => {
//   //For replace this in react we use useRef
//   const inputref=useRef();
  
//   function focusOnInput(){
//     //document.getElementById("name").focus();
//     inputref.current.focus();
//   }
//   return (
//     <div>
//       Sign Up
//       {/* here i use ref */}
//       <input type="name" name="" id="name" ref={inputref} />
//       <input type="name" name="" id='' ref={inputref} />
//       <button onClick={focusOnInput}>submit</button>
//     </div>
//   )
// }

// export default App


//Building a clock with start and stop functionality

import React, { useRef, useState } from 'react'
const App = () => {
  const [currentCount,setCurrentCount]=useState(0);
 //const [timer,setTimer]=useState(0);
 //Above is not good method due to rerendering
 //So we useRef came into the picture
 const timer=useRef();
  function startClock(){
    let value=setInterval(function(){
      setCurrentCount(c=>c+1);
    },1000);
    // setTimer(value);
    timer.current=value;
  }

  function stopClock(){
    clearInterval(timer.current)
  }
  return (
    <div>
      {currentCount}
      <button onClick={startClock}>Start</button>
      <button onClick={stopClock}>Stop</button>
      
    </div>
  )
}

export default App