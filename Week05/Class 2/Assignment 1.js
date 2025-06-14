//Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console
const express = require('express');
const app=express();

function middleware(req,res,next){
    console.log("HTTP Method:",req.method);
    console.log("Url:",req.url);
    console.log("Timestamp:",new Date().toISOString());
    next();
}
app.use(middleware);
app.get("/", (req, res) => {
    res.send("GET route");
});

app.post("/", (req, res) => {
    res.send("POST route");
});


app.listen(3000,()=>{
    console.log("Server is running on 3000");
})