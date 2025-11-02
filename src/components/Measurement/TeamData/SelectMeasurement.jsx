import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';

// 1. XÓA: useState, useEffect, CircularProgress, MeasurementAPI
// 2. THÊM: Prop 'measurementsList' để nhận danh sách từ cha

const SelectMeasurement = ({ selected, onChange, measurementsList = [] }) => {
  // 3. XÓA: Toàn bộ state 'isLoading' và 'useEffect'

  const handleChange = (event) => {
    const selectedId = event.target.value;
    
    // 4. SỬA: Tìm trong 'measurementsList' (từ props), không phải 'selected'
    // (Giả sử key là 'id' như đã thống nhất)
    const selectedObject = measurementsList.find(m => m.measurement_id === selectedId);

    if (selectedObject) {
      onChange(selectedObject);
    }
  };

  // 5. XÓA: Khối 'if (isLoading)'

  return (
    <Box 
      sx={{ 
        padding: 2, 
        maxWidth: '900px !important', 
        fontFamily: 'Aptos, sans-serif',
      }}
    >
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

      <FormControl fullWidth size="medium">
        <Select
          // 6. SỬA: Dùng 'selected.measurement_id'
          value={selected ? selected.measurement_id : ''} 
          onChange={handleChange}
          displayEmpty
          sx={{
            backgroundColor: '#fff', 
            borderRadius: '8px',
            textAlign: 'left',
            '& .MuiSelect-icon':{
              color: '#a0a0a0',
              right: 12,
              fontSize: '2rem',
            },
          }}
        >
          {/* 7. SỬA: Lặp (map) qua 'measurementsList' (từ props) */}
          {measurementsList.map((measure) => (
            <MenuItem 
              // 8. SỬA: Dùng 'id' cho key và value
              key={measure.measurement_id} 
              value={measure.measurement_id} 
              sx={{ 
                fontFamily: 'Aptos, sans-serif',
              }}
            >
              {measure.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectMeasurement;