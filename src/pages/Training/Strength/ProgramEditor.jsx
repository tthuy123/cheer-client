import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Divider,
  Link,
  Chip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SelectedExercisesSection from "../../../components/Training/ProgramEditor/SelectedExercisesSection";
import ExerciseEditorCard from "../../../components/Training/ProgramEditor/ExerciseEditorCard";

import Program from "../../../api/modules/program.api.js";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

/** ===== Presets theo Training Type =====
 * General      -> 3 x 10 reps x RPE 7
 * Max Strength -> 3 x  8 reps x RPE 8
 * Hypertrophy  -> 3 x 12 reps x RPE 8
 * Power        -> 3 x  6 reps x RPE 6
 * Endurance    -> 3 x 20 reps x RPE 9
 */
const TRAINING_TYPES = [
  { value: "general", label: "General" },
  { value: "max_strength", label: "Max Strength" },
  { value: "hypertrophy", label: "Hypertrophy" },
  { value: "power", label: "Power" },
  { value: "endurance", label: "Endurance" },
];

const PRESETS = {
  general:      { sets: 3, reps: 10, rpe: 7 },
  max_strength: { sets: 3, reps: 8,  rpe: 8 },
  hypertrophy:  { sets: 3, reps: 12, rpe: 8 },
  power:        { sets: 3, reps: 6,  rpe: 6 },
  endurance:    { sets: 3, reps: 20, rpe: 9 },
};

// fallback demo nếu không có state mang sang
const DEFAULT_EXERCISES = [
  {
    id: "exA",
    name: "Resistance Band Seesaw Press",
    imageUrl: "/images/thumb.jpg",
    sets: [
      { id: "s1", weight: 10, reps: 5, rpe: 7 },
      { id: "s2", weight: 10, reps: 7, rpe: 7 },
      { id: "s3", weight: 10, reps: 7, rpe: 7 },
    ],
  },
];
const TT_LABELS = {
  general: "General",
  max_strength: "Max Strength",
  hypertrophy: "Hypertrophy",
  power: "Power",
  endurance: "Endurance",
};
const fmt = (d) => dayjs(d).format("YYYY-MM-DD HH:mm:ss");

const toNum = (v) => {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  const n = Number(String(v).replace(/[^\d.-]/g, "")); // 'ex_12' -> 12
  return Number.isNaN(n) ? undefined : n;
};

// Thay thế hàm cũ (khoảng dòng 80)
const buildExercisesPayload = (exs) =>
  exs.map((ex) => {
    // Lấy TẤT CẢ các set và chỉ giữ lại thông tin cần thiết
    // mà bạn muốn lưu làm 'kế hoạch'
    const setsPayload = Array.isArray(ex.sets)
      ? ex.sets.map(s => ({
          reps: Number(s.reps ?? 10),
          rpe: Number(s.rpe ?? 7),
          weight: Number(s.weight ?? 0),
          // Thêm bất kỳ trường nào khác từ 's' mà bạn muốn lưu
        }))
      : []; // Nếu không có set nào, gửi mảng rỗng
            
    return {
      exercise_id: toNum(ex.exercise_id ?? ex.id),
      type: ex.name ?? "Exercise",
      
      // Gửi TẤT CẢ các set dưới dạng MẢNG
      sets: setsPayload, // <--- THAY ĐỔI LỚN NHẤT
      
      status: 1,
    };
  });

function toEditorExercises(picked = [], trainingType = "general") {
  const preset = PRESETS[trainingType] ?? PRESETS.general;
  return picked.map((e, idx) => ({
    id: e.id ?? `ex_${Date.now()}_${idx}`,
    name: e.name ?? "Unnamed Exercise",
    imageUrl: e.imageUrl ?? "/images/thumb.jpg",
    sets: Array.from({ length: preset.sets }, (_, i) => ({
      id: `s_${Date.now()}_${idx}_${i}`,
      weight: 0,
      reps: preset.reps,
      rpe: preset.rpe,
    })),
  }));
}

export default function ProgramEditor() {
  const navigate = useNavigate();
  const { state } = useLocation(); // { programType, selectedExercises }
  const token = useSelector((s) => s.auth.token);
  const userId = useSelector((s) => s.auth.user_id);


  const [programName, setProgramName] = useState("");
  const [trainingType, setTrainingType] = useState("general");
  const [programScope, setProgramScope] = useState(state?.programType ?? "team"); // "team" | "my"
  const [exercises, setExercises] = useState(
    state?.selectedExercises?.length
      ? toEditorExercises(state.selectedExercises, "general")
      : DEFAULT_EXERCISES
  );

  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  // Prefill tên chương trình nếu có dữ liệu chuyển sang
  useEffect(() => {
    if (state?.selectedExercises?.length) {
      setProgramName(
        `Program ${new Date().toLocaleDateString()} (${state?.programType ?? "my"})`
      );
    }
  }, [state]);

  // ==== cập nhật set/reps/RPE khi đổi trainingType ====
  const applyPresetToExercises = (type) => {
    const preset = PRESETS[type] ?? PRESETS.general;

    setExercises((prev) =>
      prev.map((ex) => {
        const nextSets = Array.from({ length: preset.sets }, (_, i) => {
          const old = ex.sets?.[i];
          return {
            id: old?.id ?? `s_${ex.id}_${i}_${Date.now()}`,
            weight: old?.weight ?? 0, // giữ weight nếu có
            reps: preset.reps,
            rpe: preset.rpe,
          };
        });
        return { ...ex, sets: nextSets };
      })
    );
  };

  const handleChangeTrainingType = (newType) => {
    setTrainingType(newType);
    applyPresetToExercises(newType);
  };

  const prescriptionHint = useMemo(() => {
    const preset = PRESETS[trainingType];
    if (!preset) return "";
    return `${preset.sets} sets x ${preset.reps} reps x ${preset.rpe} RPE`;
  }, [trainingType]);

  const addExercise = () => {
    const preset = PRESETS[trainingType] ?? PRESETS.general;
    const ts = Date.now();
    const newEx = {
      id: `ex_${ts}`,
      name: "New Exercise",
      imageUrl: "/images/thumb.jpg",
      sets: Array.from({ length: preset.sets }, (_, i) => ({
        id: `s_${ts}_${i}`,
        weight: 0,
        reps: preset.reps,
        rpe: preset.rpe,
      })),
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

  // const handleSave = () => {
  //   console.log("Saving program:", {
  //     programName,
  //     trainingType,
  //     programScope,
  //     exercises,
  //   });
  // };
  const handleSave = async () => {
  try {
    setSaving(true);
    setErr("");
    setOk("");

    if (!userId) throw new Error("Missing userId.");
    // const started = new Date();
    // const finished = new Date(started.getTime() + 60 * 60 * 1000);

    const payload = {
      program: {
        name: (programName || "").trim() || "Untitled Program",
        type: programScope === "team" ? "team" : "my",           // 👈 đúng yêu cầu
        training_type: TT_LABELS[trainingType] || "General",     // nhãn hiển thị
      },
      exercises: buildExercisesPayload(exercises),
    };

    await Program.CreateProgram(userId, payload, token);
    setOk("Saved!");
    navigate("/training/strength/");
   // console.log("Program saved:", payload);
  } catch (e) {
    setErr(e?.response?.data?.message || e?.message || "Save failed");
  } finally {
    setSaving(false);
  }
};

  const handleBack = () => navigate(-1);

  return (
    <Box sx={{ width: "100%", px: 3, py: 2 }}>
      {/* Top bar */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Link
          component="button"
          underline="none"
          color="success.main"
          sx={{ mr: "auto", fontWeight: 600 }}
          onClick={handleBack}
        >
          &lt; Back
        </Link>

        <Typography sx={{ fontWeight: 700, color: "success.dark", textAlign: "center", flex: 1 }}>
          Program Editor
        </Typography>

        <Box sx={{ width: 140, display: "flex", justifyContent: "flex-end" }}>
          <Chip
            size="small"
            label={programScope === "team" ? "Team Programs" : "My Programs"}
            color="success"
            variant="outlined"
          />
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: 3,
          textAlign: "left",
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
          inputProps={{ style: { textAlign: "left" } }}
        />

        {/* Training Type */}
        <Typography variant="subtitle1" sx={{ mb: 0.5, display: "flex", alignItems: "center", gap: 0.75 }}>
          Training Type
          {/* icon hint nhỏ nếu bạn muốn thêm */}
          {/* <Tooltip title="Changing this updates sets/reps/RPE for all exercises."><InfoOutlined fontSize="inherit" /></Tooltip> */}
        </Typography>
        <TextField
          select
          fullWidth
          size="small"
          value={trainingType}
          onChange={(e) => handleChangeTrainingType(e.target.value)}
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
          {/* <Box sx={{ ml: "auto" }}>
            <Link
              component="button"
              type="button"
              onClick={addExercise}
              underline="none"
              sx={{ color: "success.main", fontWeight: 600 }}
            >
              + Add Exercise
            </Link>
          </Box> */}
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
            {err && (
      <Typography color="error" sx={{ mt: 1 }}>
        {String(err)}
      </Typography>
    )}
    {ok && (
      <Typography color="success.main" sx={{ mt: 1 }}>
        {ok}
      </Typography>
    )}

      </Paper>
    </Box>
  );
}
