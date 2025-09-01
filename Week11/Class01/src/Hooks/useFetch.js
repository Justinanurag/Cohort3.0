import React, { useEffect, useState } from "react";

//Custom hook
export function usePost() {
  const [post, setpost] = useState({});
  async function getPost() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const json = await response.json();
    setpost(json);
  }
  useEffect(() => {
    getPost(); 
  }, []);
  return post;
}
//Use fetch hook
export function useFetch(url){
  const [finalData,setFinalData]=useState({});
  async function getDetails(){
    const response=await fetch(url);
    const json=await response.json();
    setFinalData(json);
  }
  useEffect(()=>{
    getDetails();
  },[]);
  return {
    finalData
  }
}
