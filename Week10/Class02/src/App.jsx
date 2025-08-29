import React, { useContext, useState } from "react";
const bulbContext = createContext();

const App = () => {
  return (
    <div>
      <bulbContext.Provider value={{
        bulbOn:bulbOn,
        setBulbOn:setBulbOn
      }}>
        <LightBulb />
      </bulbContext.Provider>
    </div>
  );
};
function LightBulb() {
  const [bulbOn, setBulbOn] = useState(true);
  return (
    <div>
      <BulbState bulbOn={bulbOn} />
      <ToggleBulbState setBulbOn={setBulbOn} />
    </div>
  );
}
function BulbState({ bulbOn }) {
  const {bulbOn}=useContext(bulbContext);
  
  return <div>{bulbOn ? "Bulb On" : "Bulb Off"}</div>;
}
function ToggleBulbState({ bulbOn, setBulbOn }) {
  function toggle() {
    setBulbOn((currentState) => !currentState);
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
  return (
    <div>
      <button onClick={toggle}>Toggle the bulb</button>
    </div>
  );
}

export default App;
