/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
    let n=str.length;
    let reverse="";
    for(let i=n-1;i>=0;i--){
        reverse=reverse+str[i];

    }
  return str===reverse;
}
console.log(isPalindrome("madam"));
