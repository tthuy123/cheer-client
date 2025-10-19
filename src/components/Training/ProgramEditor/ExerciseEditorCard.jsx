import React from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Link,
  Avatar,
  Divider,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ExerciseEditorCard({
  exercise,
  onRemove,
  onChange,
  onChangeSets,
}) {
  const handleSetChange = (idx, patch) => {
    const next = exercise.sets.map((s, i) => (i === idx ? { ...s, ...patch } : s));
    onChangeSets(next);
  };

  const addSet = () => {
    const id = `s_${exercise.id}_${Date.now()}`;
    const reps = exercise.sets?.[0]?.reps ?? 8;
    const rpe  = exercise.sets?.[0]?.rpe  ?? 6;
    const next = [...(exercise.sets || []), { id, reps, rpe }];
    onChangeSets(next);
  };

  const removeSet = (idx) => {
    const next = exercise.sets.filter((_, i) => i !== idx);
    onChangeSets(next);
  };

  // Grid mới: Set | RepsInput(1fr) | RepsLbl(56) | RPEInput(1fr) | RPELbl(56) | Remove(28)
  const cols = "84px minmax(180px,1fr) 56px minmax(180px,1fr) 56px 28px";

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 2,
        mb: 1.5,
        bgcolor: "background.paper",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.25, gap: 1 }}>
        <Avatar
          variant="rounded"
          src={exercise.imageUrl}
          alt={exercise.name}
          sx={{ width: 40, height: 40 }}
        />
        <Typography sx={{ fontWeight: 700, flex: 1, lineHeight: 1.2 }}>
          {exercise.name}
        </Typography>
        <IconButton size="small" color="error" onClick={onRemove}>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 1.25 }} />

      {(exercise.sets || []).map((set, idx) => (
        <Box
          key={set.id}
          sx={{
            display: "grid",
            gridTemplateColumns: cols,
            alignItems: "center",
            gap: 12 / 8, // 1.5 spacing
            mb: 1,
            "@media (max-width: 900px)": {
              // Vẫn dài ra nhưng giữ tối thiểu 140px cho input
              gridTemplateColumns:
                "84px minmax(140px,1fr) 48px minmax(140px,1fr) 48px 28px",
            },
          }}
        >
          {/* Set label */}
          <Typography color="text.secondary">{`Set ${idx + 1}`}</Typography>

          {/* Reps input (KÉO DÀI) */}
          <TextField
            fullWidth
            type="number"
            size="small"
            value={set.reps ?? 0}
            onChange={(e) => handleSetChange(idx, { reps: Number(e.target.value) })}
            inputProps={{ min: 0 }}
            sx={{ "& input": { textAlign: "center" } }}
          />
          <Typography color="text.secondary" sx={{ textAlign: "right" }}>
            Reps
          </Typography>

          {/* RPE input (KÉO DÀI) */}
          <TextField
            fullWidth
            type="number"
            size="small"
            value={set.rpe ?? 0}
            onChange={(e) => handleSetChange(idx, { rpe: Number(e.target.value) })}
            inputProps={{ min: 0, max: 10, step: 1 }}
            sx={{ "& input": { textAlign: "center" } }}
          />
          <Typography color="text.secondary" sx={{ textAlign: "right" }}>
            RPE
          </Typography>

          {/* Remove set */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Link
              component="button"
              underline="none"
              color="error.main"
              onClick={() => removeSet(idx)}
              sx={{ fontSize: 22, lineHeight: 1 }}
              aria-label={`Remove set ${idx + 1}`}
              title="Remove set"
            >
              —
            </Link>
          </Box>
        </Box>
      ))}

      <Box sx={{ textAlign: "center", mt: 0.5 }}>
        <Link component="button" underline="none" color="success.main" onClick={addSet}>
          + Add Set
        </Link>
      </Box>
    </Box>
  );
}
