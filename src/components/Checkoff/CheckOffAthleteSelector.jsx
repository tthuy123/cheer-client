// components/CheckOff/CheckOffAthleteSelector.jsx

'use client'; // Cần thiết nếu dùng Next.js App Router

import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// --- Cấu hình (Giữ nguyên từ code trước) ---
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const CUSTOM_GREEN = '#257951'; // Màu xanh lá đã thống nhất

function getStyles(id, selectedIds, theme) {
  return {
    fontWeight:
      selectedIds.indexOf(id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

/**
 * Component Dropdown (chọn nhiều) dành riêng cho trang CheckOff.
 * Đây là component "controlled", nhận state từ cha.
 */
export default function CheckOffAthleteSelector({ 
  athletesList = [],       // Prop: Danh sách VĐV đầy đủ (vd: [{id, name}, ...])
  selectedAthletes,   // Prop: Mảng các ID đã chọn (vd: ['id-1', 'id-2'])
  onChange            // Prop: Hàm để gọi khi có thay đổi
}) {
  const theme = useTheme();

  const handleChange = (event) => {
    const { target: { value } } = event;
    // Gọi hàm onChange từ cha
    onChange(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  // Hàm helper để render tên
  const renderSelectedNames = (selectedIds) => {
    // 1. Nếu mảng rỗng, hiển thị placeholder
    if (!selectedIds || selectedIds.length === 0) {
      return (
        <Typography sx={{ color: '#a0a0a0', fontFamily: 'Aptos, sans-serif' }}>
          Who is this check off for?
        </Typography>
      );
    }
    
    // 2. Nếu có chọn, hiển thị tên
    if (!athletesList || athletesList.length === 0) return '';
    return selectedIds
      .map(id => {
        const athlete = athletesList.find(a => a.id === id);
        return athlete ? athlete.name : '';
      })
      .join(', ');
  };

  return (
    <FormControl fullWidth>
      <Select
        multiple
        displayEmpty // Quan trọng để hiển thị placeholder
        value={selectedAthletes}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={renderSelectedNames}
        MenuProps={MenuProps}
        sx={{
          // Style thống nhất (giống CustomTextField)
          fontFamily: 'Aptos, sans-serif',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#a0a0a0' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#757575' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: CUSTOM_GREEN,
            borderWidth: '2px',
          },
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
                '&.Mui-checked': { color: CUSTOM_GREEN }
              }}
            />
            <ListItemText primary={athlete.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}