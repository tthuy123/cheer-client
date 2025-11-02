// PastWorkouts.jsx
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Link,
  Grid,
} from "@mui/material";

export default function PastWorkouts({ items = [] }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? items : items.slice(0, 2);

  return (
    <Paper
      variant="outlined"
      sx={{ borderRadius: 2, p: 2, bgcolor: "background.paper" }}
      align="left"
    >
      <Typography sx={{ fontWeight: 700, mb: 1 }}>Past Workouts</Typography>

      {shown.map((w) => (
        <Box key={w.id} sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {w.date}
          </Typography>

          <Grid container>
            <Grid item xs={6}>
              {w.sets.map((_, i) => (
                <Typography key={i} variant="body2">{`Set ${i + 1}`}</Typography>
              ))}
            </Grid>
            <Grid item xs={4}>
              {w.sets.map((s, i) => (
                <Typography key={i} variant="body2">
                  {`${s.weight} lbs × ${s.reps}`}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "right" }}>
              {w.sets.map((s, i) => (
                <Typography key={i} variant="body2">{`RPE ${s.rpe}`}</Typography>
              ))}
            </Grid>
          </Grid>
        </Box>
      ))}

      {items.length > 2 && (
        <Box sx={{ textAlign: "center" }}>
          <Link
            component="button"
            type="button"
            underline="none"
            onClick={() => setExpanded((e) => !e)}
            sx={{ color: "success.main", fontWeight: 600 }}
          >
            {expanded ? "▲ Less" : "▼ More past workouts"}
          </Link>
        </Box>
      )}
    </Paper>
  );
}
