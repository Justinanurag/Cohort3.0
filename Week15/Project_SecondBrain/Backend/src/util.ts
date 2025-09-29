export function random(len:number){
    let options="asdfghjklzxcvbnmqwertyuiop1234567890";
    let result='';
    for(let i=0;i<len;i++){
        const randomIndex=Math.floor(Math.random()*options.length);
        result+=options[randomIndex];
    }
    return result;
}