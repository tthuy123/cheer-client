// components/CheckOff/NewCheckoffInput.jsx

'use client';

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  styled,
} from '@mui/material';

// 1. CustomTextField và FormGroup được định nghĩa TẠI ĐÂY
const CustomTextField = styled(TextField)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    fontFamily: 'Aptos, sans-serif', 
    borderRadius: '8px', 
    '& fieldset': { borderColor: '#a0a0a0' },
    '&:hover fieldset': { borderColor: '#757575' },
    '&.Mui-focused fieldset': {
      borderColor: '#257951', 
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input::placeholder': { color: '#a0a0a0', opacity: 1 },
  '& .MuiInputBase-input': { fontFamily: 'Aptos, sans-serif' }
});

const FormGroup = ({ label, children }) => (
  <Box sx={{ width: '100%', mb: 3 }}>
    <Typography
      variant="body1"
      sx={{
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
        mb: 1, 
        fontFamily: 'Aptos, sans-serif',
      }}
    >
      {label}
    </Typography>
    {children}
  </Box>
);

/**
 * Component "dumb" chỉ hiển thị 4 ô input đầu tiên.
 * Nhận tất cả state và setters từ component cha.
 */
export default function NewCheckoffInput({
  todayDate,
  dueDate,
  setDueDate,
  skill,
  setSkill,
  notes,
  setNotes
}) {
  return (
    <> {/* Dùng Fragment để trả về nhiều FormGroup */}
      {/* === Today's Date === */}
      <FormGroup label="Today's Date">
        <CustomTextField
          disabled
          value={todayDate}
          inputProps={{
            sx: { 
              textAlign: 'center',
              fontFamily: 'Aptos, sans-serif'
            } 
          }}
        />
      </FormGroup>

      {/* === When is skill check due? === */}
      <FormGroup label="When is skill check due?">
        <CustomTextField
          type="text"
          placeholder="Select due date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          onFocus={(e) => (e.target.type = 'date')}
          onBlur={(e) => {
            if (!e.target.value) { e.target.type = 'text'; }
          }}
        />
      </FormGroup>

      {/* === What skill or challenge is due? === */}
      <FormGroup label="What skill or challenge is due?">
        <CustomTextField
          placeholder="Enter skill or challenge"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
      </FormGroup>

      {/* === Any notes or comments? === */}
      <FormGroup label="Any notes or comments?">
        <CustomTextField
          placeholder="Add notes here..."
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </FormGroup>
    </>
  );
}