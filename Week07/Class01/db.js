const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;
//Users Schema
const User=new Schema({
    email:{type:String,unique:true},
    password:String,
    name:String
})
//Todo Schema
const Todo=new Schema({
    title:String,
    done:Boolean,
    userId:ObjectId// User table ka object id lene k liye 

})
const UserModel=mongoose.model('users',User);
const TodoModel=mongoose.model('todos',Todo);

module.exports={
    UserModel,
    TodoModel
};