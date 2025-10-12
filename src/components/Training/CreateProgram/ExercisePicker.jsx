import React, { useMemo, useState } from "react";
import { Box, Divider } from "@mui/material";
import ExerciseSearchBar from "./ExerciseSearchBar";
import ExerciseSection from "./ExerciseSection";
import ExerciseList from "./ExerciseList";
import LoadMoreButton from "./LoadMoreButton";

// giả lập dữ liệu
const ALL_EXERCISES = [
  /* ... mảng ~100 items; demo vài item: */
  {
    id: "ex1",
    name: "Resistance Band Lateral Walks",
    description:
      "Place resistance band around thighs, knees, or ankles. Assume mini squat position with feet shoulder-width apart...",
    imageUrl: "/images/thumb.jpg",
  },
  {
    id: "ex2",
    name: "Around the World",
    description:
      "Stand with feet shoulder-width apart holding a kettlebell or weight plate in one hand. Rotate the weight around your body...",
    imageUrl: "/images/thumb.jpg",
  },
  // ...
];

export default function ExercisePickerPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1); // phân trang đơn giản
  const [added, setAdded] = useState([
    // ví dụ đã thêm sẵn 2 item
    {
      id: "exA",
      name: "Resistance Band Seesaw Press",
      description:
        "Grasp resistance bands and extend arms to shoulder width. Alternately press one arm up...",
      imageUrl: "/images/thumb.jpg",
    },
    {
      id: "exB",
      name: "Resistance Band Diagonal Walks",
      description:
        "Secure resistance band around thighs, knees, or ankles. Begin in mini squat position...",
      imageUrl: "/images/thumb.jpg",
    },
  ]);

  const PAGE_SIZE = 8;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_EXERCISES;
    return ALL_EXERCISES.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
    );
  }, [query]);

  const visible = useMemo(() => {
    return filtered.slice(0, page * PAGE_SIZE);
  }, [filtered, page]);

  const onAdd = (item) => {
    // tránh trùng
    if (added.find((e) => e.id === item.id)) return;
    setAdded((prev) => [...prev, item]);
  };

  const onRemove = (item) => {
    setAdded((prev) => prev.filter((e) => e.id !== item.id));
  };

  const canLoadMore = visible.length < filtered.length;

  return (
    <Box sx={{ width: "100%", pt: 10}}>
      {/* header row: title left, search right */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <Box sx={{ flex: 1, fontWeight: 700, color: "success.dark", textAlign: "left" }}>
          Available Exercises ({filtered.length})
        </Box>
        <ExerciseSearchBar value={query} onChange={setQuery} />
      </Box>

      <ExerciseSection>
        <ExerciseList
          items={visible}
          action="add"
          onAction={onAdd}
        />
        {canLoadMore && (
          <Box sx={{ textAlign: "center", py: 1 }}>
            <LoadMoreButton onClick={() => setPage((p) => p + 1)} />
          </Box>
        )}
      </ExerciseSection>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ fontWeight: 700, color: "success.dark", mb: 1, textAlign: "left" }}>
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
    </Box>
  );
}
