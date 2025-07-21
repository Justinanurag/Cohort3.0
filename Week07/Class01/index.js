const express=require('express');
const {UserModel,TodoModel}=require("./db");
const jwt=require("express");
const JWT_SECRET="randomstring1234";
const PORT=3000;
const app=express();
app.use(express.json());

/*-----------/SignUp Route--------------*/
app.post("/signup",async (req,res)=>{
    const {email,password,name}=req.body;
    //inserting in db
   await UserModel.insert({
        email:email,
        password:password,
        name:name
    });
    res.json({
        message:"😁 You are sign up successfully!"
    })


})
/*-----------/Login Route--------------*/
app.post("/login",(req,res)=>{
    const{email,password}=req.body;

    //Check 
    const user=UserModel.findOne({
        email:email,
        password:password
    });
    if(user){
        const token=jwt.sign({username},JWT_SECRET,{expireIn:"1h"});

        res.json({
            message:"✅ You are successfully login"
        })

    } else{
        res.status(403).json({
            message:"❌ Incorrect email or password"
        })
    }
    
})
/*-----------/Todo Post Route--------------*/
app.post("/todo",(req,res)=>{
    
})
/*-----------/Todo get Route--------------*/
app.get("/todo",(req,res)=>{
    
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});