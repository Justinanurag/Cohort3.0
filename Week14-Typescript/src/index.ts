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

// function isEven(num:number):boolean{
//     if(num%2==0){
//         return true;
//     } else{
//         return false;
//     }
// }
// console.log(isEven(10));
// console.log(isEven(11));


//Interface vs Type 
//Create two types called User and Admin 
//Create a function that takes either a User or an Admin and prints different messages based on the type
/*
interface admin{
    name:string,
    permession:string;
}
interface user{
    name:string,
    age:number,     
}
function greet(user:user & admin){
    console.log("Hello",user.name);
    console.log("Age",user.age)

}
greet({
    name:"Anurag",
    age:24,
    permession:"Admin"
})*/

//Array in typescript
//Given an array of positive numbers, write a function to find the maximum number in the array.
function getMax(nums:number[]):number{
    let maxValue=-1000000000;
    for(let i=0;i<nums.length;i++){
        const num = nums[i];
        if (typeof num === "number" && num > maxValue) {
            maxValue = num;
        }
    }
    return maxValue;
}
getMax([1,2,3,4,5,6,7,8,9,10]);

interface Address{
    city:string,
    pincode:number
}

interface User{
    name:string,
    age:number,
    addressess:Address[];
}

let user:User={
    name:"Anurag",
    age:24,
    addressess:[

    ]
}