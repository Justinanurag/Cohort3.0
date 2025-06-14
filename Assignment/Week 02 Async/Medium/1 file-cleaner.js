//Read a file, remove all the extra spaces and write it back to the same file.
const fs=require('fs');

//Replace 'example.txt' with your file path
const filePath='example.txt';
//read the file
fs.readFile(filePath,'utf-8',(err,data)=>{
    if(err){
       return console.log("Error is reading:",err);
        
    }
    //remove expta space,tabs,new line
    const cleanData=data
    .replace(/\s+/g," ")
    .trim();
    //write back to same file
    fs.writeFile(filePath,cleanData,'utf-8',(err)=>{
        if(err){
            return console.log("Error to writing file: ",err);
            
        }
        console.log("File cleaned and saved Sucessfully!")
    });
});