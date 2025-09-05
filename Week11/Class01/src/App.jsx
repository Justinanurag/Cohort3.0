// import React, { useEffect, useState } from 'react'
// import { useFetch, usePost } from './Hooks/useFetch'

// const App = () => {
//   const postData=usePost();
// const {finalData,loading}=useFetch("https://jsonplaceholder.typicode.com/posts/1")
// if(loading){
//   return <div>
//     <h1>Loading.....</h1>
//   </div>
// }
//   return (
//     <div>
//       {JSON.stringify(finalData)}
//     {/* {postData.title} */}
//     </div>
//   )
// }

// export default App

//Learning about userPrev

// import React, { useState } from 'react'
// import { usePrev } from './Hooks/usePrev';


// const App = () => {
//   const[count,setCount]=useState(0);
//   const prev=usePrev(count);

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={()=>{setCount(c=>c+1)}}>Click me</button>
//       <p>The previous value was: {prev}</p>
//     </div>
//   )
// }

// export default App

//Learning about useDebounce

import React, { useRef } from 'react'  

function useDebounce(callback, delay = 200) {
  const currentClock = useRef();

  const debouncedFn = (...args) => {
    clearTimeout(currentClock.current);
    currentClock.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedFn;
}

const App = () => {
  function sendDataToBackend(e) {
    console.log("Sending to backend:", e.target.value);
    fetch("https://api.com", {
      method: "POST",
      body: JSON.stringify({ value: e.target.value }),
    });
  }

  const debounceFn = useDebounce(sendDataToBackend, 500);

  return (
    <div>
      <input type="text" onChange={debounceFn} />
    </div>
  );
};

export default App;
