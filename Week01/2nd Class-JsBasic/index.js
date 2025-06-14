/*function sum(a,b){
    return a+b;
}
/*
let a=4;
let b=5;
let c=sum(a,b);
console.log(c);
*/
// let ans=sum(4,5)
// console.log(ans);

/*
// Write a function sum that finds the sum of two numbers. 
// Side quest - Try passing in a string instead of a number and see what happens?
function sum(x,y){
    return x+y;
}
let ans=sum("2","3")
console.log(ans);
*/

/*
// Assignment #2
// Write a function called canVote that returns true or false if the age of a user is > 18

function canVote(age){
    if(age>18){
        return true;
    }
    if(age<18){
        return false;
    }
}
let age=23;
let age2=15;
console.log(canVote(age));
console.log(canVote(age2));
*/

// Assignment
// Write a function called sum that finds the sum from 1 to a number
/*
function sum(n){
    let sum=0;
    for(let i=0;i<=n;i++){
        sum=sum+i;
    }
    return sum;
}
let ans=sum(100);
console.log(ans);
*/


// Objects
/*
// An object in JavaScript is a collection of key-value pairs, where each key is a string and each value can be any valid JavaScript data type, including another object.
let user1={
    name:"Anurag",
    age:23,
    gender:"Male"
}
console.log(user1.name);
console.log(user1["age"]);
*/
//Create a function that takes an array of object as Input,and return the user whose age>18 and are male
function calculating (arr){
    let arr2=[];
    for(let i=0;i<arr.length;i++){
        if(arr[i].gender==="Male" && arr[i].age>18){
            arr2.push(arr[i]);
        }
    }
    //We have to initilize a new array
    //you can use the filter function inside an array,map,reduce
    return arr2;

}
const user=[{
    name:"Anurag",
    age:21,
    gender:"Male"
},{
    name:"Harkirat",
    age:19,
    gender:"Male"
},{
    name:"Khushi",
    age:19,
    gender:"Female"
}]
let ans=calculating(user);
console.log(ans);