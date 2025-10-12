import React from "react";
import { Box, Typography } from "@mui/material";

export default function EmptyState({ text = "No data." }) {
  return (
    <Box sx={{ py: 2, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}
