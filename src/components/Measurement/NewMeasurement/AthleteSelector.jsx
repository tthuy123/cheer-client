// AthleteSelector.jsx
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

// --- 1. SỬA MenuProps: Xóa bỏ 'width' cố định ---
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

// --- Custom Styles (Giữ nguyên) ---
function getStyles(id, selectedIds, theme) {
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
export default function AthleteSelector({ 
  athletesList,
  selectedAthletes,
  onChange
}) {
  const theme = useTheme();

  // Logic (handleChange, renderSelectedNames) của bạn đã ĐÚNG, giữ nguyên
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    
    onChange(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

const renderSelectedNames = (selectedIds) => {
    if (!athletesList || athletesList.length === 0) return '';
    
    return selectedIds
      .map(id => {
        const athlete = athletesList.find(a => a.id === id);
        // SỬA: Trả về null (hoặc undefined) nếu không tìm thấy
        return athlete ? athlete.name : null; 
      })
      // THÊM: Lọc ra tất cả các giá trị null/undefined/rỗng
      .filter(name => !!name) 
      .join(', ');
  };


  return (
    // --- 2. SỬA Box: Dùng width: '100%' để khớp với cha ---
    <Box sx={{ 
        m: 1, 
        width: '100%' // <-- SỬA TỪ 'width: 900'
    }}>
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
          value={selectedAthletes}
          onChange={handleChange}
          input={<OutlinedInput />} 
          renderValue={renderSelectedNames}
          sx={{
            textAlign: 'left', 
          }}
        >
          {athletesList.map((athlete) => (
            <MenuItem
              key={athlete.id}
              value={athlete.id}
              style={getStyles(athlete.id, selectedAthletes, theme)}
            >
              <Checkbox 
                checked={selectedAthletes.indexOf(athlete.id) > -1} 
                sx={{
                  color: CUSTOM_GREEN,
                  '&.Mui-checked': {
                    color: CUSTOM_GREEN,
                  }
                }}
              />
              <ListItemText primary={athlete.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}