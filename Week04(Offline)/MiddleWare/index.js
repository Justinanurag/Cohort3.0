const express=require('express');
const app=express();
//Creating a function thst return a boolean if the age of the person is more than 14
/*
function isOldEnough(age){
    if(age>=14){
        return true;
    }
    else{
        return false;
    }
}*/
// Middleware creating 
function isOldEnoughMiddleware(req,res,next){
    const age=req.query.age;
        if(age>=14){
        next();
    }
    else{
        res.json({
            msg:"Bhai avi tu baccha yaar! "
        })
    }
}
/*
app.get("/ride1",function(req,res){
    if(isOldEnough(req.query.age)){
        res.json({
        msg:"Welcome in ride 1 :)"
    })
    } else {
        res.status(411).json({
           msg: "Ni bhai avi tu baccha h yarr"
        })
    }
  
})
app.get("/ride2",function(req,res){
    if(isOldEnough(req.query.age)){
        res.json({
            msg:"Welcome in ride 2 :)"
        })
    } else{
          res.status(411).json({
           msg: "Ni bhai avi tu baccha h yarr"
        })
    }
})
app.get("/ride3",function(req,res){
     if(isOldEnough(req.query.age)){
        res.json({
            msg:"Welcome in ride 2 :)"
        })
    } else{
          res.status(411).json({
           msg: "Ni bhai avi tu baccha h yarr"
        })
    }
})
app.get("/ride4",function(req,res){
     if(isOldEnough(req.query.age)){
        res.send("Welcome to ride 5 with justinanurag0.2");
    } else{
          res.status(411).send({
           msg: "Ni bhai avi tu baccha h yarr"
        }) 
    }
})*/
//Using middleware here
app.get("/ride1",isOldEnoughMiddleware,function(req,res,next){
  res.json({
    msg:"hello this is middleware Welcome of ride1"
  })
  
})
app.get("/ride2",isOldEnoughMiddleware,function(req,res,next){
  res.json({
    msg:"hello this is middleware Welcome of ride2"
  })
  
})
//another way to use middleware 
app.use(isOldEnoughMiddleware);//Call it first  **app.use trigger below it use (order matter here)**
app.get("/ride3",function(req,res,next){
  res.json({
    msg:"hello this is middleware Welcome of ride3"
  })
  
})
app.get("/ride4",function(req,res,next){
  res.json({
    msg:"hello this is middleware Welcome of ride4"
  })
})

app.listen(3000);
