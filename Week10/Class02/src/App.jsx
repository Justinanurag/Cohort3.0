import React, { useState } from 'react'

const App = () => {
  return (
    <div>
     <LightBulb/>
    </div>
  )
}
function LightBulb(){
  const [bulbOn,setBulbOn]=useState(true);
  return <div>
    <BulbState bulbOn={bulbOn}/>
    <ToggleBulbState setBulbOn={setBulbOn}/>
  </div>
}
function BulbState({bulbOn}){
  
 return <div>
  {bulbOn ? "Bulb On":"Bulb Off"}
 </div>
}
function ToggleBulbState({bulbOn,setBulbOn}){
  function toggle(){
    setBulbOn(currentState=>!currentState);
    //Another way 
   /* setBulbOn(function(currentState){
      if(currentState==true){
        return false;
      } else{
        return true;
      }
    })*/
   //setBulbOn(!bulbOn);
  }
  return <div>
    <button onClick={toggle}>Toggle the bulb</button>
  </div>

}

export default App