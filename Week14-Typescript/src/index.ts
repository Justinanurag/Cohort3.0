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

//5 Object in typescript
/*function greet(user:{
    name:string,
    rollno:number
}){
    console.log("Object Name"+user.name)
    console.log("Object Roll Number",user.rollno)
}
greet({
    name:"Anurag",
    rollno:10
})*/

//6 Interface in typescript 
/*
interface UserType{
    firstName:string,
    lastName:string,
    rollNo:number
}
function greet(user:UserType){
console.log("Object Name:"+user.firstName+" "+ user.lastName)
console.log("Object Roll Number",user.rollNo)   
}

greet({
    firstName:"Anurag",
    lastName:"Kumar",
    rollNo:10
})*/

//7 Type in typescript
/*
type Employee={
    name:string,
    startDate:Date;
};

type Manager={
    name:string,
    department:string;
};

type TeamLead=Employee & Manager;

const TeamLead:TeamLead={
    name:"Anurag",
    startDate:new Date(),
    department:"IT"
}
*/

//Week 14 class-2

function isEven(num:number):boolean{
    if(num%2==0){
        return true;
    } else{
        return false;
    }
}
console.log(isEven(10));
console.log(isEven(11));