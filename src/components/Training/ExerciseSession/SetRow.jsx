// SetRow.jsx
import React from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SetRow({ index, data, onChange, onRemove }) {
  const { weight, reps, rpe, done } = data;

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 2,
        p: 1.5,
        mb: 1,
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography sx={{ color: "error.main", cursor: "pointer" }} onClick={onRemove}>
          ✕
        </Typography>
        <Typography sx={{ ml: 2, fontWeight: 700 }}>{`Set ${index + 1}`}</Typography>
        <Box sx={{ ml: "auto" }}>
          <Checkbox
            checked={!!done}
            onChange={(e) => onChange({ done: e.target.checked })}
            icon={<CheckCircleIcon sx={{ color: "grey.400" }} />}
            checkedIcon={<CheckCircleIcon sx={{ color: "success.main" }} />}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 1,
        }}
      >
        <Box>
          <Typography variant="caption" color="text.secondary">
            Weight (lbs)
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={weight}
            onChange={(e) => onChange({ weight: Number(e.target.value) })}
          />
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">
            Reps
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={reps}
            onChange={(e) => onChange({ reps: Number(e.target.value) })}
          />
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">
            RPE (1-11)
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={rpe}
            onChange={(e) => onChange({ rpe: Number(e.target.value) })}
          />
        </Box>
      </Box>
    </Paper>
  );
}
