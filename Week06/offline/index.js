const jwt=require('jsonwebtoken');
const jwtPassword="secret";
const zod=require("zod");

/*-------------Zod Schema------------- */
const emailSchema=zod.string().email();
const passwordSchema=zod.string().min(6);

function signJwt(username,password){
    const usernameResponse=emailSchema.safeParse(username);
    const passwordResponse=passwordSchema.safeParse(password);
    if(!usernameResponse.success || !passwordResponse.success){
        return null;
    }
   const signature= jwt.sign({
        username
    },jwtPassword)
    return signature;
}
// function verifyJwt(token){
//     const verified=jwt.verify(token,jwt.password);
//     if(verified){
//         return true;
//     } else {
//         return false;
//     }

// }
// const x=verifyJwt("bhudfgslkjg");
// console.log(x)

function decodeJwt(token) {
    // true or false
    const decoded = jwt.decode(token);
    if (decoded) {
        return true;
    } else {
        return false;
    }
}
const result = decodeJwt("ans");
console.log(result);


const ans=signJwt("Anurag@gmail.com","1233444");
console.log(ans);
