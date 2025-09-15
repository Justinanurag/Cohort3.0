//First program

// let x:number=1;
// console.log(x);

//2 function 
// function greet(name:string){
//     console.log("Hello",name);
// }
// greet("Anurag")

//3 
// function Sum(a:number,b:number):number{
//     return a+b;
// }
// console.log(Sum(12,10));

//4
/*
function delatedCall(fn:()=>void){
    setTimeout(fn,1000);
}
delatedCall(function(){
    console.log("hello")
})*/

//5 Object 
function greet(user:{
    name:string,
    rollno:number
}){
    console.log("Object Name"+user.name)
    console.log("Object Role Number",user.rollno)
}
greet({
    name:"Anurag",
    rollno:10
})
