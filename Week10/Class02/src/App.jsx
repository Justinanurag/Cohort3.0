// import React, { useContext, useState } from "react";
// const bulbContext = createContext();

// const App = () => {
//   return (
//     <div>
//       <bulbContext.Provider value={{
//         bulbOn:bulbOn,
//         setBulbOn:setBulbOn
//       }}>
//         <LightBulb />
//       </bulbContext.Provider>
//     </div>
//   );
// };
// function LightBulb() {
//   const [bulbOn, setBulbOn] = useState(true);
//   return (
//     <div>
//       <BulbState bulbOn={bulbOn} />
//       <ToggleBulbState setBulbOn={setBulbOn} />
//     </div>
//   );
// }
// function BulbState({ bulbOn }) {
//   const {bulbOn}=useContext(bulbContext);
  
//   return <div>{bulbOn ? "Bulb On" : "Bulb Off"}</div>;
// }
// function ToggleBulbState({ bulbOn, setBulbOn }) {
//   function toggle() {
//     setBulbOn((currentState) => !currentState);
//     //Another way
//     /* setBulbOn(function(currentState){
//       if(currentState==true){
//         return false;
//       } else{
//         return true;
//       }
//     })*/
//     //setBulbOn(!bulbOn);
//   }
//   return (
//     <div>
//       <button onClick={toggle}>Toggle the bulb</button>
//     </div>
//   );
// }

// export default App;

import React, { createContext, useContext, useState } from 'react';

const CountContext = createContext();

function CountContextProvider({ children }) {
  const [count, setCount] = useState(0);

  return <CountContext.Provider value={{count, setCount}}>
    {children}
  </CountContext.Provider>
}

function Parent() {
  return (
    <CountContextProvider>
      <Incrase />
      <Decrease />
      <Value />
    </CountContextProvider>
  );
}



function Decrease() {
  const {count, setCount} = useContext(CountContext);
  function decrease(){
  setCount(count=>count-1);
}
  return <button onClick={decrease}>Decrease</button>;
}

function Incrase() {
  const {count, setCount} = useContext(CountContext);
  return <button onClick={() => setCount(count + 1)}>Increase</button>;
}

function Value() {
  const {count} = useContext(CountContext);
  return <p>Count: {count}</p>;
}

// App Component
const App = () => {
  return <div>
    <Parent />
  </div>
};

export default App;

// using recoil minimize the rerender
