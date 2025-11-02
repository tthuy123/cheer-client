// AthleteSelector.jsx

// 1. IMPORT 'React' ĐỂ DÙNG (nếu cần)
import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// --- Configuration Constants (Giữ nguyên) ---
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 900,
    },
  },
};

// --- Custom Styles (Giữ nguyên) ---
function getStyles(id, selectedIds, theme) { // Sửa 'name' thành 'id'
  return {
    fontWeight:
      selectedIds.indexOf(id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// --- Màu Xanh Lá Tùy Chỉnh (Giữ nguyên) ---
const CUSTOM_GREEN = '#257951';

// --- AthleteSelector Component ---

// 2. THAY ĐỔI LỚN NHẤT: NHẬN PROPS TỪ CHA
export default function AthleteSelector({ 
  athletesList,       // Prop: Danh sách VĐV đầy đủ (VD: [{id, name}, ...])
  selectedAthletes,   // Prop: Mảng các ID đã chọn (VD: ['id-1', 'id-2'])
  onChange            // Prop: Hàm để gọi khi có thay đổi
}) {
  const theme = useTheme();

  // 3. XÓA BỎ STATE NỘI BỘ
  // const [selectedAthletes, setSelectedAthletes] = React.useState([...]);
  
  // 4. XÓA BỎ DỮ LIỆU HARDCODE
  // const allAthletes = [ ... ];

  // 5. CẬP NHẬT HÀM handleChange
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    
    // THAY ĐỔI: Gọi hàm `onChange` từ prop (thay vì `setSelectedAthletes`)
    onChange(
      // value sẽ là một mảng các ID
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // 6. HÀM HELPER ĐỂ HIỂN THỊ TÊN TỪ ID
  // (Vì `selectedAthletes` giờ là mảng các ID)
  const renderSelectedNames = (selectedIds) => {
    if (!athletesList || athletesList.length === 0) return '';
    
    // Tìm tên tương ứng với ID và nối chuỗi
    return selectedIds
      .map(id => {
        const athlete = athletesList.find(a => a.id === id);
        return athlete ? athlete.name : '';
      })
      .join(', ');
  };


  return (
    // Box và Typography của bạn (Giữ nguyên)
    <Box sx={{ m: 1, width: 900 }}>
      <Typography 
        variant="body2" 
        sx={{ 
          marginBottom: 1, 
          color: '#56616f', 
          fontWeight: 'bold',
          textAlign: 'left',
        }}
        id="athlete-multiple-checkbox-label"
      >
        Select Athlete
      </Typography>

      <FormControl 
        fullWidth
        color="success" 
      >
        <Select
          labelId="athlete-multiple-checkbox-label"
          id="athlete-multiple-checkbox"
          multiple
          
          // 7. SỬ DỤNG PROPS
          value={selectedAthletes} // Dùng mảng ID từ prop
          onChange={handleChange}  // Dùng hàm xử lý đã cập nhật
          
          input={<OutlinedInput />} 
          
          // 8. CẬP NHẬT renderValue ĐỂ DÙNG HÀM HELPER
          renderValue={renderSelectedNames} // Hiển thị tên thay vì ID
          
          MenuProps={MenuProps}
          sx={{
            textAlign: 'left', 
          }}
        >
          {/* 9. MAP QUA `athletesList` (TỪ PROP) */}
          {athletesList.map((athlete) => (
            <MenuItem
              // 10. DÙNG `athlete.id` VÀ `athlete.name`
              key={athlete.id}
              value={athlete.id} // Giá trị là ID
              style={getStyles(athlete.id, selectedAthletes, theme)}
            >
              <Checkbox 
                // Kiểm tra xem ID có trong mảng `selectedAthletes` (từ prop) không
                checked={selectedAthletes.indexOf(athlete.id) > -1} 
                sx={{
                  color: CUSTOM_GREEN,
                  '&.Mui-checked': {
                    color: CUSTOM_GREEN,
                  }
                }}
              />
              <ListItemText primary={athlete.name} /> {/* Hiển thị tên */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}