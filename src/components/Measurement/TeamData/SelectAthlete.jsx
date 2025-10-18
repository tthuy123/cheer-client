import React, { useState } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';

// Danh sách các vận động viên (Dựa trên ảnh minh họa)
const ATHLETES = [
  //'Select Athlete', // Placeholder/Tùy chọn mặc định
  'athur doccle',
  'bethony cimon',
  'cecile cimon',
];

const SelectAthlete = () => {
  // Đặt giá trị mặc định là 'Select Athlete' để khớp với Placeholder
  const [selectedAthlete, setSelectedAthlete] = useState('Select Athlete');

  const handleChange = (event) => {
    setSelectedAthlete(event.target.value);
  };

  return (
    <Box 
      sx={{ 
        padding: 2, 
        maxWidth: 900, 
        //margin: '0 auto',
        // Áp dụng font Aptos cho toàn bộ component (giữ nguyên từ SelectMeasurement)
        fontFamily: 'Aptos, sans-serif',
      }}
    >
      {/* Tiêu đề "Select Athlete" */}
      <Typography 
        variant="body2" 
        sx={{ 
          marginBottom: 1, 
          color: '#56616f', 
          fontWeight: 'bold',
          textAlign: 'left',
        }}
      >
        Select Athlete
      </Typography>

      {/* FormControl chứa Select (HỘP CHỌN DUY NHẤT) */}
      <FormControl fullWidth size="medium">
        <Select
          value={selectedAthlete}
          onChange={handleChange}
          displayEmpty
          // THÊM: Render value='Select Athlete' là màu xám khi chưa chọn gì
          renderValue={(value) => {
            if (value === 'Select Athlete') {
              // Dùng màu xám nhạt cho placeholder
              return <Typography sx={{ color: '#a0a0a0', textAlign: 'left' }}>{value}</Typography>;
            }
            return value;
          }}
          sx={{
            backgroundColor: '#fff', 
            borderRadius: '8px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e0e0e0', 
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#a0a0a0',
            },
            // Giữ nguyên màu viền khi focus (xanh lá)
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#257951',
            },
            // Tùy chỉnh mũi tên (màu xám nhạt)
            '& .MuiSelect-icon':{
              color: '#a0a0a0', 
              right: 12,
              fontSize: '1.5rem', // Giảm kích thước về mặc định/vừa phải
            },
            fontFamily: 'Aptos, sans-serif',
            // Căn lề trái cho giá trị được chọn
            textAlign: 'left',
          }}
        >
          {ATHLETES.map((athlete) => (
            <MenuItem 
              key={athlete} 
              value={athlete}
              // Ẩn tùy chọn 'Select Athlete' trong menu thả xuống thực tế (tránh bị chọn lại)
              disabled={athlete === 'Select Athlete'} 
              sx={{ 
                fontSize: '0.95rem',
                color: '#1e1e1e',
                fontFamily: 'Aptos, sans-serif',
                
                // MÀU HOVER (theo yêu cầu trước)
                '&:hover': {
                    backgroundColor: '#f4f4f5',
                },
                
                // MÀU SELECTED (theo yêu cầu trước)
                '&.Mui-selected': {
                  backgroundColor: '#f4f4f5 !important', 
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#f4f4f5', 
                }
              }}
            >
              {athlete}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectAthlete;