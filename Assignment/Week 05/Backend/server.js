import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config(); //load enviroment Variable

const app=express();

app.use(cors());
app.use(express.json());

//route
app.get('/',function(req,res){
    res.send("Test Server");
})
app.use('/api/auth',);
// app.use('/api/tasks',require("./routes/tasks"));

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on post ${PORT}`);
})



