//Creating an http server
//Express

const express=require("express");
const app=express();
/*
function sum(n){
    let ans=0;
    for(let i=0;i<n;i++){
        ans=ans+1;
    }
    return ans;
}
sum(10);
app.get('/',function(req,res){
    //How do i get querry parameter i get there
    const n=req.query.n;
    const ans=sum(n);
    res.send("Your ans is "+ans);

})*/

const users=[{
    name:"Anurag",
    kidney:[{
        healthy:false
    }]
}];
app.use(express.json());


app.get("/",function(req,res){
    const anuragKidney=users[0].kidney;
    const numberOfKidney=anuragKidney.length;
    let numberOfHealthyKidney=0;
    for(let i=0;i<anuragKidney.length;i++){
        if(anuragKidney[i].healthy){
            numberOfHealthyKidney=numberOfKidney;
        }
    }
    const numberOfUnHealthyKidney=numberOfKidney-numberOfHealthyKidney;
    res.json({
        numberOfKidney,
        numberOfHealthyKidney,
        numberOfUnHealthyKidney
    })

})
app.post("/",function(req,res){
    const isHealthy=req.body.isHealthy;
    users[0].kidney.push({
        healthy:isHealthy 
    })
    res.json({
        msg:" Updation Done"
    })
})
app.put("/",function(req,res){
    for(let i=0;i<users[0].kidney.length;i++){
        users[0].kidney[i].healthy=true;
    }
    res.json({
        msg:"Anurag PUT Request"
    })
})
//removing all the unhealthy kidneys
app.delete("/", function (req, res) {
    const newKidneys = [];

    for (let i = 0; i < users[0].kidney.length; i++) {
        if (users[0].kidney[i].healthy) {
            newKidneys.push({
                healthy: true
            });
        }
    }

    users[0].kidney = newKidneys;

    res.json({
        msg: "Unhealthy kidneys removed successfully"
    })
});

app.listen(3000);