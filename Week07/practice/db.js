import mongoose from "mongoose";
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;

// User Schema
const User = new Schema({
  email: { type: String, unique: true },
  password: String,
  name: String
});

// Todo Schema
const Todo = new Schema({
  title: String,
  done: Boolean,
  userId: { type: ObjectId, ref: "users" }
});

// Models
export const UserModel = mongoose.model("users", User);
export const TodoModel = mongoose.model("todos", Todo);
