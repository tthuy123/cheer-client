import React, { useState } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';

// Danh sách các loại đo lường
const MEASUREMENTS = [
  '1 Mile Time',
  '2 Mile Time',
  '20m Sprint',
  '30 Second Endurance Jump',
  '300-Yard Shuttle Run',
  '40 Yard Dash',
  '400m Time',
  '5-10-5 Pro Agility Test',
  'Bench Press - 1 Rep Max',
  'Bench Press - 10 Rep Max',
  'Cooper 12-Minute Run',
];

const SelectMeasurement = () => {
  const [selectedMeasure, setSelectedMeasure] = useState('1 Mile Time');

  const handleChange = (event) => {
    setSelectedMeasure(event.target.value);
  };

  return (
    <Box 
      sx={{ 
        padding: 2, 
        maxWidth: 400, 
        margin: '0 auto',
        // THAY ĐỔI: Áp dụng font Aptos cho toàn bộ component
        fontFamily: 'Aptos, sans-serif',
      }}
    >
      {/* Tiêu đề "Select Measurement" */}
      <Typography 
        variant="body2" 
        sx={{ 
          marginBottom: 1, 
          color: '#56616f', 
          fontWeight: 'bold',
          textAlign: 'left',
        }}
      >
        Select Measurement
      </Typography>

      {/* FormControl chứa Select (HỘP CHỌN DUY NHẤT) */}
      <FormControl fullWidth size="medium">
        <Select
          value={selectedMeasure}
          onChange={handleChange}
          displayEmpty
          sx={{
            backgroundColor: '#fff', 
            borderRadius: '8px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e0e0e0', 
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#a0a0a0',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#257951',
            
            },
            '& .MuiSelect-icon':{
              color: '#a0a0a0', // Đặt màu xám cho mũi tên
              right: 12,        // Tinh chỉnh vị trí (mặc định đã là bên phải, nhưng có thể cần thiết)
              fontSize: '2rem',   // Tăng kích thước mũi tên
            },
            // Đảm bảo văn bản trong Select cũng dùng Aptos
            fontFamily: 'Aptos, sans-serif',
            textAlign: 'left',
          }}
        >
          {MEASUREMENTS.map((measure) => (
            <MenuItem 
              key={measure} 
              value={measure}
              sx={{ 
                fontSize: '0.95rem',
                color: '#1e1e1e',
                fontFamily: 'Aptos, sans-serif', // Đảm bảo MenuItem cũng dùng Aptos
                '&:hover': {
                    backgroundColor: '#f4f4f5',
                },
                // BỔ SUNG: Thiết lập màu nền khi tùy chọn được chọn (selected)
                '&.Mui-selected': {
                  backgroundColor: '#f4f4f5 !important', 
                },
                // BỔ SUNG: Cần đặt lại màu hover khi nó cũng là selected
                '&.Mui-selected:hover': {
                  backgroundColor: '#f4f4f5', // Thường dùng một màu khác để phân biệt hover
                  // HOẶC dùng lại màu cũ nếu bạn muốn giữ nguyên: 
                  // backgroundColor: '#f4f4f5', 
                  // BỔ SUNG: Xử lý trạng thái khi vừa được chọn, vừa được hover
                }
              }}
            >
              {measure}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectMeasurement;