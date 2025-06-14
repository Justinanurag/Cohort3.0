//Create a middleware that counts total number of requests sent to a server. Also create an endpoint that exposes it 
const { count } = require('console');
const express = require('express');
const app = express();
let requestCount = 0;
function countRequests(req,res,next){
    requestCount++;
    console.log("Total requestCount using function:", requestCount);
    next();
}
// Use the middleware for all routes
app.use(countRequests);

// Sample route
app.get("/", (req, res) => {
    res.send("Middleware counting requests.");
});

// Route to expose total request count
app.get("/stats", (req, res) => {
    res.send(`Total number of requests: ${requestCount}`);
});

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});