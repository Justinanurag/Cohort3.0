const express=require('express')
const app=express();
app.get('/',function(req,res){
res.send("Calculater Home page");
})
app.get('/sum',function(req,res){
    //Input in querry :-http://localhost:3000/sum?a=1&b=4
    const a=Number(req.query.a);
    const b=Number(req.query.b);
    res.send({
        ans:a+b
    })
})
app.get('/add/:firstArg/:secondArg',function(req,res){
    const a=Number(req.params.firstArg);//input in parem:- http://localhost:3000/add/4/5
    const b=Number(req.params.secondArg);
    res.send({
        ans:a+b
    })
})
app.get('/multiply',function(req,res){
       const a=req.query.a;
    const b=req.query.b;
    res.send({
        ans:a*b
    })

})
app.get('/divide',function(req,res){
       const a=req.query.a;
    const b=req.query.b;
    res.send({
        ans:a/b
    })

})
app.get('/subtract',function(req,res){
    const a=req.query.a;
    const b=req.query.b;
    res.send({
        ans:a-b
    })

})

app.listen(3000);