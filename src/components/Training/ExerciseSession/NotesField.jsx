// NotesField.jsx
import React from "react";
import { Box, Typography, TextField } from "@mui/material";

export default function NotesField({ value, onChange }) {
  return (
    <Box sx={{ my: 2 }}>
      <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Notes</Typography>
      <TextField
        fullWidth
        multiline
        minRows={3}
        placeholder="Add any notes about this workout..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
}
