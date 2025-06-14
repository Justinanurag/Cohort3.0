//Using callback hell, write a program that prints "Hii" after 1 second, "Hello" after 3 seconds, and "Hello there" after 5 seconds.+
/*
function callback(){
    console.log("Hii");
}
setTimeout(function(){
    console.log("Hii");
    setTimeout(function(){
        console.log("Hello");
        setTimeout(function(){
            console.log( "Hello there");
        },5000)
    },3000)
},1000);
console.log("I am outside of callback hell");
*/
/*
//Promisified version
function setTimeoutPromisified(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
setTimeoutPromisified(1000)
  .then(function () {
    console.log("hi");
    return setTimeoutPromisified(3000);
  })
  .then(function () {
    console.log("hello");
    return setTimeoutPromisified(5000);
  })
  .then(function () {
    console.log("hello there");
  });
*/

// Counter without setInterval
// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

// (Hint: setTimeout)
//Using Async await syntax

function setTimeoutPromisified(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));

}
async function solve(){
    await setTimeoutPromisified(1000);
    console.log("hii");
    await setTimeoutPromisified(2000);
    console.log("hello");
    await setTimeoutPromisified(5000);
    console.log("Hello there");
}
solve();
console.log("Outside of all block");
