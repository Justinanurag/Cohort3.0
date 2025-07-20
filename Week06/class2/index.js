const express = require("express");
const jwt = require("jsonwebtoken");
const { message } = require("statuses");
const JWT_SECRET = "randomAnuragtiwari";
const app = express();
app.use(express.json());
const PORT=3000;
const users = [];

/*----------Logger----------- */
function logger(req,res,next){
  console.log(req.method + "Request came");
  next();
}


//Signup route
app.post("/signup",logger, (req, res) => {
  const { username, password } = req.body;
  //Basic validation
  if (!username || username.length < 4 || !password || password.length < 6) {
    res.json({
      message:
        "Username must be at least 3 char and password at least 6 character",
    });
    return;
  }

  //check if username already exist
  const userExist = users.find((u) => u.username === username);
  if (userExist) {
    res.json({
      message: "Username is already exist",
    });
    return;
  }
  //Save new user
  users.push({
    username,
    password,
  });
  res.json({
    message: "Signup Sucessfully!",
  });
});

/*-----------------------signin route-----------*/
app.post('/signin',logger,(req,res)=>{
    const {username,password}=req.body;
    //check if user exists
    const foundUser=users.find(u=>u.username===username && u.password===password);
    const token=jwt.sign({
        username:username,
    },JWT_SECRET);
    if(!foundUser){
        res.json({
            message:"Invalid username or password"
        });
        return;
    }
    //Send success response with token
    res.json({
        message:"Sign-in successfull",
        token:token
    });
    console.log(users)
});

/*---------------------- Adding middleware---------- -----------*/
function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "❌ Token missing" });
    }

    try {
        const decodedInformation = jwt.verify(token, JWT_SECRET);
        req.username = decodedInformation.username;
        next();
    } catch (err) {
        return res.status(403).json({ message: "❌ Invalid or expired token" });
    }
}


app.get("/me",logger, auth, (req, res) => {
    const foundUser = users.find(user => user.username === req.username);

    if (foundUser) {
        res.json({
            username: foundUser.username,
            // ⚠️ Don't expose password in production
            message: "✅ Login successful in user route"
        });
    } else {
        res.status(403).json({ message: "😥 User not found" });
    }
});


// app.get("/todo",(req,res)=>{
//   const token=req.headers.token;
//   const decodedInformation=jwt.verify(token,JWT_SECRET);
//   if(decodedInformation.username){

//   } else{
//     res.json({
//       message:"You are not logged in!"
//     })
//   }
// })


/*---------------Server Started -----------------*/
app.listen(3000,function(){
    console.log(`Server is running on post ${PORT}`);
})