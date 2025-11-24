// src/components/Training/ProgramList.jsx
import React from "react";
import { Card, CardContent, Typography, Box, IconButton, Button } from "@mui/material";
//import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// CẬP NHẬT: Thêm prop 'onDelete'
const ProgramCard = ({ program, onStart, onDelete }) => (
  <Card
    sx={{
      maxWidth: 800,
      mx: "auto",
      mt: 2,
      borderRadius: 2,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      border: "1px solid",
      borderColor: "#e6e6e8",
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Box>
        <Typography
          variant="body1"
          fontSize="18px"
          fontWeight="bold"
          color="#101829"
          gutterBottom
          align="left"
        >
          {program.name}
        </Typography>
        {program.exercise_names && (
          <Typography variant="body2" fontSize="15px" color="#4a5566" align="left">
            {program.exercise_names}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
        <IconButton 
          size="medium" 
          sx={{ color: "#9ca3b1" }} 
          // MỚI: Gắn hàm onDelete vào nút xóa
          onClick={() => onDelete?.(program.program_id)} 
          aria-label="delete program"
        >
          {/* <ContentCopyIcon fontSize="small" /> */}
          <DeleteOutlineIcon fontSize="medium"  />
        </IconButton>

        <Button
          variant="outlined"
          size="small"
          startIcon={<PlayArrowIcon />}
          sx={{ color: "#257850", borderColor: "#257850", textTransform: "none", borderRadius: "6px", mt: 5 }}
          onClick={() => onStart?.(program)}
        >
          Start
        </Button>
      </Box>
    </CardContent>
  </Card>
);

// CẬP NHẬT: Thêm prop 'onDelete'
const ProgramList = ({ programs = [], onStart, onDelete }) => (
  <>
    {programs.map((p) => (
      <ProgramCard 
        key={p.program_id} 
        program={p} 
        onStart={onStart} 
        onDelete={onDelete} // MỚI: Truyền hàm onDelete xuống ProgramCard
      />
    ))}
  </>
);

export default ProgramList;