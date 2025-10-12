import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const TrainingBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ lấy URL hiện tại

  const tabs = [
    { label: 'Strength', path: '/training/strength' },
    { label: 'Team Training Log', path: '/training/team-training-log' },
  ];

  return (
    <Box
      display="flex"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      width="100%"
      borderBottom="1px solid #ccc"
    >
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path; // ✅ kiểm tra tab nào đang active

        return (
          <Button
            key={tab.label}
            onClick={() => navigate(tab.path)}
            sx={{
              flex: 1,
              borderRadius: 0,
              color: isActive ? '#fff' : '#4a5566',
              backgroundColor: isActive ? '#257850' : '#fff',
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              height: '40px',
            }}
          >
            {tab.label}
          </Button>
        );
      })}
    </Box>
  );
};

export default TrainingBar;
