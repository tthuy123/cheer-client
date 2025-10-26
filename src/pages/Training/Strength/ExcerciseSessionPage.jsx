// ExerciseSessionPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Box, Paper, Divider, Button, CircularProgress, Alert, Tooltip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import ExerciseHero from "../../../components/Training/ExerciseSession/ExerciseHero";
import InstructionsCard from "../../../components/Training/ExerciseSession/InstructionsCard";
import SetsEditor from "../../../components/Training/ExerciseSession/SetsEditor";
import TimeBar from "../../../components/Training/ExerciseSession/TimeBar";
import NotesField from "../../../components/Training/ExerciseSession/NotesField";
import PastWorkouts from "../../../components/Training/ExerciseSession/PastWorkouts";
import { useSelector } from "react-redux";
import Program from "../../../api/modules/program.api.js";

// helpers
function parseMaybeJson(value, fallback) {
  if (value == null) return fallback;
  if (typeof value === "string") {
    try { return JSON.parse(value); } catch { return fallback; }
  }
  return value;
}
function splitCues(cues) {
  if (!cues) return [];
  const parts = String(cues)
    .split(/\d+\.\s*|[,;]\s*|\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts : [String(cues)];
}
function buildSetsArray(setsObj) {
  const count = Number(setsObj?.sets ?? 0);
  const reps = Number(setsObj?.reps ?? 10);
  const weight = Number(setsObj?.weight ?? 0);
  return Array.from({ length: count }, (_, i) => ({
    id: `s${i + 1}`, weight, reps, rpe: 7, done: false,
  }));
}

export default function ExerciseSessionPage() {
  const userId = useSelector((s) => s.auth.user_id);
  const token  = useSelector((s) => s.auth.token);
  const { programId, programExerciseId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [program, setProgram] = useState(null);
  const [exercise, setExercise] = useState(null);
  const [sets, setSets] = useState([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await Program.GetProgramDetailsById(userId, programId, token);
        const data = res?.program || res?.data?.program || res;
        if (!mounted) return;
        setProgram(data);

        const list = Array.isArray(data?.exercises) ? data.exercises : [];
        if (!list.length) { setExercise(null); setSets([]); return; }

        const chosen =
          programExerciseId
            ? list.find((x) => String(x.program_exercise_id) === String(programExerciseId)) || list[0]
            : list[0];

        const normalized = {
          ...chosen,
          _setsArray: buildSetsArray(chosen.sets),
          _cuesArray: splitCues(chosen?.exercise_meta?.cues),
          _pastArray: parseMaybeJson(chosen?.past_workouts, []),
        };
        setExercise(normalized);
        setSets(normalized._setsArray);
      } catch (e) {
        console.error(e);
        if (!mounted) return;
        setErr("Không tải được chi tiết chương trình. Vui lòng thử lại.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [userId, programId, programExerciseId, token]);

  // vị trí hiện tại + prev/next
  const exercisesList = program?.exercises ?? [];
  const currentIdx = exercise
    ? exercisesList.findIndex((x) => String(x.program_exercise_id) === String(exercise.program_exercise_id))
    : -1;
  const isFirst = currentIdx <= 0;
  const isLast = currentIdx > -1 && currentIdx === exercisesList.length - 1;

  const prevExercise = !isFirst && currentIdx > 0 ? exercisesList[currentIdx - 1] : null;
  const nextExercise = !isLast && currentIdx > -1 ? exercisesList[currentIdx + 1] : null;

  const prevName = prevExercise?.name ?? "—";
  const nextName = isLast ? "Complete Program" : nextExercise?.name ?? "—";

  // prescription
  const prescription = useMemo(() => {
    const count = sets.length || 0;
    const reps = sets[0]?.reps ?? "";
    const rpe = sets[0]?.rpe ?? "";
    return `${count} sets × ${reps} reps × ${rpe} RPE`;
  }, [sets]);

  // chỉ các set đã hoàn thành
  const completedSets = useMemo(
    () => sets.filter((s) => s.done),
    [sets]
  );
  const hasAnyCompleted = completedSets.length > 0;

  // handlers
  const addSet = () => setSets((p) => [...p, { id: `s_${Date.now()}`, weight: 0, reps: 10, rpe: 7, done: false }]);
  const removeSet = (id) => setSets((p) => p.filter((s) => s.id !== id));
  const updateSet = (id, patch) => setSets((p) => p.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const goToExercise = (peId) => navigate(`/programs/${programId}/exercises/${peId}`);

  const handlePrev = () => {
    if (isFirst || !prevExercise) return;
    goToExercise(prevExercise.program_exercise_id);
  };

  const completeProgram = () => {
    navigate("/training/strength"); // tuỳ UX
  };

  const handleStartWorkout = () => {};

  // chỉ gửi các set đã hoàn thành; nếu không có set hoàn thành → không gửi
  const handleSaveWorkout = async () => {
    if (!exercise) return;
    if (!hasAnyCompleted) return; // không gửi nếu chưa hoàn thành set nào

    const payload = {
      note: notes,
      sets: completedSets.map(({ weight, reps, rpe, done }) => ({ weight, reps, rpe, done: Boolean(done) })),
      exercise_id: exercise.exercise_id, // optional
    };
    try {
      const result = await Program.SaveWorkout(
        userId,
        programId,
        exercise.program_exercise_id,
        payload,
        token
      );
      console.log("Saved workout:", result.workout);
    } catch (e) {
      console.error("Save workout failed:", e);
    }
  };

  const handleNext = async () => {
    // luôn thử lưu (chỉ gửi khi có set hoàn thành)
    await handleSaveWorkout();

    if (isLast) {
      if (!hasAnyCompleted) return; // chặn Complete nếu chưa có set nào done
      return completeProgram();
    }
    if (nextExercise) goToExercise(nextExercise.program_exercise_id);
  };

  // render
  if (loading) {
    return (
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <CircularProgress size={24} /> Đang tải bài tập...
      </Box>
    );
  }
  if (err) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{err}</Alert>
      </Box>
    );
  }
  if (!exercise) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">Chương trình chưa có bài tập nào.</Alert>
      </Box>
    );
  }

  const title = exercise?.name || "Exercise";
  const videoUrl = exercise?.exercise_meta?.video_url || "";
  const cues = exercise?._cuesArray ?? [];
  const instructions = exercise?.exercise_meta?.description || "Follow the prescribed sets and reps with control.";

  const past = Array.isArray(exercise?._pastArray)
    ? exercise._pastArray.map((item) => ({
        date: (item.created_at || "").slice(0, 10),
        sets: Array.isArray(item.sets)
          ? item.sets.map((s) => ({
              weight: Number(s.weight ?? 0),
              reps: Number(s.reps ?? s?.r ?? 0),
              rpe: Number(s.rpe ?? 0),
            }))
          : [],
      }))
    : [];

  // trạng thái nút Next/Complete
  const nextDisabled = isLast && !hasAnyCompleted;

  return (
    <Box sx={{ width: "100%", px: 3, py: 2 }}>
      <ExerciseHero
        title={title}
        videoUrl={videoUrl}
        prevName={isFirst ? "—" : prevName}
        nextName={nextName}
        onPrev={handlePrev}
        onNext={handleNext}
        subtitle={prescription}
      />

      <Box sx={{ my: 2 }}>
        <InstructionsCard instructions={instructions} cues={cues} nextName={nextName} />
      </Box>

      <Paper
        elevation={0}
        sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 2, mb: 2, bgcolor: "background.paper" }}
      >
        <SetsEditor title={title} sets={sets} onChange={updateSet} onRemove={removeSet} />
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button variant="contained" onClick={handleStartWorkout} sx={{ textTransform: "none" }}>
            Start
          </Button>
          <Box sx={{ ml: "auto" }}>
            <TimeBar />
          </Box>
        </Box>
        <Box sx={{ textAlign: "center", py: 1 }}>
          <Button
            variant="text"
            onClick={addSet}
            sx={{ color: "success.main", fontWeight: 600, textTransform: "none" }}
          >
            + Add Set
          </Button>
        </Box>
      </Paper>

      <NotesField value={notes} onChange={setNotes} />

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, my: 2 }}>
        <Button
          variant="contained"
          onClick={handlePrev}
          disabled={isFirst}
          sx={{
            textTransform: "none",
            bgcolor: isFirst ? "grey.400" : "success.light",
            color: "white",
            "&:hover": { bgcolor: isFirst ? "grey.400" : "success.main" },
          }}
        >
          Previous Exercise
        </Button>

        <Tooltip
          title={nextDisabled ? "Cần hoàn thành ít nhất 1 set để hoàn tất chương trình" : ""}
          disableHoverListener={!nextDisabled}
        >
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={nextDisabled}
              sx={{
                textTransform: "none",
                bgcolor: isLast ? "primary.main" : "success.dark",
                color: "white",
                "&:hover": { bgcolor: isLast ? "primary.dark" : "success.main" },
              }}
            >
              {isLast ? "Complete Program" : "Next Exercise"}
            </Button>
        </Tooltip>
      </Box>

      <PastWorkouts items={past} />
    </Box>
  );
}
