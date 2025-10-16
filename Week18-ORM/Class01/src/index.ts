import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000;

const client = new PrismaClient();

// ✅ Get all users
app.get("/user", async (req, res) => {
  try {
    const users = await client.user.findMany();
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Create a user
app.post("/user", async (req, res) => {
  try {
    const { username, password, age, city } = req.body;
    const newUser = await client.user.create({
      data: { username, password, age, city },
    });
    res.status(201).json({ message: "User created", newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/todo/:id",async(req,res)=>{
    const id=parseInt(req.params.id)
    const users=await client.user.findMany({
        where:{
            id:id
        },
        select:{
            todos:true
        }
    })
    res.json({users})
})

// ✅ Delete user by ID
app.delete("/user/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await client.user.delete({
      where: { id },
    });
    res.json({ message: `User with ID ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log("🚀 Server is running on http://localhost:PORT");
});
