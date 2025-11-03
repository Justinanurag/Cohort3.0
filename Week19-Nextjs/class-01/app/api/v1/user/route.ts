import { NextResponse } from "next/server";
// import {PrismaClient} from "@prisma/config"

export function GET(){
    return NextResponse.json({
        user:"Anurag ",
        email:"justinanurag0.2@gmail.com"
    })
}
// export function POST(){
//     return NextResponse.json({
//         user:"Anurag Tiwari",
//         email:"justinanurag0.2@gmail.com"
//     })
// }
export async function POST(req:NextResponse){
    const data= await req.json();
    await prismaClient.user.create({
        data:{
            username:data.username,
            password:data.password
        }
    })
    console.log(data);
    return NextResponse.json({
        message:"signup  successfully"
    })
}
//get info