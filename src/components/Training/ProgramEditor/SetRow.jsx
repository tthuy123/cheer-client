import React from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";

export default function SetRow({ index, data, onChange, onRemove }) {
  const { weight, reps, rpe } = data;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "140px 1fr 120px 1fr 60px auto",
        alignItems: "center",
        gap: 1,
        py: 0.5,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {`Set ${index + 1}`}
      </Typography>

      {/* Weight */}
      <TextField
        size="small"
        type="number"
        value={weight}
        onChange={(e) => onChange({ weight: Number(e.target.value) })}
        InputProps={{
          endAdornment: <InputAdornment position="end"> </InputAdornment>,
        }}
      />

      <Typography variant="body2" color="text.secondary">
        Reps
      </Typography>

      {/* Reps */}
      <TextField
        size="small"
        type="number"
        value={reps}
        onChange={(e) => onChange({ reps: Number(e.target.value) })}
      />

      <Typography variant="body2" color="text.secondary">
        RPE
      </Typography>

      {/* RPE + remove button */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          size="small"
          type="number"
          value={rpe}
          onChange={(e) => onChange({ rpe: Number(e.target.value) })}
          sx={{ width: 80 }}
        />
        <IconButton
          onClick={onRemove}
          size="small"
          sx={{ color: "error.main" }}
          aria-label="remove set"
        >
          <RemoveIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
