import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
  Link,
} from "@mui/material";
import SelectedExercisesSection from "../../../components/Training/ProgramEditor/SelectedExercisesSection";
import ExerciseEditorCard from "../../../components/Training/ProgramEditor/ExerciseEditorCard";

const TRAINING_TYPES = [
  { value: "general", label: "General" },
  { value: "strength", label: "Strength" },
  { value: "hypertrophy", label: "Hypertrophy" },
  { value: "endurance", label: "Endurance" },
];

const DEFAULT_EXERCISES = [
  {
    id: "exA",
    name: "Resistance Band Seesaw Press",
    imageUrl: "/images/thumb.jpg",
    sets: [
      { id: "s1", weight: 10, reps: 5, rpe: 7 },
      { id: "s2", weight: 10, reps: 7, rpe: 7 },
      { id: "s3", weight: 10, reps: 7, rpe: 7 },
      { id: "s4", weight: 10, reps: 7, rpe: 7 },
    ],
  },
];

export default function ProgramEditor() {
  const [programName, setProgramName] = useState("");
  const [trainingType, setTrainingType] = useState("general");
  const [exercises, setExercises] = useState(DEFAULT_EXERCISES);

  const prescriptionHint = useMemo(() => {
    if (!exercises.length || !exercises[0].sets.length) return "";
    const setsCount = exercises[0].sets.length;
    const reps = exercises[0].sets[0].reps ?? "";
    const rpe = exercises[0].sets[0].rpe ?? "";
    return `${setsCount} sets × ${reps} reps × ${rpe} RPE`;
  }, [exercises]);

  const addExercise = () => {
    const newEx = {
      id: `ex_${Date.now()}`,
      name: "New Exercise",
      imageUrl: "/images/thumb.jpg",
      sets: [{ id: `s_${Date.now()}`, weight: 0, reps: 8, rpe: 6 }],
    };
    setExercises((prev) => [...prev, newEx]);
  };

  const updateExercise = (id, updater) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? updater(ex) : ex))
    );
  };

  const removeExercise = (id) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const handleSave = () => {
    console.log("Saving program:", { programName, trainingType, exercises });
  };

  return (
    <Box sx={{ width: "100%", px: 3, py: 2 }}>
      {/* Top bar: tất cả căn trái */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    <Link underline="none" color="success.main" sx={{ mr: "auto", fontWeight: 600 }} href="#">
     &lt; Back
    </Link>
    <Typography sx={{ fontWeight: 700, color: "success.dark", textAlign: "center", flex: 1 }}>
      Program Editor
    </Typography>
    <Box sx={{ width: 64 }} /> {/* spacer */}
  </Box>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: 3,
          textAlign: "left", // đảm bảo không thừa kế center từ đâu đó
        }}
      >
        {/* Program Name */}
        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
          Program Name
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Enter program name"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
          sx={{ mb: 2 }}
          inputProps={{ style: { textAlign: "left" } }} // phòng khi theme nào đó ép center
        />

        {/* Training Type */}
        <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
          Training Type
        </Typography>
        <TextField
          select
          fullWidth
          size="small"
          value={trainingType}
          onChange={(e) => setTrainingType(e.target.value)}
          sx={{ mb: 0.5 }}
        >
          {TRAINING_TYPES.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Prescription hint */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {prescriptionHint}
        </Typography>

        {/* Header row */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography sx={{ fontWeight: 700, color: "success.dark" }}>
            Selected Exercises
          </Typography>
          <Box sx={{ ml: "auto" }}>
            <Link
              component="button"
              type="button"
              onClick={addExercise}
              underline="none"
              sx={{ color: "success.main", fontWeight: 600 }}
            >
              + Add Exercise
            </Link>
          </Box>
        </Box>

        {/* Selected exercises */}
        <SelectedExercisesSection>
          {exercises.map((ex) => (
            <ExerciseEditorCard
              key={ex.id}
              exercise={ex}
              onRemove={() => removeExercise(ex.id)}
              onChange={(patch) =>
                updateExercise(ex.id, (old) => ({ ...old, ...patch }))
              }
              onChangeSets={(newSets) =>
                updateExercise(ex.id, (old) => ({ ...old, sets: newSets }))
              }
            />
          ))}
        </SelectedExercisesSection>

        <Divider sx={{ my: 2 }} />

        {/* Save */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSave}
          sx={{
            textTransform: "none",
            bgcolor: "success.light",
            color: "#fff",
            "&:hover": { bgcolor: "success.main" },
          }}
        >
          Save Program
        </Button>
      </Paper>
    </Box>
  );
}
