//Write a function that return a promise that resolve after n seconds have passed ,where n is the argument passed to the function.
 function wait(n){
    let p=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Done!");
        },3000*n);
    });
    return p;
 }
 wait(3).then((message)=>{
    console.log(message);  
 })