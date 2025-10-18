// TimerBar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography, Paper } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function TimerBar() {
  const [seconds, setSeconds] = useState(30);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!running) return;
    ref.current = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(ref.current);
  }, [running]);

  const fmt = (s) => `0:${s.toString().padStart(2, "0")}`;

  return (
    <Paper
      variant="outlined"
      sx={{
        px: 1,
        py: 0.5,
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderRadius: 2,
      }}
    >
      <IconButton size="small" onClick={() => setSeconds((s) => Math.max(0, s - 5))}>
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography variant="body2" sx={{ width: 40, textAlign: "center" }}>
        {fmt(seconds)}
      </Typography>
      <IconButton size="small" onClick={() => setSeconds((s) => s + 5)}>
        <AddIcon fontSize="small" />
      </IconButton>
      <Box
        onClick={() => setRunning((r) => !r)}
        sx={{
          ml: 1,
          px: 1,
          py: 0.5,
          bgcolor: running ? "success.main" : "grey.200",
          color: running ? "white" : "text.primary",
          borderRadius: 1,
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {running ? "Pause" : "Start"}
      </Box>
    </Paper>
  );
}
