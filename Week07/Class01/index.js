const express=require('express');
const {UserModel,TodoModel}=require("./db");
const jwt=require("jsonwebtoken");
const {auth,JWT_SECRET}=require("./auth")
const mongoose=require("mongoose");
const { message } = require('statuses');
const PORT=3000;
const app=express();
mongoose.connect("mongodb+srv://monoperson948:oaD7ted4jl1rGL7e@cluster0.4snkggy.mongodb.net/todo-app-database")
app.use(express.json());

/*-----------/SignUp Route--------------*/
app.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;

    // inserting into DB using Mongoose
    await UserModel.create({
        email: email,
        password: password,
        name: name
    });

    res.json({
        message: "😁 You are signed up successfully!"
    });
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({
        email: email,
        password: password
    });

    if (user) {
        const token = jwt.sign({ id: user._id.toString()}, JWT_SECRET, { expiresIn: "1h" });

        res.json({
            message: "✅ You are successfully logged in",
            token: token
        });

    } else {
        res.status(403).json({
            message: "❌ Incorrect email or password"
        });
    }
    console.log(user);
    
});


/*-----------/Todo Post Route--------------*/
app.post("/todo",auth,(req,res)=>{
    const userId=req.userId;
    const title=req.body.title;
    const done=req.body.name;
    TodoModel.create({
        title,
        userId,
        done
    })
    res.json({
        userId:userId,
        message:"✅ To do credited!"
    })
    
})
/*-----------/Todo get Route--------------*/
app.get("/todo",auth,(req,res)=>{
    const userId=req.userId;
    const todos= TodoModel.find({
       userId:userId
    });
    res.json({
        todos,
        message:"✅ get section credentials"
    })
    
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});