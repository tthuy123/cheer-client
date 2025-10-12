import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function ExerciseSearchBar({ value, onChange }) {
  return (
    <TextField
      size="small"
      placeholder="Search exercises..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ width: 320 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  );
}
