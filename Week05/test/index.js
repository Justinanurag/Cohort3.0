const express=require("express");
const cors=require('cors');
const app=express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello cors Testing');
});
app.post('/sum',(req,res)=>{
    const a=parseInt(req.body.a);
    const b=parseInt(req.body.b);
    const result=a+b;
    res.send({sum: result});
     console.log(`Received numbers: ${a} + ${b}. Sent sum: ${result}`);
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});