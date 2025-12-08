import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Box, Divider, CircularProgress, Alert } from "@mui/material";
import ExerciseSearchBar from "./ExerciseSearchBar";
import ExerciseSection from "./ExerciseSection";
import ExerciseList from "./ExerciseList";
import LoadMoreButton from "./LoadMoreButton";
import { useSelector } from "react-redux";
import Exercise from "../../../api/modules/exercise.api";
import useDebounce from "../../../utils/useDebounce"; // <--- ĐẢM BẢO ĐƯỜNG DẪN ĐÚNG ---

export default function ExercisePickerPage({ onChangeSelected }) {
  const token = useSelector((s) => s.auth.token);

  // ====== STATE VÀ DEBOUNCE ======
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); // Trì hoãn 500ms cho việc tìm kiếm API

  const [added, setAdded] = useState([]);
  const [allExercises, setAllExercises] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [err, setErr] = useState(null);

  // ====== HELPERS ======
  const normalize = (rows) =>
    (rows || []).map((e) => ({
      id: e.exercise_id ?? e._id ?? String(e.uuid ?? e.code),
      name: e.name ?? e.title ?? "Untitled Exercise",
      description: e.description ?? e.desc ?? "",
      imageUrl: e.image_url ?? e.thumbnail ?? e.image ?? "/images/thumb.jpg",
      cues: e.cues ?? [],
      videoUrl: e.video_url ?? "",
      updated_at: e.updated_at,
    }));

  const fetchPage = useCallback(
    async (targetPage, { append } = { append: false }) => {
      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoadingInitial(true);
          setErr(null);
        }

        // Gọi API, truyền debouncedQuery vào
        const data = await Exercise.getAllExercises(targetPage, token, { 
            searchQuery: debouncedQuery 
        });
        
        const items = normalize(data?.items);

        setPage(data?.page ?? targetPage);
        setPageSize(data?.pageSize ?? 10);
        setTotal(data?.total ?? 0);
        setTotalPages(data?.totalPages ?? 1);

        setAllExercises((prev) => (append ? [...prev, ...items] : items));
      } catch (error) {
        setErr(error?.message || "Failed to load exercises");
      } finally {
        setLoadingInitial(false);
        setLoadingMore(false);
      }
    },
    [token, debouncedQuery] // Thêm debouncedQuery vào dependencies
  );

  // Tải lại dữ liệu khi debouncedQuery thay đổi
  useEffect(() => {
    // Reset state và tải lại trang 1
    setAllExercises([]); 
    setPage(1);         
    fetchPage(1, { append: false });
  }, [debouncedQuery, token, fetchPage]);

  // ====== FILTERING (client-side - chỉ để hiển thị tức thì và lọc theo tên) ======
  const addedIds = useMemo(() => new Set(added.map((e) => e.id)), [added]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    // Nếu không có truy vấn, hiển thị tất cả bài tập đã load từ server
    if (!q) return allExercises;
    
    // Tìm kiếm tức thì theo tên trên client (chỉ lọc theo tên như yêu cầu)
    return allExercises.filter(
      (e) => e.name.toLowerCase().includes(q)
    );
  }, [query, allExercises]); // Sử dụng 'query' (state gốc) để lọc tức thì

  const available = useMemo(
    () => filtered.filter((e) => !addedIds.has(e.id)),
    [filtered, addedIds]
  );

  // Nút load more còn khả dụng nếu số đã tải < tổng trên server VÀ KHÔNG CÓ TRUY VẤN SEARCH
  // (Vì endpoint search không có phân trang)
  const canLoadMore = allExercises.length < total && page < totalPages && !debouncedQuery; 

  // ====== ACTIONS ======
  const onAdd = (item) => {
    setAdded((prev) =>
      prev.some((e) => e.id === item.id) ? prev : [...prev, item]
    );
  };

  const onRemove = (item) => {
    setAdded((prev) => prev.filter((e) => e.id !== item.id));
  };

  const handleLoadMore = () => {
    if (!loadingMore && canLoadMore) {
      fetchPage(page + 1, { append: true });
    }
  };

  // ====== EMIT selected list ra ngoài mỗi khi đổi ======
  useEffect(() => {
    if (onChangeSelected) onChangeSelected(added);
  }, [added, onChangeSelected]);

  return (
    <Box sx={{ width: "100%", pt: 10 }}>
      {/* Header: title left, search right */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Box
          sx={{
            flex: 1,
            fontWeight: 700,
            color: "success.dark",
            textAlign: "left",
          }}
        >
          Available Exercises ({available.length}
          {typeof total === "number" ? ` / ${total}` : ""})
        </Box>
        <ExerciseSearchBar value={query} onChange={setQuery} />
      </Box>

      {loadingInitial && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {err && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {err}
        </Alert>
      )}

      {!loadingInitial && !err && (
        <>
          <ExerciseSection>
            <ExerciseList items={available} action="add" onAction={onAdd} />
            <Box sx={{ textAlign: "center", py: 1 }}>
              {canLoadMore && (
                <LoadMoreButton
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                />
              )}
              {loadingMore && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
              {!canLoadMore && allExercises.length > 0 && (
                <Box sx={{ fontSize: 13, color: "text.secondary", mt: 1 }}>
                  You have reached the end ({allExercises.length}/{total})
                </Box>
              )}
            </Box>
          </ExerciseSection>

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{ fontWeight: 700, color: "success.dark", mb: 1, textAlign: "left" }}
          >
            Added Exercises ({added.length})
          </Box>
          <ExerciseSection>
            <ExerciseList
              items={added}
              action="remove"
              onAction={onRemove}
              emptyText="No exercises added yet."
            />
          </ExerciseSection>
        </>
      )}
    </Box>
  );
}