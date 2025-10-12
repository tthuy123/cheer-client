import React from "react";
import { Paper } from "@mui/material";

export default function ExerciseSection({ children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 1,
      }}
    >
      {children}
    </Paper>
  );
}
