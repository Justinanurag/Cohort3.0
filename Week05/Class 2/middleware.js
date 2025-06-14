const { count } = require('console');
const express = require('express');
const app = express();
//Count total number of requets 
let requestCount=0;
//Another method to count total number of requests by using function
function countRequrest(req,res){
    requestCount++;
    console.log("Total requestCount using function:", requestCount);
}
countRequrest(app);

app.use("/",(req,res,next)=>{
    res.send("Middleware page");
    requestCount++;
    countRequrest(app);
    console.log("Total requestCount:", requestCount);
    console.log("This is middleware function");  
    next();
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});