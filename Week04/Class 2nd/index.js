const express=require('express');
const app=express();

//route Handler 
app.get('/',function(req,res){
    res.send("Hello Babe");
})

// const fs=require("fs")
// fs.readFile("a.txt",function(err,data){

// })
app.listen(3000); 