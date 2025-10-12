// StrengthBar.jsx
import React from "react";
import { Box, Button } from "@mui/material";

const strengthSubTabs = ["Cheer Trainer", "Team Programs", "My Programs"];

export default function StrengthBar({ activeSubTab, onChangeSubTab }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      position="fixed"
      left={0}
      right={0}
      zIndex={999}
      width="100%"
      top={48} // đặt bên dưới TrainingBar (chiều cao 40px + margin 8px)
      boxShadow="0px 1px 2px rgba(0,0,0,0.1)"
      bgcolor="#fff"
      role="tablist"
      aria-label="Strength sub navigation"
    >
      {strengthSubTabs.map((sub) => {
        const selected = activeSubTab === sub;
        return (
          <Button
            key={sub}
            onClick={() => onChangeSubTab(sub)}
            role="tab"
            aria-selected={selected}
            sx={{
              borderRadius: 0,
              color: selected ? "#257850" : "#71717a", // chỉ đổi màu chữ
              backgroundColor: "#fff",
              fontWeight: 600,
              fontSize: "1.1rem",
              textTransform: "none",
              height: "40px",
              mx: 2,
              // gợi ý underline nhẹ khi active
              borderBottom: selected ? "2px solid #257850" : "2px solid transparent",
            }}
          >
            {sub}
          </Button>
        );
      })}
    </Box>
  );
}
