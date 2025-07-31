import express from "express";
import { UserModel, TodoModel } from "./db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose, { trusted } from "mongoose";
dotenv.config();
const PORT = 3000;
const app = express();
app.use(express.json());

//database connection

try {
  mongoose.connect(
    "mongodb+srv://monoperson948:oaD7ted4jl1rGL7e@cluster0.4snkggy.mongodb.net/ToDoAppPractice"
  );

  console.log("Database connected successfully....!!");
} catch (error) {
  console.error("Database is not connected!");
}

/*-----------/SignUp Route--------------*/
app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  // Basic validation
  if (!name || name.length < 4 || !password || password.length < 6) {
    return res.status(400).json({
      message:
        "Name must be at least 4 characters and password at least 6 characters",
    });
  }

  try {
    // Check if user already exists by email (you can change to 'name' if needed)
    const userExists = await UserModel.findOne({ email: email });
    if (userExists) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Create and save new user
    const newUser = new UserModel({
      email,
      password,
      name,
    });

    await newUser.save();

    res.status(201).json({
      message: "You are signed up successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

/*-----------/Signin Route--------------*/
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  //Check
  const user = await UserModel.findOne({
    email: email,
    password: password,
  });
  console.log(user);

  if (user) {
    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      email: email,
      token: token,
    });
  } else {
    res.json({
      message: "Incorrect Credentials!",
    });
  }
});
/*-----------/post todo Route--------------*/
app.post("/todo", (req, res) => {
     const userId=req.userId;
    res.json({
        message:"From todo post request",
        userId:userId
    })
});
/*-----------/get todo Route--------------*/
app.get("/todo", (req, res) => {
    const userId=req.userId;
    res.json({
        message:"From todo post request",
        userId:userId
    })
});
function auth(req,res,next){
    const token=req.header.token;
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    if(decodedData){
        req.userId=decodedData.userId;
        next();
    } else{
        res.status(403).json({
            message:"Incorrect Credentials! "
        })
    }
}

app.listen(PORT, () => {
  console.log(`Server is running on post ${PORT}`);
});
