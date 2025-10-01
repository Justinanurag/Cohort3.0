import React, { useState } from "react";
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
} from "@mui/material";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    console.log("Email:", email, "Password:", password);
    // call your API here
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

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

          <Button type="submit" variant="contained" fullWidth>
            Sign In
          </Button>

          <Link component="button" variant="body2" sx={{ alignSelf: "center" }}>
            Forgot your password?
          </Link>
        </Box>

        <Divider sx={{ my: 3 }}>or</Divider>

        <Button variant="outlined" fullWidth sx={{ mb: 1 }} onClick={() => alert("Sign in with Google")}>
          Sign in with Google
        </Button>
        <Button variant="outlined" fullWidth onClick={() => alert("Sign in with Facebook")}>
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
