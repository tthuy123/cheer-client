// 1. IMPORT THÊM useState và useEffect
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

// Component tùy chỉnh CustomTextField (Giữ nguyên code của bạn)
const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    '& fieldset': {
      borderColor: '#a0a0a0',
    },
    '&:hover fieldset': {
      borderColor: '#757575',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#257951',
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: '#a0a0a0',
    opacity: 1,
  },
});

// Component chính
// 2. THAY ĐỔI PROPS: Thêm 'athletes', 'onSave', và 'measurementUnit'
const RecordPopup = ({ 
  open, 
  handleClose, 
  athletes = [], // Mảng các VĐV (vd: [{id, name}, ...])
  onSave,        // Hàm để gửi dữ liệu về
  measurementUnit = "units" // Đơn vị đo
}) => {
  
  // 3. THÊM STATE NỘI BỘ:
  // Dùng để lưu trữ giá trị nhập vào, ví dụ: { 'athur-123': '5', 'bethony-456': '6.2' }
  const [results, setResults] = useState({});

  // 4. HÀM XỬ LÝ KHI NGƯỜI DÙNG NHẬP LIỆU
  const handleResultChange = (athleteId, value) => {
    // Cập nhật state 'results'
    setResults(prevResults => ({
      ...prevResults,
      [athleteId]: value, // Cập nhật giá trị cho VĐV có ID tương ứng
    }));
  };

  // 5. HÀM XỬ LÝ KHI NHẤN NÚT "SAVE"
  const handleSaveClick = () => {
    // Gọi hàm onSave (từ prop) và truyền object 'results' lên cho cha (NewMeasurement.jsx)
    if (onSave) {
      onSave(results);
    }
  };

  // 6. THÊM useEffect ĐỂ DỌN DẸP STATE
  // Khi popup đóng lại, xóa hết dữ liệu đã nhập
  useEffect(() => {
    if (!open) {
      setResults({});
    }
  }, [open]);


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        // ... (style PaperProps của bạn giữ nguyên)
        style: {
          padding: '16px',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '90%',
          fontFamily: 'Aptos, sans-serif',
        },
      }}
    >
      <DialogTitle
        sx={{
          // ... (style DialogTitle của bạn giữ nguyên)
          padding: '0 0 16px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', color: '#000' }}
        >
          Set Record Result
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ color: '#757575' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: '0', overflowY: 'unset' }}>

        {/* 7. THAY ĐỔI LỚN: DÙNG .MAP() ĐỂ TẠO TRƯỜNG NHẬP LIỆU ĐỘNG */}
        {/* Xóa bỏ 3 <Box> tĩnh của "athur", "bethony", "cecile" */}
        {/* và thay bằng code lặp này: */}
        {athletes.map((athlete) => (
          <Box key={athlete.id} sx={{ marginBottom: '20px' }}>
            <Typography
              sx={{
                marginBottom: '8px',
                fontWeight: 'bold',
                color: '#757575',
              }}
            >
              {athlete.name} {/* Hiển thị tên VĐV (từ prop) */}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomTextField
                fullWidth
                placeholder="Enter measurement"
                variant="outlined"
                size="small"
                // Kết nối TextField với state nội bộ
                value={results[athlete.id] || ''} // Lấy giá trị từ state
                onChange={(e) => handleResultChange(athlete.id, e.target.value)} // Cập nhật state
              />
              <Typography
                sx={{
                  marginLeft: '8px',
                  color: '#757575',
                }}
              >
                {measurementUnit} {/* Hiển thị đơn vị (từ prop) */}
              </Typography>
            </Box>
          </Box>
        ))}
        {/* Kết thúc vòng lặp .map() */}


        {/* 8. CẬP NHẬT NÚT SAVE RESULT */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            // ... (style nút của bạn giữ nguyên)
            backgroundColor: '#1e6341',
            color: '#fff',
            padding: '12px',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#257951',
            },
          }}
          // THAY ĐỔI: onClick sẽ gọi hàm handleSaveClick
          // Hàm này sẽ gửi dữ liệu lên component cha
          onClick={handleSaveClick} 
        >
          Save Result
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RecordPopup;