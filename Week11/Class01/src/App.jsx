import React, { useState } from 'react'
//Custom hooks
function useCounter(){
  const [count,setCount]=useState(0);//Create State variable 
  function increaseCount(){ //Define the function
    setCount(count+1);
  }
  function decreseCounter(){
    setCount(count-1);
  }
 
  return {// return function as a state variable 
    count:count,
    increaseCount:increaseCount,
    decreseCounter:decreseCounter
  }
}

const App = () => {
  const{count,increaseCount}=useCounter();
  // const [count,setCount]=useState(0);
  // function increaseCount(){
  //   setCount(count=>count+1)
  // }
  return (
    <div>
     <Counter/>
     <CounterDec/>
    </div>
  )
}

function Counter(){
  const {count,increaseCount}=useCounter();
  return <div>
    <button onClick={increaseCount}>Increase {count}</button>
  </div>
}
function CounterDec(){
  const{count,decreseCounter}=useCounter();
  return <div>
    <button onClick={decreseCounter} >Decrease {count}</button>
  </div>
}
export default App