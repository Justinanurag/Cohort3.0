// import React, { useState } from 'react'

// const App = () => {
//   return (
//     <div>
//       <Counter/>
//     </div>
//   )
// }

// function Counter(){
//   const[count,setCount]=useState(0);
//   return <div>
//     <h1>Count:{count}</h1>
//     <Decrease setCount={setCount}/>
//     <Increase setCount={setCount}/>
//   </div>

// }
// function Decrease({setCount}){
//   function decrease(){
//     setCount(c=>c-1)
//   }
//   return <div>
//     <button onClick={decrease}>Decrease</button>
//   </div>
// }
// function Increase({setCount}){
//   function increase(){
//     setCount(c=>c+1)
//   }
//   return <div>
//     <button onClick={increase}>Increase</button>
//   </div>
// }

// export default App

//Now using recoil
// install first recoil

// import React, { useState } from "react";
// import { RecoilRoot } from "recoil";

// const App = () => {
//   return (
//     <div>
//       <RecoilRoot>
//         <Counter />
//       </RecoilRoot>
//     </div>
//   );
// };

// function Counter() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h1>Count:{count}</h1>
//       <Increase setCount={setCount} />
//       <Decrease setCount={setCount} />
//     </div>
//   );
// }

// function Increase({setCount}) {
//   function increase() {
//     setCount((c) => c + 1);
//   }

//   return (
//     <div>
//       <button onClick={increase}>Increase</button>
//     </div>
//   );
// }
// function Decrease({setCount}) {
//   function decrease() {
//     setCount((c => c -1));
//   }

//   return (
//     <div>
//       <button onClick={decrease}>Decrease</button>
//     </div>
//   );
// }

// export default App;



// Using recoil atom 
 //Step 01:Wrap the app inside a RecoilRoot
 

 /*
import React from 'react'
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { counterAtom } from './CounterAtom/counter';

function App() {

  return (
    <RecoilRoot>
     <Counter />
    </RecoilRoot>
  )
}

function Counter() {

  return <div>
    <CurrentCount />
    <Increase />
    <Decrease />
  </div>
}

function CurrentCount() {
  const count = useRecoilValue(counterAtom);
  return <div>
    {count}
  </div>
}

function Decrease() {

  const setCount = useSetRecoilState(counterAtom);

  function decrease() {
    setCount(c => c - 1);
  }

  return <div>
    <button onClick={decrease}>Decrease</button>
  </div>
}


function Increase() {
  const setCount = useSetRecoilState(counterAtom);

  function increase() {
    setCount(c => c + 1);
  }

  return <div>
    <button onClick={increase}>Increase</button>
  </div>
}

export default App
*/

//Selector

import React, { useState } from 'react'
import { counterAtom, evenSelector } from './CounterAtom/counter';
import { RecoilRoot, useRecoilValue,useSetRecoilState } from 'recoil';

const App = () => {
  return (
    <div>
      <RecoilRoot>
      <Button/>
      <Counter/>
      <IsEven/>
      </RecoilRoot>
    </div>
  )
}

function Button(){
  const setCount=useSetRecoilState(counterAtom)

function decrease(){
  setCount(c=>c-1);
}
function increase(){
  setCount(c=>c+2)
}
  return <div>
    <button onClick={increase}>Increase</button>
    <button onClick={decrease}>Decrease</button>
  </div>
}

function Counter(){
  const count=useRecoilValue(counterAtom);
  return <div>
    {count}
  </div>
}

function IsEven(){
  const even=useRecoilValue(evenSelector);
  return <div>
    {even ?"Even":"Odd"}
  </div>
}


export default App