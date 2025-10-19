// src/components/Training/SearchBar.jsx
import React from "react";
import { Box, TextField, InputAdornment, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ value, onChange, loading }) => (
  <Box sx={{ width: { xs: "100%", md: "800px" }, mx: "auto", mt: 2 }}>
    <TextField
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search programs..."
      variant="outlined"
      size="medium"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "grey.500" }} />
          </InputAdornment>
        ),
        endAdornment: loading ? (
          <InputAdornment position="end">
            <CircularProgress size={18} />
          </InputAdornment>
        ) : null,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          "& fieldset": { borderColor: "#e6e6e8" },
          "&:hover fieldset": { borderColor: "grey.600" },
          "&.Mui-focused fieldset": { borderColor: "#2e7d32", borderWidth: 2 },
        },
      }}
    />
  </Box>
);

export default SearchBar;
