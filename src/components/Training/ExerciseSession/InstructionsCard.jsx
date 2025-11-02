// InstructionsCard.jsx
import React from "react";
import { Paper, Box, Typography } from "@mui/material";

export default function InstructionsCard({ instructions, cues }) {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{ borderRadius: 2, p: 2, mb: 1, bgcolor: "grey.50" }}
        align="left"
      >
        <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Instructions</Typography>
        <Typography variant="body2" color="text.secondary">
          {instructions}
        </Typography>
      </Paper>

      <Paper
        variant="outlined"
        sx={{ borderRadius: 2, p: 2, bgcolor: "grey.50" }}
        align="left"
        // sx={{ whiteSpace: 'pre-line' }}
      >
        <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Cues (Safety Warnings)</Typography>
        <Typography variant="body2" color="text.secondary">
          {cues?.map((c, i) => `${i + 1}. ${c}`).join("\n")}
        </Typography>
      </Paper>
    </>
  );
}
