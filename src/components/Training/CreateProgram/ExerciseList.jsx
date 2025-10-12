import React from "react";
import { Stack } from "@mui/material";
import ExerciseItem from "./ExerciseItem";
import EmptyState from "./EmptyState";

export default function ExerciseList({
  items,
  action, // 'add' | 'remove'
  onAction,
  emptyText = "No results.",
}) {
  if (!items?.length) return <EmptyState text={emptyText} />;

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      {items.map((item) => (
        <ExerciseItem
          key={item.id}
          item={item}
          action={action}
          onAction={onAction}
        />
      ))}
    </Stack>
  );
}
