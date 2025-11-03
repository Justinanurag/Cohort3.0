"use client";
import axios from "axios";
import { useState } from "react";

export default function Signup() {
    const[email,setEmail]=useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex flex-col gap-4 p-6 rounded-xl border shadow-md w-[350px]">
                <h1 className="text-2xl font-semibold text-center">Sign up</h1>

                <input
                    onChange={e => {
                        setUsername(e.target.value)
                    }}
                    type="text"
                    placeholder="username"
                    className="border p-3 rounded-lg outline-none focus:border-black"
                />
                <input
                    onChange={e => {
                        setEmail(e.target.value)
                    }}
                    type="text"
                    placeholder="email"
                    className="border p-3 rounded-lg outline-none focus:border-black"
                />

                <input
                onChange={e => {
                        setPassword(e.target.value)
                    }}
                    type="password"
                    placeholder="Password"
                    className="border p-3 rounded-lg outline-none focus:border-black"
                />

                <button onClick={() => {
                    axios.post("http://localhost:3000/api/v1/signup",{
                        username,
                        email,
                        password
                    })
                }}
                    className="bg-black text-white rounded-lg py-3 font-semibold hover:bg-opacity-80 transition">
                    Sign up
                </button>
            </div>
        </div>
    );
}
