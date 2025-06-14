//Write to a file
//Using the fs library again, try to write to the contents of a file. You can use the fs library to as a black box, the goal is to understand async tasks.

const fs=require('fs').promises;
async function writeToFile(filename,content){
    try {
        await fs.writeFile(filename,content,'utf-8');
        console.log('file has been written sucessfully');
    } catch (error) {
        console.error("Error in file",error);
    }
    }
writeToFile('a.txt',"Anurag");
