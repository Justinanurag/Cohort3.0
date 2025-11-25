import {WebSocketServer} from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';

const wss=new WebSocketServer({port:8080});

wss.on('connection',(ws,request)=>{
   const url=request.url;
   if(!url){
    return;
   }
   const queryParams=new URLSearchParams(url.split('?')[1]);
   const token=queryParams.get('token')||"";
   const decoded=jwt.verify(token as string ,process.env.JWT_SECRET as string);

    if(typeof decoded==='string'){
        ws.close(1008,"Unauthorized");
        return;
    }
   if(!decoded || !(decoded as JwtPayload).userId){
    ws.close(1008,"Unauthorized");
    return;
}
});     