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
// Thay thế hàm cũ (khoảng dòng 40 trong ExerciseSessionPage.jsx)
function buildSetsArray(setsObj) {
  // MỚI: Kiểm tra xem 'setsObj' có phải là một MẢNG không
  // (Đây là định dạng mới bạn muốn lưu)
  if (Array.isArray(setsObj)) {
    // Nếu là mảng, chỉ cần map và thêm 'id' + 'done'
    return setsObj.map((s, i) => ({
      id: `s${i + 1}`,
      weight: Number(s.weight ?? 0),
      reps: Number(s.reps ?? 10),
      rpe: Number(s.rpe ?? 7),
      done: false, // Luôn bắt đầu là 'chưa xong'
    }));
  }

  // CŨ: Nếu 'setsObj' không phải mảng, nó là 'tóm tắt'
  // (Chúng ta giữ lại logic này để các bài tập cũ vẫn hoạt động)
  const count = Number(setsObj?.sets ?? 0);
  const reps = Number(setsObj?.reps ?? 10);
  const weight = Number(setsObj?.weight ?? 0);
  const rpe = Number(setsObj?.rpe ?? 7); // Đọc rpe từ tóm tắt (đã sửa ở lần trước)
  
  return Array.from({ length: count }, (_, i) => ({
    id: `s${i + 1}`, weight, reps, rpe, done: false,
  }));
}

// --- Helpers cho Lưu trữ tạm (Session Storage) ---
const STORAGE_KEY = (pId) => `inProgressWorkout_${pId}`;

function getWorkoutStorage(programId) {
  return parseMaybeJson(sessionStorage.getItem(STORAGE_KEY(programId)), {});
}

function setWorkoutStorage(programId, programExerciseId, data) {
  const allData = getWorkoutStorage(programId);
  allData[programExerciseId] = data;
  sessionStorage.setItem(STORAGE_KEY(programId), JSON.stringify(allData));
}

function clearWorkoutStorage(programId) {
  sessionStorage.removeItem(STORAGE_KEY(programId));
}
// ------------------------------------------------

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

        const isStartingFresh = !programExerciseId;
        if (isStartingFresh) {
          clearWorkoutStorage(programId);
        }

        const list = Array.isArray(data?.exercises) ? data.exercises : [];
        if (!list.length) { setExercise(null); setSets([]); return; }
        // --- BẮT ĐẦU THÊM DEBUG ---
        console.log("--- DEBUG: Toàn bộ danh sách (list) ---");
        console.log(list);
        // --- KẾT THÚC THÊM DEBUG ---

        const chosen =
          programExerciseId
            ? list.find((x) => String(x.program_exercise_id) === String(programExerciseId)) || list[0]
            : list[0];
// --- BẮT ĐẦU THÊM DEBUG ---
        console.log("--- DEBUG: Bài tập được chọn (chosen) ---");
        console.log(chosen);
        // --- KẾT THÚC THÊM DEBUG ---
        const normalized = {
          ...chosen,
          _setsArray: buildSetsArray(chosen.sets), // Vẫn build mảng gốc
          _cuesArray: splitCues(chosen?.exercise_meta?.cues),
          _pastArray: parseMaybeJson(chosen?.past_workouts, []),
        };

        // 2. Lấy dữ liệu đã lưu tạm (nếu có)
        const storedData = getWorkoutStorage(programId)?.[normalized.program_exercise_id];
        
        setExercise(normalized);

        // 3. Ưu tiên dùng dữ liệu lưu tạm
        if (storedData) {
          setSets(storedData.sets);
          setNotes(storedData.notes);
        } else {
          // Nếu không, dùng dữ liệu mặc định
          setSets(normalized._setsArray);
          setNotes(""); // Reset ghi chú
        }
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

  // Tự động LƯU TẠM vào sessionStorage khi 'sets' hoặc 'notes' thay đổi
  useEffect(() => {
    // Đừng lưu nếu đang tải hoặc chưa có bài tập
    if (loading || !exercise) return;

    setWorkoutStorage(programId, exercise.program_exercise_id, { 
      sets, 
      notes, 
      exercise_id: exercise.exercise_id // Quan trọng: lưu cả exercise_id
    });
  }, [sets, notes, programId, exercise, loading]);


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

  // Kiểm tra xem CÓ BẤT KỲ set 'done' nào TRONG TOÀN BỘ CHƯƠNG TRÌNH không
  const hasAnyCompletedInProgram = useMemo(() => {
    if (!programId) return false;
    const allData = getWorkoutStorage(programId);
    for (const data of Object.values(allData)) {
      if (Array.isArray(data.sets) && data.sets.some(s => s.done)) {
        return true; // Tìm thấy ít nhất 1 set 'done'
      }
    }
    return false;
    // 'sets' được thêm vào dependency array để trigger tính toán lại
    // khi user check 'done' ở bài tập cuối cùng.
  }, [programId, sets]); 

  // handlers
  const addSet = () => setSets((p) => [...p, { id: `s_${Date.now()}`, weight: 0, reps: 10, rpe: 7, done: false }]);
  const removeSet = (id) => setSets((p) => p.filter((s) => s.id !== id));
  const updateSet = (id, patch) => setSets((p) => p.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const goToExercise = (peId) => navigate(`/programs/${programId}/exercises/${peId}`);

  const handlePrev = () => {
    if (isFirst) {
    // Nếu là bài tập đầu tiên, điều hướng về trang chi tiết chương trình
    navigate(`/training/strength`);
    return;
  }
    if (prevExercise) {
    goToExercise(prevExercise.program_exercise_id);
  }
  };

  const completeProgram = () => {
    navigate("/training/strength"); // tuỳ UX
  };

  // const handleStartWorkout = () => {}; // (đã comment)

  // (Hàm handleSaveWorkout cũ đã bị xóa)

  const handleNext = async () => {
    setLoading(true); // Bật loading cho cả Next và Complete

    if (isLast) {
      // --- ĐÂY LÀ BÀI TẬP CUỐI CÙNG (Nút "Complete Program") ---
      
      // Kiểm tra lần cuối (mặc dù nút đã bị disable)
      if (!hasAnyCompletedInProgram) {
        setLoading(false);
        return;
      }
      
      try {
        // 1. Lấy TẤT CẢ dữ liệu đã lưu tạm
        const allStoredData = getWorkoutStorage(programId);

        // 2. Chuẩn bị các promise để gửi API
        const savePromises = [];

        for (const [peId, data] of Object.entries(allStoredData)) {
          // Lọc ra các set đã 'done' của mỗi bài
          const completedSets = Array.isArray(data.sets) ? data.sets.filter(s => s.done) : [];
          
          // Chỉ gửi API nếu bài tập đó có set 'done'
          if (completedSets.length > 0) {
            const payload = {
              note: data.notes,
              sets: completedSets.map(({ weight, reps, rpe, done }) => ({ weight, reps, rpe, done: Boolean(done) })),
              exercise_id: data.exercise_id, // Lấy từ storage
            };
            
            // Thêm promise vào mảng
            savePromises.push(
              Program.SaveWorkout(userId, programId, peId, payload, token)
            );
          }
        }

        // 3. Gửi tất cả API song song
        if (savePromises.length > 0) {
          await Promise.all(savePromises);
          console.log(`Đã lưu thành công ${savePromises.length} bài tập.`);
        }

        // 4. Xóa storage tạm
        clearWorkoutStorage(programId);
        
        // 5. Hoàn tất chương trình
        setLoading(false);
        return completeProgram();

      } catch (err) {
        console.error("Lỗi khi lưu hàng loạt:", err);
        setErr("Đã xảy ra lỗi khi lưu chương trình. Vui lòng thử lại."); // Báo lỗi
        setLoading(false);
      }

    } else {
      // --- ĐÂY LÀ CÁC BÀI TẬP GIỮA (Nút "Next Exercise") ---
      
      // Chỉ điều hướng, KHÔNG lưu (dữ liệu đã tự lưu vào sessionStorage)
      if (nextExercise) {
        setLoading(false); // Tắt loading
        goToExercise(nextExercise.program_exercise_id);
      }
    }
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
        id: item.training_data_id || item.created_at,
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

  // trạng thái nút Next/Complete (Đã cập nhật)
  const nextDisabled = isLast && !hasAnyCompletedInProgram;
// --- THÊM DEBUG CUỐI CÙNG ---
  console.log("--- DEBUG: Dữ liệu 'past' cuối cùng (trước khi render) ---");
  console.log(past);
  // --- KẾT THÚC DEBUG ---
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
          {/* <Button variant="contained" onClick={handleStartWorkout} sx={{ textTransform: "none" }}>
            Start
          </Button> */}
          {/* <Box sx={{ ml: "auto" }}>
            <TimeBar />
          </Box> */}
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