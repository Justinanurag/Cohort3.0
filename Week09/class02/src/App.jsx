// import React from "react";

// const App = () => {
//   const todos = [
//     { title: "go to gym", done: false },
//     { title: "Go to study", done: true },
//   ];

//   const styleComponents = {
//     backgroundColor: "red",
//     color: "white",
//     padding: 10,
//     borderRadius: 20,
//   };

//   function Todo({ title, done }) {
//     return (
//       <div style={styleComponents}>
//         {title} - {done ? "Done!" : "Not Done!"}
//       </div>
//     );
//   }

//   const todosComponents = todos.map((todo, index) => (
//     <Todo key={index} title={todo.title} done={todo.done} />
//   ));

//   return <div>{todosComponents}</div>;
// };

// export default App;

import React from 'react'
import { useState } from 'react'

const ToggleMessage=()=>{
  const [notificationCount,setnotificationCount]=useState(0);

  function increment(){
      setnotificationCount(notificationCount+1);
  }
  return (
    <div>
      <button onClick={increment}>
        Toggle message
      </button>
      <br /> 
      <span>
{notificationCount}
      </span>
      
    </div>
  )
}

const App = () => {
  return (
    <div>
<ToggleMessage/>
    </div>
    
  )
}

export default App