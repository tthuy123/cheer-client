// ExerciseSessionPage.jsx
import React, { useMemo, useState } from "react";
import { Box, Paper, Divider, Button } from "@mui/material";
import ExerciseHero from "../../../components/Training/ExerciseSession/ExerciseHero";
import InstructionsCard from "../../../components/Training/ExerciseSession/InstructionsCard";
import SetsEditor from "../../../components/Training/ExerciseSession/SetsEditor";
import TimeBar from "../../../components/Training/ExerciseSession/TimeBar";
import NotesField from "../../../components/Training/ExerciseSession/NotesField";
import PastWorkouts from "../../../components/Training/ExerciseSession/PastWorkouts";

// mock dữ liệu 1 exercise (bạn thay bằng dữ liệu thật từ API/router)
const EXERCISE = {
  id: "ex_464",
  name: "Resistance Band Seesaw Press",
  videoUrl: "/videos/rb-seesaw.mp4", // hoặc link youtube/hls
  instructions:
    "Grasp resistance bands and extend arms to shoulder width. Alternately press one arm up while lowering the other in a seesaw motion. Maintain steady rhythm and control.",
  cues: ["Keep core engaged", "Maintain shoulder alignment", "Control the motion"],
  nextName: "Resistance Band Diagonal Walks",
  prevName: "—", // nếu có bài trước thì điền tên
  // set mặc định
  sets: [
    { id: "s1", weight: 0, reps: 10, rpe: 5, done: false },
    { id: "s2", weight: 0, reps: 10, rpe: 7, done: false },
    { id: "s3", weight: 0, reps: 10, rpe: 7, done: false },
    { id: "s4", weight: 0, reps: 10, rpe: 7, done: false },
  ],
};

const PAST = [
  {
    date: "10-12-2025",
    sets: [
      { weight: 0, reps: 10, rpe: 5 },
      { weight: 0, reps: 10, rpe: 7 },
      { weight: 0, reps: 10, rpe: 7 },
      { weight: 0, reps: 10, rpe: 7 },
    ],
  },
  {
    date: "09-15-2025",
    sets: [
      { weight: 11.2, reps: 10, rpe: 5 },
      { weight: 13, reps: 10, rpe: 7 },
      { weight: 30, reps: 10, rpe: 7 },
    ],
  },
];

export default function ExerciseSessionPage() {
  const [sets, setSets] = useState(EXERCISE.sets);
  const [notes, setNotes] = useState("");
  const prescription = useMemo(() => {
    const count = sets.length || 0;
    const reps = sets[0]?.reps ?? "";
    const rpe = sets[0]?.rpe ?? "";
    return `${count} sets × ${reps} reps × ${rpe} RPE`;
  }, [sets]);

  const addSet = () => {
    setSets((prev) => [
      ...prev,
      { id: `s_${Date.now()}`, weight: 0, reps: 10, rpe: 7, done: false },
    ]);
  };

  const removeSet = (id) => setSets((prev) => prev.filter((s) => s.id !== id));

  const updateSet = (id, patch) =>
    setSets((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const handlePrev = () => {
    // TODO: navigate to previous exercise
  };
  const handleNext = () => {
    // TODO: navigate to next exercise
  };

  const handleStartWorkout = () => {
    // tùy bạn: mark bắt đầu, log thời gian,...
  };

  const handleSaveWorkout = () => {
    // TODO: call API lưu workout (sets + notes + completed flags)
    console.log({ sets, notes });
  };

  return (
    <Box sx={{ width: "100%", px: 3, py: 2 }}>
      <ExerciseHero
        title={EXERCISE.name}
        videoUrl={EXERCISE.videoUrl}
        prevName={EXERCISE.prevName}
        nextName={EXERCISE.nextName}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <Box sx={{ my: 2 }}>
        <InstructionsCard
          instructions={EXERCISE.instructions}
          cues={EXERCISE.cues}
          nextName={EXERCISE.nextName}
        />
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: 2,
          mb: 2,
          bgcolor: "background.paper",
        }}
      >
        <SetsEditor
          title={EXERCISE.name}
          sets={sets}
          onChange={updateSet}
          onRemove={removeSet}
        />

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            color="white"
            onClick={handleStartWorkout}
            sx={{ textTransform: "none" }}
            backgroundColor='black'
          >
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

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          my: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={handlePrev}
          sx={{
            textTransform: "none",
            bgcolor: "success.light",
            color: "white",
            "&:hover": { bgcolor: "success.main" },
          }}
        >
          Previous Exercise
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{
            textTransform: "none",
            bgcolor: "success.dark",
            color: "white",
            "&:hover": { bgcolor: "success.main" },
          }}
        >
          Next Exercise
        </Button>
      </Box>

      <PastWorkouts items={PAST} />

      {/* Save toàn bộ session (nếu bạn muốn nút riêng) */}
      {/* <Box sx={{ mt: 2, textAlign: "right" }}>
        <Button onClick={handleSaveWorkout} variant="contained">Save</Button>
      </Box> */}
    </Box>
  );
}
