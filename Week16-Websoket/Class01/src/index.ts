import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket:any) => {
  console.log("User Connected!!!");

  setInterval(()=>{
    socket.send("Current price of solana is "+ Math.random());
  },500)
});


// app.get("/users",(req:Request,res:Response)=>{

// })
