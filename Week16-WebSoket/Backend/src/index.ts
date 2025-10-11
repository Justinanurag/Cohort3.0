import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket:any) => {
  console.log("User Connected!!!");

  // setInterval(()=>{
  //   socket.send("Current price of solana is "+ Math.random());
  // },500)
  // socket.on("message",(e:string)=>{
  //   console.log(e.toString())
  // })
  socket.on("message",(e:string)=>{
    if(e.toString()==="ping"){
      socket.send("pong");
    }
  })
});




// app.get("/users",(req:Request,res:Response)=>{

// })
