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
/*
interface User{
    name:string;
    age:number;
    isLegal():boolean;
}

class Manager implements User{
    name:string;
    age:number;
    constructor(name:string,age:number){
        this.name=name;
        this.age=age;
    }
    isLegal() {
        return this.age>18
    }
}

const m=new Manager("harkirat",21);
console.log(m);
console.log(m.isLegal())
*/

// interface User{
//     name:string;
//     age:number;
// }

// type User={
//     name:string,
//     age:number
// }

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
/*
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
const ans:number=getMax([1,2,3,4,5,6,7,8,9,10]);
console.log(ans)
*/
//Filter on age >18
// interface User{
//     firstName:string,
//     lastName:string,
//     age:number
// }

// function filterUsers(users: User[]): User[] {
//     let ans: User[] = [];
// for (let i = 0; i < users.length; i++) {
//     const user = users[i];
//     if (user && user.age > 18) {
//         ans.push(user);
//     }
// }
//     return ans;
// }

// const answer=filterUsers([
//     {firstName:"Anurag",lastName:"Kumar",age:24},
//     {firstName:"Ankit",lastName:"Kumar",age:17},
// ])

// console.log(answer);


// Self practice 
/*
interface User{
    name:string,
    age:number,
    address:string
}

//Apply there filter condition for adult age>18

function filterAdult(users:User[]){
    let ans:User[]=[];
    for(let i=0;i<users.length;i++){
        const user=users[i];
        if(user && user.age>18){
            ans.push(user);
        }
    }
    return ans;
}

const Adult=filterAdult([
        {name:"Anurag", age:24,address:"Bhilai"},
        {name:"Ankit", age:17,address:"Bhilai"},
        {name:"Rza", age:16,address:"Bhilai"},
        {name:"Jhon", age:23,address:"Bhilai"},
        {name:"Doe", age:13,address:"Bhilai"},
])

console.log(Adult);
*/
/*
//Week-14 class-3
//Sum of two age
interface User{
    name:string,
    age:number,
     
}

function sumOfAge(user1:User,user2:User):number{
    return user1.age + user2.age;
}

const AgesAre=sumOfAge({name:"Anurag",age:21},{name:"Ankit",age:17});
console.log(AgesAre);
*/
//Learning Pick in typescript
// interface User{
//     id:string,
//     name:string,
//     email:string,
//     password:string
//     age:number
// }


//Partial type
// interface updateProfile{
//     name?:string,
//     age?:number,
//     email?:string
//     password?:string
// }

//insted of writing above code we can use pick
// type updateProfile=Pick<User,"name" | "age" | "email" | "password">

//Learning Omit in typescript
// type updateProfile=Omit<User,"id">

// function updateUser(updateProfile:updateProfile){

// }

/*
//Readonly
//  type User={
//     readonly name:string,
//     readonly age:number,
//  }

//Alternative
    type User=Readonly<{   
    name:string,
    age:number,
 }>

 const user:User={
    name:"Anurag",
    age:24,
 }
    console.log(user);
//user.name="Ankit"
// console.log(user);
*/

//Record : Give me cleaner way to write object type
/*
 type User=Record<string,{name:string,age:number}>

 const user:User={
    "anurag":{name:"Anurag",age:24},
    "ankit":{name:"Ankit",age:17},
 }

 console.log(user);
 */


 /*
import express from "express";
import { success, z } from "zod";
const app = express();
const PORT = 3000; 
app.use(express.json());


//Defining the Schema for profile update using Zod
const profileSchema = z.object({
    name:z.string().min(2,{message:"Name should be at least 2 characters long"}).max(100),
    age:z.number().min(0,{message:"Age should be a positive number"}).max(120,{message:"Age should be less than 120"}),
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"Password should be at least 6 characters long"})
});
// type finalProfileSchema= {
//     name:string,
//     age:number,
//     email:string,
//     password:string
// }
//Another way to define type from zod schema using infer
type finalProfileSchema=z.infer<typeof profileSchema>;

app.put(("/profile"),(req,res)=>{
    const parseResult=profileSchema.safeParse(req.body);

    const updateProfile:finalProfileSchema=req.body;

    if(!success){
        res.status(400).json(parseResult.error);
    }

    //Upadate 
    res.status(200).json({
        message:"Profile updated successfully",
    })
})

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
*/