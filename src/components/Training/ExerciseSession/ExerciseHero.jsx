// ExerciseHero.jsx
import React from "react";
import { Box, Typography, IconButton, Paper, Link } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function ExerciseHero({
  title,
  videoUrl,
  prevName,
  nextName,
  onPrev,
  onNext,
  maxWidth = 720,            // ví dụ: 560, 640, 720, 900...
  aspect = 56.25,            // 16:9 = 56.25; 4:3 = 75; 1:1 = 100
}) {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <IconButton onClick={onPrev} size="small" sx={{ color: "success.main" }}>
          <ArrowBackIosNewIcon fontSize="inherit" />
        </IconButton>
        <Typography
          sx={{ fontWeight: 700, color: "success.dark", textAlign: "center", flex: 1 }}
        >
          {title}
        </Typography>
        <Box sx={{ width: 32 }} />
      </Box>

      {/* Wrapper có maxWidth để thu nhỏ video + căn giữa */}
      <Box sx={{ maxWidth, mx: "auto", width: "100%" }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ position: "relative", pt: `${aspect}%`, bgcolor: "black" }}>
            {videoUrl && (
              <video
                src={videoUrl}
                controls
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  background: "black",
                }}
              />
            )}
          </Box>
        </Paper>

        {/* caption dưới video */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
          {/* <Typography variant="caption" color="text.secondary">
            &lt; Swipe to navigate &gt;
          </Typography> */}
          <Box sx={{ ml: "auto", mt: 3 }}>
            {nextName && (
              <Link underline="none" sx={{ color: "success.main", fontWeight: 600 }}>
                {nextName} &nbsp; &gt;
              </Link>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
