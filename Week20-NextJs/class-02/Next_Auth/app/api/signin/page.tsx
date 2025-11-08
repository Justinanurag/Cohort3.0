"use client"

import { useState } from "react"
import axios from "axios"

export default function SignInPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      })

      localStorage.setItem("token", res.data.token)
      alert("Login Success ✅")
    } catch (err) {
      console.error(err)
      alert("Invalid Credentials ❌")
    }
  }

  return (
    <div className="p-4 space-y-3">
      <h1 className="font-bold text-xl">Sign In</h1>

      <input
        type="text"
        placeholder="username"
        className="border px-2 py-1"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        className="border px-2 py-1"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-black text-white px-3 py-1 rounded"
      >
        Sign in
      </button>
    </div>
  )
}
