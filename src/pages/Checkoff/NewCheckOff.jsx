// pages/NewCheckOff.jsx (hoặc app/new-checkoff/page.jsx)

'use client';

import React, { useState } from 'react';
import {
  Box,
  Button, // Import Button
  Typography, // Import Typography
} from '@mui/material';
// 1. Import 2 component con
import CheckOffLayout from '../../components/layouts/CheckOffLayout';
import NewCheckOffInput from '../../components/Checkoff/NewCheckOffInput';
import CheckOffAthleteSelector from '../../components/Checkoff/CheckOffAthleteSelector';


// 2. DANH SÁCH VĐV (Lấy từ API hoặc hardcode)
const ATHLETES_LIST = [
  { id: 'athur-doocie-123', name: 'Athur Doocie' },
  { id: 'bethony-cimon-456', name: 'Bethony Cimon' },
  { id: 'cecilia-cimon-789', name: 'Cecilia Cimon' },
];

// Helper để bọc Label cho CheckOffAthleteSelector
// (Chúng ta làm điều này ở đây để giữ cho CheckOffAthleteSelector được tái sử dụng)
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

// --- Trang Cha ---
export default function NewCheckOff() {
  
  const getTodayDate = () => {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const dd = String(today.getDate()).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  };

  // 3. QUẢN LÝ TOÀN BỘ STATE TẠI ĐÂY
  const [todayDate] = useState(getTodayDate());
  const [dueDate, setDueDate] = useState('');
  const [skill, setSkill] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedAthletes, setSelectedAthletes] = useState([]); // State MẢNG

  // Hàm xử lý khi nhấn nút
  const handleSendCheckoff = () => {
    const checkOffData = {
      dueDate,
      skill,
      notes,
      athletes: selectedAthletes, // Mảng các ID
      dateSent: todayDate
    };
    console.log("Đang gửi CheckOff:", checkOffData);
    // TODO: Gọi API tại đây
  };

  return (
    // Box ngoài cùng
    <CheckOffLayout>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        width: '100%',
        fontFamily: 'Aptos, sans-serif',
        p: 3, 
      }}
    >
      {/* Box chứa form */}
      <Box sx={{ width: '100%', maxWidth: '600px' }}>

        {/* 4. Truyền state + setters xuống component Input */}
        <NewCheckOffInput
          todayDate={todayDate}
          dueDate={dueDate}
          setDueDate={setDueDate}
          skill={skill}
          setSkill={setSkill}
          notes={notes}
          setNotes={setNotes}
        />

        {/* 5. Truyền state + setter xuống component Select */}
        <FormGroup label="Who is this check off for?">
          <CheckOffAthleteSelector
            athletesList={ATHLETES_LIST}
            selectedAthletes={selectedAthletes}
            onChange={setSelectedAthletes}
          />
        </FormGroup>

        {/* 6. Nút "Send Checkoff" */}
        <Button 
          variant="contained" 
          fullWidth
          onClick={handleSendCheckoff}
          sx={{ 
            backgroundColor: "#257951", 
            color: "white", 
            fontSize: "15px", 
            fontWeight: "bold", 
            textTransform: "none", 
            borderRadius: "10px", 
            padding: "8px", 
            marginTop: "10px"
          }}
        >
          Send Checkoff
        </Button>

      </Box>
    </Box>
    </CheckOffLayout>
  );
}