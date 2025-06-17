const express=require('express');
const cors=require("cors");
const dotenv=require('dotenv');
const connectDB=require('./DB/database');
dotenv.config(); //load enviroment Variable

const app=express();

app.use(cors());
app.use(express.json());
connectDB();
//route
app.get('/',function(req,res){
    res.send("Test Server");
})
// app.use('/api/auth',require("./routes/auth"));
// app.use('/api/tasks',require("./routes/tasks"));

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on post ${PORT}`);
})
