import React from "react";
import { Button } from "@mui/material";

export default function LoadMoreButton({ onClick }) {
  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        color: "success.main",
        fontWeight: 600,
        textTransform: "none",
      }}
    >
      Load more
    </Button>
  );
}
