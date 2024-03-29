import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppSelector } from "app/store.ts";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks/reduxHook.ts";
import { authActions } from "auth/authSlice.ts";

const email = "tan.danilovich@gmail.com";
const password = "3i!7cM9TSYicim3";

export default function Login() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password")
    });

    if (email && password) {
      dispatch(authActions.logIn({ email, password }));
    }
  };

  if (isLoggedIn) {
    return <Navigate to = {"/"} />;
  }
  return (
    <Container component = "main" maxWidth = "xs">
      <CssBaseline />
      <Box
        sx = {{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography component = "h1" variant = "h5">
          Sign in
        </Typography>
        <Box component = "form" onSubmit = {handleSubmit} noValidate sx = {{ mt: 1 }}>
          <TextField
            margin = "normal"
            required
            fullWidth
            id = "email"
            label = "Email Address"
            name = "email"
            autoComplete = "email"
            autoFocus
            value = {email}
          />
          <TextField
            margin = "normal"
            required
            fullWidth
            name = "password"
            label = "Password"
            type = "password"
            id = "password"
            autoComplete = "current-password"
            value = {password}
          />
          <FormControlLabel control = {<Checkbox value = "remember" color = "primary" />} label = "Remember me" />
          <Button type = "submit" fullWidth variant = "contained" sx = {{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
