"use client";

import axios from "axios"
import { useState } from "react"

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 p-6 rounded-xl border shadow-md w-[350px]">
        <h1 className="text-2xl font-semibold text-center">Sign In</h1>

        <input
          type="text"
          placeholder="Enter Email"
          className="border p-3 rounded-lg outline-none focus:border-black"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg outline-none focus:border-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() => {
            axios.post("http://localhost:3000/api/v1/signin", {
              username,
              password,
            });
          }}
          className="bg-black text-white rounded-lg py-3 font-semibold hover:bg-opacity-80 transition"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
