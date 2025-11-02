import React from 'react'; // 1. XÓA: useState
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';

// 2. XÓA: Dữ liệu 'ATHLETES' cứng

// 3. SỬA PROPS: Nhận dữ liệu từ component cha
const SelectAthlete = ({ athletesList = [], selected, onChange }) => {
  
  // 4. XÓA: State nội bộ (useState)

  // 5. SỬA: Dùng hàm handleChange chuẩn (gửi object về cho cha)
  const handleChange = (event) => {
    const selectedId = event.target.value;
    // Tìm object VĐV đầy đủ
    const selectedObject = athletesList.find(a => a.id === selectedId);
    if (selectedObject) {
      onChange(selectedObject); // Gửi object lên cho cha
    }
  };

  return (
    <Box 
      sx={{ 
        padding: 2, 
        maxWidth: 900, 
        fontFamily: 'Aptos, sans-serif',
      }}
    >
      {/* Tiêu đề (Giữ nguyên) */}
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

      <FormControl fullWidth size="medium">
        <Select
          // 6. SỬA: 'value' được điều khiển bởi prop 'selected' (dùng 'id')
          value={selected ? selected.id : ''} 
          onChange={handleChange}
          displayEmpty
          
          // 7. GIỮ NGUYÊN & SỬA: Dùng logic 'renderValue' của bạn
          // nhưng kiểm tra dựa trên 'value' (là 'id' hoặc chuỗi rỗng)
          renderValue={(valueId) => {
            if (!valueId) { // Nếu không có ID (giá trị là '')
              // Dùng màu xám nhạt cho placeholder
              return <Typography sx={{ color: '#a0a0a0', textAlign: 'left' }}>Select Athlete</Typography>;
            }
            // Nếu có ID, 'selected' (object) từ prop chắc chắn tồn tại
            return selected.name;
          }}
          sx={{
            // Toàn bộ style 'sx' của bạn được giữ nguyên
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
              color: '#a0a0a0', 
              right: 12,
              fontSize: '1.5rem',
            },
            fontFamily: 'Aptos, sans-serif',
            textAlign: 'left',
          }}
        >
          {/* 8. XÓA: MenuItem "Select Athlete" (không cần nữa) */}
          
          {/* 9. SỬA: Lặp qua 'athletesList' (từ props) */}
          {athletesList.map((athlete) => (
            <MenuItem 
              key={athlete.id} // Dùng ID (từ object)
              value={athlete.id} // Dùng ID (từ object)
              sx={{ 
                // Giữ nguyên style 'sx' cho MenuItem của bạn
                fontSize: '0.95rem',
                color: '#1e1e1e',
                fontFamily: 'Aptos, sans-serif',
                '&:hover': {
                    backgroundColor: '#f4f4f5',
                },
                '&.Mui-selected': {
                  backgroundColor: '#f4f4f5 !important', 
                },
                '&.Mui-selected:hover': {
                  backgroundColor: '#f4f4f5', 
                }
              }}
            >
              {athlete.name} {/* Hiển thị tên (từ object) */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectAthlete;