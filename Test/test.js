// const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
// console.log( await response.json());
// fetch('https://jsonplaceholder.typicode.com/todos/1')
//   .then(response => response.json())
//     .then(json => console.log(json));


//     fetch ('https://jsonplaceholder.typicode.com/todos/2')
//     .then(response => response.json())
//     .then(json=>console.log(json));

// const name="Anurag";
// let reverseName="";
// for (let i=name.length-1;i>=0;i--){
//     reverseName=reverseName+name[i];
// }
// console.log(reverseName);

const name=[1,2,3,4,5,6];
let rev=[];
for (let i=name.length-1;i>=0;i--){
    // console.log(name[i]);
    rev.push(name[i]);
}
console.log(rev);