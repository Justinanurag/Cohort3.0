const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const app = express();
const PORT = 3000;
const JWT_SECRET = "randomAnuragtiwari";
const users = [];

app.use(express.json());

/*---------- Logger Middleware -----------*/
function logger(req, res, next) {
  console.log(req.method + " request came to " + req.url);
  next();
}

/*---------- Serve Frontend ----------*/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/*---------- Signup Route ----------*/
app.post("/signup", logger, (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || username.length < 4 || !password || password.length < 6) {
    return res.status(400).json({
      message: "Username must be at least 4 characters and password at least 6 characters"
    });
  }

  // Check if user exists
  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(409).json({
      message: "Username already exists"
    });
  }

  // Save user
  users.push({ username, password });

  res.status(201).json({
    message: "Signup successfully!"
  });
});

/*---------- Signin Route ----------*/
app.post('/signin', logger, (req, res) => {
  const { username, password } = req.body;

  const foundUser = users.find(u => u.username === username && u.password === password);

  if (!foundUser) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "10s" });

  res.json({
    message: "Signin successful",
    token
  });
});

/*---------- Auth Middleware ----------*/
function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "❌ Token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (err) {
    return res.status(403).json({ message: "❌ Invalid or expired token" });
  }
}

/*---------- Protected Route (/me) ----------*/
app.get("/me", logger, auth, (req, res) => {
  const foundUser = users.find(user => user.username === req.username);

  if (foundUser) {
    return res.json({
      username: foundUser.username,
      // Avoid sending password
      message: "✅ Login successful in user route"
    });
  } else {
    return res.status(404).json({ message: "😥 User not found" });
  }
});

/*---------- Start Server ----------*/
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
