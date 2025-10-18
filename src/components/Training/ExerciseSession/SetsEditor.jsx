// SetsEditor.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import SetRow from "./SetRow";

export default function SetsEditor({ title, sets, onChange, onRemove }) {
  return (
    <Box>
      <Typography sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}>
        {title}
      </Typography>

      {sets.map((s, idx) => (
        <SetRow
          key={s.id}
          index={idx}
          data={s}
          onChange={(patch) => onChange(s.id, patch)}
          onRemove={() => onRemove(s.id)}
        />
      ))}
    </Box>
  );
}
