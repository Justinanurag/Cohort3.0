import React, { useState } from 'react'
import './App.css'
import Button from "./components/Button"
import Input from './components/Input'
import { Otp } from './components/Otp'
//  import SideBar from './components/Sidebar'

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

// const App = () => {
//   return (
//     <div>
//       <SideBar/>
//     </div>
//   )
// }

// export default App

//dark and light mode 
// const App = () => {

//   const [darktheme,setDarktheme]=useState(true);
//   return (
//     <div className={`h-screen ${darktheme ? "bg-white":" bg-black"}`}>
//       <button onClick={()=>setDarktheme(!darktheme)} className= {`${darktheme ? "text-black":"text-white"}`}>Change Theme</button>
//     </div>
//   )
// }

//export default App

//Simpler way to dark and light mode 
// const App = () => {
//   const toggleTheme = () => {
//     document.documentElement.classList.toggle("dark");
//   };

//   return (
//     <div className="h-screen bg-white dark:bg-black text-black dark:text-white">
//       <button onClick={toggleTheme}>Change Theme</button>
//     </div>
//   );
// };

// export default App;


//import React, { useState,useEffect } from 'react'
// export default App
//Save into localStorage
// const App = () => {
// //1. Initialize darktheme from localStorage
//   const [darktheme,setDarktheme]=useState(()=>{
//     const saved=localStorage.getItem("darktheme");
//     return saved ? JSON.parse(saved):true;
//   });
//   //2. Save in local Storage whenEver darktheme change

//   useEffect(()=>{
//     localStorage.setItem("darktheme",JSON.stringify(darktheme));

//   },[darktheme])
//   return (
//     <div className={`h-screen ${darktheme ? "bg-white":" bg-black"}`}>
//       <button onClick={()=>setDarktheme(!darktheme)} className= {`${darktheme ? "text-black":"text-white"}`}>Change Theme</button>
//     </div>
//   )
// }

// export default App


//Simple project 
// import React from 'react'



import { ToggleLeft, ToggleRight } from "lucide-react";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <MainContent sidebarOpen={sidebarOpen} />
    </div>
  );
};

function SideBar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className="flex">
      {/* Toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-cyan-400 rounded-4xl fixed top-0 left-0"
      >
        {sidebarOpen ? <ToggleRight size={24}/> :<ToggleLeft size={24} /> }
      </button>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-72  h-screen  hidden sm:block bg-red-100 shadow-lg p-4 transition-all">
          <h2 className="text-lg font-semibold mb-4">Sidebar Content</h2>
          <ul className="space-y-2">
            <li className="hover:bg-red-200 p-2 rounded">Item 1</li>
            <li className="hover:bg-red-200 p-2 rounded">Item 2</li>
            <li className="hover:bg-red-200 p-2 rounded">Item 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}

function MainContent({ sidebarOpen }) {
  return (
    <div className={`w-full transition-all ${sidebarOpen ? "ml-0" : ""}`}>
      <div className="h-72 bg-black">
        <div className="grid grid-cols-12 gap-8 p-8">
          <div className="h-96 rounded-2xl shadow bg-red-200 md:col-span-3 -translate-y-24 shadow-lg col-span-12 hidden md:block"></div>
          <div className="h-96 rounded-2xl shadow bg-green-200 md:col-span-5 col-span-12"></div>
          <div className="h-96 rounded-2xl shadow bg-yellow-200 md:col-span-4 col-span-12"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
