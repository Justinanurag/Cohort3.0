// function Sum(a, b) {
//     return a + b;
// }
// Sum(2, 3); // 5

//Arrow Function
// const Sum=(a,b)=>{
//     return a+b;
// }
// const ans=Sum(2,3)
// console.log(ans)

//Map and Filter
//Given an array give me back a new array in which every value is multiplied by 2

// const arr=[1,2,3,4,5,6,7,8,9,10];
// let n=arr.length;
// let newArr=[];
// for(let i=0;i<n;i++){
//    newArr+=(arr[i]*2);
// }
// console.log(newArr)
//Map 
// function transform(i){
//     return i*2;
// }

// const ans=arr.map(transform);
// console.log(ans);
//Now learning filter
// let newArr=[];
// for(let i=0;i<arr.length;i++){
//     if(arr[i]%2==0){
//         newArr+=arr[i];
//     }
// }
// console.log(newArr)

//

// const arr=["Anurag","Nitin","Mohak","Kaif"];
// const ans=arr.filter(function(n){
//     if(n.startsWith("A")){
//         return true;
//     }
//     else{
//         return false;
//     }
// })
// console.log(ans)
// const arr=[1,2,3,4,5,6,7,8]
// const map=(arr,fun)=>{
//     const transformArr=[];
//     for(let i=0;i<arr.length;i++){
//         transformArr+=(fun(arr[i]));
//     }
//     return transformArr;

// }

// console.log(transformArr);