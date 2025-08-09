import React, { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0); 

  function increase() {
    setCount((count) => count + 1);
  }
  function decrease() {
    setCount2((count2) => count2 + 1);
  }

  return (
    <div>
      <Counter count={count} count2={count2} />
      <button onClick={increase}>Increase Count</button>
      <button onClick={decrease}>Decrease Count</button>
    </div>
  );
}

function Counter(props) {
  useEffect(function () {
    console.log("render ");
    return function () {
      console.log("unmount");
    };
  }, []);

  return (
    <div>
      Counter {props.count}
      <br />
      Counter2 {props.count2}
    </div>
  );
}

export default App;
