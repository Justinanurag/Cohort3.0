import React, { useState } from 'react'

const App = () => {
  const [count,setCount]=useState(0);
  return (
    <div>
      <button onClick={()=>setCount((prev)=>prev+1)}><h1>{count}</h1>Increase</button>
      <button onClick={()=>setCount(prev=>(prev-1))}> decrease</button>
      <button onClick={()=>setCount(0)}>Reset</button>
    </div>
  )
}

export default App