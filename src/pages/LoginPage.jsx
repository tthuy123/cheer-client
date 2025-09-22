import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined, EmailOutlined } from "@mui/icons-material";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 8 }}>
      {/* Logo */}
      <Box sx={{ mb: 2 }}>
        <img
          src="https://cheertrainer.com/logo.jpg" 
          alt="Cheer Trainer Logo"
          style={{ borderRadius: "20px", width: "80px", height: "80px" }}
        />
      </Box>

      {/* Title */}
      <Typography variant="h5" fontWeight="bold" color="green" gutterBottom>
        Cheer Trainer
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Sign in to your account
      </Typography>

      {/* Form */}
      <Paper elevation={0} sx={{ width: "100%", p: 2 }}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, mb: 2 }}>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "green",
            "&:hover": { backgroundColor: "darkgreen" },
            py: 1.2,
          }}
        >
          Sign in
        </Button>
      </Paper>

      {/* Sign up link */}
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don’t have an account?{" "}
        <Link href="#" underline="hover">
          Sign up
        </Link>
      </Typography>
    </Container>
  );
}
