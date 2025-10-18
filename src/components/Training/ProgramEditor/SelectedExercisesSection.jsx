import React from "react";
import { Paper } from "@mui/material";

export default function SelectedExercisesSection({ children }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        width: "98%",
        borderRadius: 2,
        p: 2,
        bgcolor: "background.paper",
      }}
    >
      {children}
    </Paper>
  );
}
