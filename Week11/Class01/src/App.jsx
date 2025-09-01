import React, { useEffect, useState } from 'react'
import { useFetch, usePost } from './Hooks/useFetch'

const App = () => {
  const postData=usePost();
const {finalData}=useFetch("https://jsonplaceholder.typicode.com/posts/1")
  return (
    <div>
      {JSON.stringify(finalData)}
    {/* {postData.title} */}
    </div>
  )
}

export default App