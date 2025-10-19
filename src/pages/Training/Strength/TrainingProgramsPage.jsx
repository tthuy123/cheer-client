// src/pages/TrainingProgramsPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
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

  // helper lọc client (phòng khi server chưa hỗ trợ ?type=)
  const applyClientFilter = (items) => {
    if (filterType === "all") return items;
    return items.filter((p) => (p.type || "").toLowerCase() === (filterType === "my" ? "my" : "team"));
  };

  // 1) load list base theo filterType
  useEffect(() => {
    if (!userId) return;
    (async () => {
      setLoading(true);
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
      setLoading(false);
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
      const res = await Program.SearchProgramsByNameForUser(userId, term, token, filterType);
      console.log("✅ Kết quả từ API tìm kiếm chương trình:", res);
      if (Array.isArray(res.items)) {
        const items = applyClientFilter(res.items);
        setVisiblePrograms(items);
        setError("");
      } else {
        setVisiblePrograms([]);
        setError(res?.data?.error || "No results");
      }
      setLoading(false);
    }, debounceMs);

    return () => clearTimeout(tRef.current);
  }, [q, userId, token, filterType, allPrograms]);

  return (
    <Box sx={{ px: 2, pb: 4 }}>
      {showCreate && <CreateCard />}
      <SearchBar value={q} onChange={setQ} loading={loading} />
      {error && <Typography color="error" align="center" mt={2}>{error}</Typography>}
      {!loading && !error && <ProgramList programs={visiblePrograms} />}
    </Box>
  );
};

export default TrainingProgramsPage;
