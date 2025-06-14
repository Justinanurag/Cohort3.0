//Basic of File system
const fs=require('fs');
// const data=fs.readFileSync('./a.txt','utf-8');
// console.log("This is file from Text",data);
 //Function to read file async
 const data=fs.readFile('a.txt','utf-8',(err,data)=>{
    if(err){
        console.log("Error: File is not found",err);
    }
    else{
        console.log("File Data contents is: ",data)
    }
 });

