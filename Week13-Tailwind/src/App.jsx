import React from 'react'
import './App.css'
import Button from "./components/Button"
import Input from './components/Input'
import { Otp } from './components/Otp'
 import SideBar from './components/project-1'

//Learning 
// const App = () => {
//   return (
//     // <div style={{background:"orange",display:"flex",justifyContent:"space-between"}}>
//     <div className='flex justify-between grid grid-cols-3 sm:grid-cols-12'>
//       <div className='sm:bg-amber-400 bg-green-700 col-span-4 sm:grid-cols-12'>First Child</div>
//       <div className='bg-gray-300 col-span-4 sm:grid-cols-12'>Second Child</div>
//       <div className='sm:bg-green-700 bg-amber-400 col-span-4 sm:grid-cols-12'>Third Child</div>
//     </div>
//   )
// }



//Otp box 
// const App = () => {
//   return(
//      <div className='h-screen bg-sky-900 '>
//       <div>
//         <h1 className='text-2xl text-white'>Lets get started </h1>
//       </div>
//       {/* <Input/>
//       <Button/> */}

//       OTP Validation
//       <Otp/>
//      </div>
//   )
// }

// export default App

//Proect-1

// import React from 'react'
// import SideBar from './components/project-1'

const App = () => {
  return (
    <div>
      <SideBar/>
    </div>
  )
}

export default App