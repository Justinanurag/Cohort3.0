import React, { useState } from 'react'
import First from './First'
//learning about conditional rendering
const Navbar = () => {
const[x,setx]=useState(0)
  const Click=()=>{
    console.log("Btn click hue ");
    setx(x+1);
    console.log(x);
  }
  return (
    <div>
      {/* <h1>{x}</h1> */}
    <button onClick={Click}>Click me </button>
    <First data={x} fn={setx}/>
    </div>
  )
}

export default Navbar  