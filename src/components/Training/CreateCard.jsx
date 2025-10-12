// CreateCard.jsx
import React, { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom"; // 👈 import useNavigate

const CreateCard = () => {
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate(); // 👈 khởi tạo navigate

  const handleClick = () => {
    setSelected(!selected);
    setTimeout(() => navigate("/training/strength/new"), 300); // delay 300ms
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        maxWidth: 800,
        maxHeight: 50,
        mx: "auto",
        borderRadius: 1,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        border: "2px dashed",
        borderColor: "#e6e6e8",
        cursor: "pointer",
        bgcolor: selected ? "grey.100" : "#fff", // sửa lại màu đúng
        transition: "background-color 0.3s ease",
        textAlign: "center",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent sx={{ py: 2 }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <AddIcon sx={{ color: "#08080a", mr: 1 }} />
          <Typography
            variant="body2"
            fontSize={"15px"}
            fontWeight="medium"
            color="#08080a"
          >
            Create New Program
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreateCard;
