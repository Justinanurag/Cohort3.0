// FETCHING DATA IN BACKEND CODE 
// "use client"
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function User() {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get('https://jsonplaceholder.typicode.com/todos')
//       .then(res => {
//         setData(res.data);
//         setLoading(false);
//         console.log(res.data[1]);
//       })
//       .catch(err => {
//         console.log("Error fetching data:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading......</div>
//   }

//   return (
//     <div>
//       <h1>This is user page</h1>
//       <pre>{JSON.stringify(data.slice(0,5), null, 2)}</pre>
//     </div>
//   );
// }

// FETCHING DATA IN BACKEND CODE  
import axios from "axios";
export default async function User() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

  console.log("server component response:", response.data);

  return (
    <div>
      <h1>This is user page</h1>

      <pre>{JSON.stringify(response.data.slice(0,5), null, 2)}</pre>
    </div>
  );
}

