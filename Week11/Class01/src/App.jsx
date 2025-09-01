import React, { useEffect, useState } from 'react'
import { useFetch, usePost } from './Hooks/useFetch'

const App = () => {
  const postData=usePost();
const {finalData,loading}=useFetch("https://jsonplaceholder.typicode.com/posts/1")
if(loading){
  return <div>
    <h1>Loading.....</h1>
  </div>
}
  return (
    <div>
      {JSON.stringify(finalData)}
    {/* {postData.title} */}
    </div>
  )
}

export default App