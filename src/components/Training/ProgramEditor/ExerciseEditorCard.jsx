import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Paper,
  Link,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SetRow from "./SetRow";

export default function ExerciseEditorCard({
  exercise,
  onRemove,
  onChange,
  onChangeSets,
}) {
  const { name, imageUrl, sets } = exercise;

  const addSet = () => {
    const newSet = {
      id: `s_${Date.now()}`,
      weight: 0,
      reps: 8,
      rpe: 6,
    };
    onChangeSets([...(sets || []), newSet]);
  };

  const removeSet = (id) => {
    onChangeSets((sets || []).filter((s) => s.id !== id));
  };

  const updateSet = (id, patch) => {
    onChangeSets(
      (sets || []).map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        mb: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1.25,
          bgcolor: "grey.50",
        }}
      >
        <Avatar
          variant="rounded"
          src={imageUrl}
          alt={name}
          sx={{ width: 36, height: 36, borderRadius: 1, bgcolor: "grey.200" }}
        />
        <Typography sx={{ fontWeight: 700, flex: 1 }}>{name}</Typography>
        <IconButton
          onClick={onRemove}
          size="small"
          sx={{ color: "error.main" }}
          aria-label="remove exercise"
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Box>

      {/* Body: list of sets */}
      <Box sx={{ px: 2, py: 1 }}>
        {(sets || []).map((set, idx) => (
          <SetRow
            key={set.id}
            index={idx}
            data={set}
            onChange={(patch) => updateSet(set.id, patch)}
            onRemove={() => removeSet(set.id)}
          />
        ))}

        {/* Add set */}
        <Box sx={{ textAlign: "center", py: 1 }}>
          <Link
            component="button"
            type="button"
            underline="none"
            onClick={addSet}
            sx={{ color: "success.main", fontWeight: 600 }}
          >
            + Add Set
          </Link>
        </Box>
      </Box>
    </Paper>
  );
}
