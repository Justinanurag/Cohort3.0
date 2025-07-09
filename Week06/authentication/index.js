const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Function to generate a random token
function generateToken() {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
}

// In-memory users array
const users = [];

/* ---------------- Signup Route ---------------- */
app.post('/signup', function (req, res) {
    const { username, password } = req.body;

    // Basic validations
    if (!username || username.length < 3 || !password || password.length < 6) {
        res.json({
            message: "❌ Username must be at least 3 characters and password at least 6 characters."
        });
        return;
    }

    // Check if username already exists
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        res.json({
            message: "⚠️ Username already exists."
        });
        return;
    }

    // Save new user
    users.push({ username, password });
    res.json({
        message: "✅ Signup successful!"
    });
});

/* ---------------- Signin Route ---------------- */
app.post('/signin', function (req, res) {
    const { username, password } = req.body;

    // Check if user exists
    const foundUser = users.find(user => user.username === username && user.password === password);

    if (!foundUser) {
        res.json({
            message: "❌ Invalid username or password"
        });
        return;
    }

    // Send success response with token
    res.json({
        message: "✅ Sign-in successful",
        token: generateToken()
    });
    console.log(users)
});
app.get("/me",function(req,res){
    const token=req.header.token
    let foundUser=null;
    for(let i=0;i<users.length;i++){
        if(users[i].token==token){
            foundUser=users[i];
        }
    }
    if(foundUser){
        res.json({
            username:foundUser.username,
            password: foundUser.password,
            message:"Login successfully in user route"
        })
    } else{
        res.json({
            message:"Sorry Token Invalid"
        })
    }
})

/* ---------------- Server Start ---------------- */
app.listen(3000, function () {
    console.log(`🚀 Server is running on port`);
});
