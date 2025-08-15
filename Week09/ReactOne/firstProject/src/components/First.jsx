import React from 'react'
// passing props 
const First = ({data,fn}) => { 
  return (
    <div>{data}
    <button onClick={()=>{fn(10)}}>Set 10 babe</button>
    </div>
  )
}

export default First