import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);


const ContentSchema =new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId,ref:"User",required:true},
    authorId:{type:mongoose.Types.ObjectId,ref:"User",required:true}
})

const Content = mongoose.model("Content", ContentSchema);

export{User,Content};

