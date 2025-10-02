import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  Divider,
  Link,
  Stack,
  Checkbox,
} from "@mui/material";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Define Base URL once
  const BASE_URL = import.meta.env.VITE_BASEURL;

  const validateInputs = () => {
    let valid = true;

    if (!name || name.trim().length < 2) {
      setNameError(true);
      setNameErrorMsg("Please enter a valid name.");
      valid = false;
    } else {
      setNameError(false);
      setNameErrorMsg("");
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMsg("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError(false);
      setEmailErrorMsg("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMsg("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMsg("");
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/register`, {
        name,
        email,
        password,
      });

      console.log("✅ Sign up successful:", response.data);
      alert("Sign up successful!");
      navigate("/signin");

    } catch (error: any) {
      console.error("❌ Error during sign up:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Sign up failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      sx={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}
      justifyContent="center"
      alignItems="center"
    >
      <CssBaseline />
      <Card sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3, textAlign: "center" }}>
          Sign Up
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Name Field */}
          <FormControl fullWidth>
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              helperText={nameErrorMsg}
              placeholder="Your full name"
              required
            />
          </FormControl>

          {/* Email Field */}
          <FormControl fullWidth>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailErrorMsg}
              placeholder="your@email.com"
              required
            />
          </FormControl>

          {/* Password Field */}
          <FormControl fullWidth>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordErrorMsg}
              placeholder="••••••"
              required
            />
          </FormControl>

          <FormControlLabel control={<Checkbox />} label="I agree to the Terms and Conditions" />

          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>or</Divider>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => alert("Sign up with Google")}
        >
          Sign up with Google
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => alert("Sign up with Facebook")}
        >
          Sign up with Facebook
        </Button>

        <Typography sx={{ mt: 3, textAlign: "center" }}>
          Already have an account?{" "}
          <Link href="/signin" variant="body2">
            Sign in
          </Link>
        </Typography>
      </Card>
    </Stack>
  );
}
