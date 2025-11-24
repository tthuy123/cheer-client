// src/pages/TrainingProgramsPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/Training/SearchBar";
import ProgramList from "../../../components/Training/ProgramList";
import Program from "../../../api/modules/program.api";
import CreateCard from "../../../components/Training/CreateCard";

const TrainingProgramsPage = ({ filterType = "all", showCreate = false }) => {
  const userId = useSelector((s) => s.auth.user_id);
  const token  = useSelector((s) => s.auth.token);

  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [allPrograms, setAllPrograms] = useState([]);
  const [visiblePrograms, setVisiblePrograms] = useState([]);

  const tRef = useRef();
  const debounceMs = 350;
  const navigate = useNavigate();

  const applyClientFilter = (items) => {
    if (filterType === "all") return items;
    return items.filter(
      (p) => (p.type || "").toLowerCase() === (filterType === "my" ? "my" : "team")
    );
  };

  // 1) load list base theo filterType
  useEffect(() => {
    if (!userId) return;
    (async () => {
      setLoading(true);
      try {
        const res = await Program.ListAllProgramsOfUser(userId, token, filterType);
        if (Array.isArray(res.programs)) {
          const items = applyClientFilter(res.programs);
          setAllPrograms(items);
          setVisiblePrograms(items);
          setError("");
        } else {
          setAllPrograms([]);
          setVisiblePrograms([]);
          setError(res?.error || "Failed to fetch programs");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, token, filterType]);

  // 2) search (debounce). Nếu q rỗng → hiển thị lại allPrograms
  useEffect(() => {
    if (!userId) return;
    const term = q.trim();

    if (term === "") {
      setVisiblePrograms(allPrograms);
      return;
    }
    if (term.length < 2) return;

    clearTimeout(tRef.current);
    tRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await Program.SearchProgramsByNameForUser(userId, term, token, filterType);
        if (Array.isArray(res.items)) {
          const items = applyClientFilter(res.items);
          setVisiblePrograms(items);
          setError("");
        } else {
          setVisiblePrograms([]);
          setError(res?.data?.error || "No results");
        }
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(tRef.current);
  }, [q, userId, token, filterType, allPrograms]);

  // 3) Khi bấm Start: vào exercise đầu tiên
  const handleStartProgram = async (program) => {
    try {
      // Nếu list đã có sẵn first_exercise_id thì dùng luôn (tùy bạn có cột này không)
      if (program.first_exercise_id) {
        return navigate(
          `/programs/${program.program_id}/exercises/${program.first_exercise_id}`
        );
      }

      // Không có -> gọi chi tiết program để lấy exercises[0]
      const res = await Program.GetProgramDetailsById(userId, program.program_id, token);
      console.log("Program details:", res);
      const data = res?.program || res?.data?.program || res;
      const first = Array.isArray(data?.exercises) ? data.exercises[0] : null;
      console.log("First exercise:", first);

      if (first?.program_exercise_id) {
        navigate(
          `/programs/${program.program_id}/exercises/${first.program_exercise_id}`
        );
      } else {
        // fallback: nếu không có bài tập, vào trang program (bạn có thể hiển thị message ở trang đó)
        navigate(`/programs/${program.program_id}`);
      }
    } catch (e) {
      console.error("Start program failed:", e);
      setError("Không mở được chương trình. Vui lòng thử lại.");
    }
  };
const handleDeleteProgram = async (programId) => {
  if (!window.confirm("Bạn có chắc chắn muốn xóa chương trình này? Hành động này không thể hoàn tác.")) {
    return;
  }
  
  setLoading(true);
  try {
    // Gọi API xóa
    const res = await Program.DeleteProgram(userId, programId, token);
    console.log('res xóa', res);
    if (res) {
      const updatedPrograms = allPrograms.filter(p => p.program_id !== programId);
      setAllPrograms(updatedPrograms);
      setVisiblePrograms(updatedPrograms);
    } else {
      setError(res?.error || "Không thể xóa chương trình.");
    }
  } catch (e) {
    console.error("Delete program failed:", e);
    setError("Lỗi kết nối khi xóa chương trình. Vui lòng thử lại.");
  } finally {
    setLoading(false);
  }
};
  return (
    <Box sx={{ px: 2, pb: 4 }}>
      {showCreate && <CreateCard />}

      <SearchBar value={q} onChange={setQ} loading={loading} />

      {error && (
        <Typography color="error" align="center" mt={2}>
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <ProgramList programs={visiblePrograms} onStart={handleStartProgram} onDelete={handleDeleteProgram} />
      )}
    </Box>
  );
};

export default TrainingProgramsPage;
