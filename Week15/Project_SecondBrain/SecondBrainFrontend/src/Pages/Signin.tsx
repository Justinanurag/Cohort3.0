import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  Divider,
  Link,
  Stack,
  CircularProgress,
} from "@mui/material";

export default function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASEURL;

  const validateInputs = () => {
    let valid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/login`, {
        email,
        password,
      });
      //Save in local storage 
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log("✅ Sign in successful:", response.data);
      navigate("/dashboard");

    } catch (error: any) {
      console.error("❌ Error during sign in:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Sign in failed!");
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
          Sign In
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Email Field */}
          <FormControl fullWidth>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailErrorMessage}
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
              helperText={passwordErrorMessage}
              placeholder="••••••"
              required
            />
          </FormControl>

          <FormControlLabel control={<Checkbox />} label="Remember me" />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <Link
            component="button"
            variant="body2"
            sx={{ alignSelf: "center" }}
            onClick={() => alert("Reset password flow")}
          >
            Forgot your password?
          </Link>
        </Box>

        <Divider sx={{ my: 3 }}>or</Divider>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mb: 1 }}
          onClick={() => alert("Sign in with Google")}
        >
          Sign in with Google
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => alert("Sign in with Facebook")}
        >
          Sign in with Facebook
        </Button>

        <Typography sx={{ mt: 3, textAlign: "center" }}>
          Don't have an account?{" "}
          <Link href="/signup" variant="body2">
            Sign Up
          </Link>
        </Typography>
      </Card>
    </Stack>
  );
}
