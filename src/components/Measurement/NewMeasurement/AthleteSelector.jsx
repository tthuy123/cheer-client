// AthleteSelector.jsx

import * as React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  // Đã xóa 'colors' vì không sử dụng
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// --- Configuration Constants ---
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// --- Mock Data ---
const allAthletes = [
  'athur doccle',
  'bethony cimon',
  'cecile cimon',
  'david elis',
  'eva long',
  'frank zola',
];

// --- Custom Styles for Text (optional, to match the image better) ---
function getStyles(name, athleteName, theme) {
  return {
    fontWeight:
      athleteName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// --- Màu Xanh Lá Tùy Chỉnh ---
const CUSTOM_GREEN = '#257951';

// --- AthleteSelector Component ---

/**
 * A custom Material-UI component for selecting multiple athletes from a dropdown.
 * Thay đổi màu mặc định sang xanh lá (#257951).
 */
export default function AthleteSelector() {
  const theme = useTheme();
  const [selectedAthletes, setSelectedAthletes] = React.useState([
    'athur doccle',
    'bethony cimon',
    'cecile cimon',
  ]); // Initial state matching the image

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    setSelectedAthletes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl 
        sx={{ m: 1, width: 400 }}
        // Áp dụng màu xanh lá cho viền focus và label focus
        // Đây là cách đơn giản nhất để ghi đè màu 'primary' mặc định của MUI.
        color="success" 
        
        // Hoặc bạn có thể sử dụng trực tiếp SX để tùy chỉnh màu viền:
        /*
        sx={{ 
            m: 1, 
            width: 400,
            // Custom CSS cho viền khi focus
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: CUSTOM_GREEN, 
            },
            // Custom CSS cho InputLabel khi focus
            '& .MuiInputLabel-root.Mui-focused': {
                color: CUSTOM_GREEN, 
            }
        }}
        */
    >
      {/* InputLabel: Màu sẽ theo color="success" ở FormControl hoặc màu mặc định nếu không focus */}
      <InputLabel id="athlete-multiple-checkbox-label">Select Athlete</InputLabel>

      <Select
        labelId="athlete-multiple-checkbox-label"
        id="athlete-multiple-checkbox"
        multiple // Key prop for multiple selection
        value={selectedAthletes}
        onChange={handleChange}
        // Để Select sử dụng màu của FormControl, chúng ta không đặt màu ở đây
        input={<OutlinedInput label="Select Athlete" />}
        renderValue={(selected) => selected.join(', ')} // Display selected values in the input field
        MenuProps={MenuProps}
      >
        {allAthletes.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, selectedAthletes, theme)}
          >
            {/* Checkbox: Áp dụng màu xanh lá trực tiếp */}
            <Checkbox 
                checked={selectedAthletes.indexOf(name) > -1} 
                sx={{
                    // Áp dụng màu xanh lá (#257951) cho Checkbox khi được chọn
                    color: CUSTOM_GREEN,
                    '&.Mui-checked': {
                        color: CUSTOM_GREEN,
                    }
                }}
            />
            {/* Display the athlete's name */}
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}