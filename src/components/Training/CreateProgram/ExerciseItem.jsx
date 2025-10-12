import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Paper,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ExerciseItem({ item, action, onAction }) {
  const { name, description, imageUrl } = item;

  const ActionBtn =
    action === "add" ? (
      <Tooltip title="Add">
        <IconButton
          edge="end"
          size="small"
          onClick={() => onAction(item)}
          sx={{ color: "success.main" }}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Remove">
        <IconButton
          edge="end"
          size="small"
          onClick={() => onAction(item)}
          sx={{ color: "error.main" }}
        >
          <RemoveIcon />
        </IconButton>
      </Tooltip>
    );

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1,
        borderRadius: 1.5,
        "&:hover": { bgcolor: "action.hover" },
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box display="flex" alignItems="center" gap={1.25}>
        <Avatar
          variant="rounded"
          src={imageUrl}
          alt={name}
          sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: "grey.200" }}
        />

        <Box sx={{ flex: 1, minWidth: 0, textAlign: "left" }}>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            lineHeight={1.2}
            noWrap
          >
            {name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            title={description}
          >
            {description}
          </Typography>
        </Box>

        <Box sx={{ ml: "auto" }}>{ActionBtn}</Box>
      </Box>
    </Paper>
  );
}
