// Bắt buộc dùng 'use client' vì có useState
'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';
// Import layout (sửa đường dẫn nếu cần)
import CheckOffLayout from '../../components/layouts/CheckOffLayout'; 
// Import icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// 1. DỮ LIỆU MOCK (với số liệu đã bịa)
const MOCK_DATA = [
  { name: 'athur doccle', month: '92%', week1: '100%', week2: '80%', week3: '90%', week4: '95%' },
  { name: 'bethony cimon', month: '85%', week1: '75%', week2: '90%', week3: '80%', week4: '95%' },
  { name: 'cecile cimon', month: '98%', week1: '100%', week2: '100%', week3: '95%', week4: '98%' },
];

// Màu xanh lá chủ đạo (từ style của bạn)
const CUSTOM_GREEN = '#257951';

export default function CheckOffTeamData() {
  // 2. State để quản lý tháng
  const [currentDate, setCurrentDate] = useState(new Date('2025-10-01')); // Đặt tháng 10/2025 như trong ảnh

  // 3. Hàm xử lý chuyển tháng
  const handleMonthChange = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // 4. Format lại tên tháng
  const formattedDate = currentDate.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <CheckOffLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Căn giữa nội dung
          width: '100%',
          fontFamily: 'Aptos, sans-serif',
        }}
      >
        {/* 5. PHẦN CHỌN THÁNG (CALENDAR) */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: '800px', // Giới hạn chiều rộng
            my: 2, // Margin top/bottom
          }}
        >
          <IconButton onClick={() => handleMonthChange(-1)}>
            <ChevronLeftIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayIcon sx={{ color: '#555' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Aptos, sans-serif' }}>
              {formattedDate}
            </Typography>
          </Box>
          
          <IconButton onClick={() => handleMonthChange(1)}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* 6. BỎ SUB-MENU (theo yêu cầu) */}

        {/* 7. BẢNG DỮ LIỆU */}
        <TableContainer component={Paper} sx={{ maxWidth: '800px', width: '100%', border: '1px solid #e0e0e0' }}>
          <Table aria-label="team data table">
            {/* 7.1. Tiêu đề bảng */}
            <TableHead>
              <TableRow
                sx={{
                  // Style tiêu đề giống hệt trong ảnh
                  backgroundColor: CUSTOM_GREEN,
                }}
              >
                <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontFamily: 'Aptos, sans-serif' }}>Name</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontFamily: 'Aptos, sans-serif' }}>Month</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontFamily: 'Aptos, sans-serif' }}>Week 1</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontFamily: 'Aptos, sans-serif' }}>Week 2</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontFamily: 'Aptos, sans-serif' }}>Week 3</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold', fontFamily: 'Aptos, sans-serif' }}>Week 4</TableCell>
              </TableRow>
            </TableHead>
            {/* 7.2. Nội dung bảng (dữ liệu mock) */}
            <TableBody>
              {MOCK_DATA.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ fontFamily: 'Aptos, sans-serif' }}>
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'Aptos, sans-serif' }}>{row.month}</TableCell>
                  <TableCell sx={{ fontFamily: 'Aptos, sans-serif' }}>{row.week1}</TableCell>
                  <TableCell sx={{ fontFamily: 'Aptos, sans-serif' }}>{row.week2}</TableCell>
                  <TableCell sx={{ fontFamily: 'Aptos, sans-serif' }}>{row.week3}</TableCell>
                  <TableCell sx={{ fontFamily: 'Aptos, sans-serif' }}>{row.week4}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </CheckOffLayout>
  );
}
