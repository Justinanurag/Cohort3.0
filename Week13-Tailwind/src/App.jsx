import React from 'react'
import './App.css'

const App = () => {
  return (
    // <div style={{background:"orange",display:"flex",justifyContent:"space-between"}}>
    <div className='flex justify-between grid grid-cols-3 sm:grid-cols-12'>
      <div className='sm:bg-amber-400 bg-green-700 col-span-4 sm:grid-cols-12'>First Child</div>
      <div className='bg-gray-300 col-span-4 sm:grid-cols-12'>Second Child</div>
      <div className='sm:bg-green-700 bg-amber-400 col-span-4 sm:grid-cols-12'>Third Child</div>
    </div>
  )
}

export default App