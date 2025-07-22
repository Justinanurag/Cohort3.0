const bcrypt = require("bcrypt");
const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const { auth, JWT_SECRET } = require("./auth");
const mongoose = require("mongoose");
const { message } = require("statuses");
const PORT = 3000;
const app = express();
const { z } = require("zod");
mongoose.connect(
  "mongodb+srv://monoperson948:oaD7ted4jl1rGL7e@cluster0.4snkggy.mongodb.net/todo-app-database"
); // Database credentails
app.use(express.json());

/*-----------/SignUp Route--------------*/
app.post("/signup", async (req, res) => {
  // ✅ Input validation schema using zod
  const requireBody = z.object({
    email: z.string().min(3).max(100).email(),
    name: z.string().min(3).max(30),
    password: z.string().min(4).max(20),
  });

  // ✅ safeParse returns an object with success/data or error
  const parsedDataWithSuccess = requireBody.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    return res.status(400).json({
      message: "Incorrect format",
      error: parsedDataWithSuccess.error, // to show specific errors
    });
  }

  // ✅ Extract validated values
  const { email, password, name } = parsedDataWithSuccess.data;
  let errorThrow = false;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    await UserModel.create({
      email: email,
      password: hashedPassword,
      name: name,
    });
  } catch (error) {
    res.json({
      message: "User already exist!",
    });
    errorThrow = true;
  }
  if (!errorThrow) {
    res.json({
      message: "😁 You are signed up successfully!",
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const response = await UserModel.findOne({
    email: email,
  });
  if (!response) {
    res.status(403).json({
      message: "Please enter your e-mail id",
    });
  }

  const passwordMatch = await bcrypt.compare(password, response.password);
  console.log(passwordMatch);

  if (passwordMatch) {
    const token = jwt.sign({ id: response._id.toString() }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "✅ You are successfully logged in",
      token: token,
    });
  } else {
    res.status(403).json({
      message: "❌ Incorrect email or password",
    });
  }
  console.log(response);
});

/*-----------/Todo Post Route--------------*/
app.post("/todo", auth, (req, res) => {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.name;
  TodoModel.create({
    title,
    userId,
    done,
  });
  res.json({
    userId: userId,
    message: "✅ To do credited!",
  });
});
/*-----------/Todo get Route--------------*/
app.get("/todo", auth, (req, res) => {
  const userId = req.userId;
  const todos = TodoModel.find({
    userId: userId,
  });
  res.json({
    todos,
    message: "✅ get section credentials",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
