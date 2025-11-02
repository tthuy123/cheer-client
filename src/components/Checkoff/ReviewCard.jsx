'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper, // Dùng Paper để tạo hiệu ứng "card"
  ToggleButton,
  ToggleButtonGroup,
  styled,
} from '@mui/material';

// 1. TÁI SỬ DỤNG CustomTextField từ code trước
const CustomTextField = styled(TextField)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    fontFamily: 'Aptos, sans-serif', 
    borderRadius: '8px', 
    '& fieldset': { borderColor: '#a0a0a0' },
    '&:hover fieldset': { borderColor: '#757575' },
    '&.Mui-focused fieldset': {
      borderColor: '#257951', 
      borderWidth: '2px',
    },
    // Style cho text bên trong
    '& .MuiInputBase-input': {
      fontFamily: 'Aptos, sans-serif',
      color: '#333',
    },
    // Style cho text của
    '& .MuiInputBase-input.Mui-disabled': {
      backgroundColor: '#f4f4f4', // Nền xám nhạt khi bị vô hiệu hóa
      color: '#555', // Màu chữ đậm hơn cho dễ đọc
      WebkitTextFillColor: '#555', // Ghi đè màu cho Safari
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e0e0e0', // Border nhạt hơn khi bị vô hiệu hóa
    },
  },
  '& .MuiInputBase-input::placeholder': { color: '#a0a0a0', opacity: 1 },
});

// 2. TÙY CHỈNH ToggleButton
// SỬA ĐỔI: Thêm { shouldForwardProp } và nhận prop 'selectedColor'
const StyledToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== 'selectedColor',
})(({ theme, selectedColor }) => ({
  flex: 1,
  fontFamily: 'Aptos, sans-serif',
  textTransform: 'none',
  fontWeight: 'bold',
  color: '#757575',
  backgroundColor: '#fff',
  border: '1px solid #a0a0a0 !important',
  borderRadius: '8px !important',
  '&.Mui-selected': {
    color: 'white',
    // SỬA ĐỔI: Dùng màu được truyền vào, nếu không thì dùng màu xanh lá
    backgroundColor: selectedColor || '#257951',
    '&:hover': {
      // SỬA ĐỔI: Làm tối màu dựa trên màu được chọn
      backgroundColor: selectedColor === '#dc2626' ? '#b91c1c' : '#1e6341',
    }
  },
}));

// SỬA LỖI: Cung cấp một giá trị mặc định để tránh lỗi khi prop không được truyền
const defaultData = {
  id: 'default',
  athleteName: 'Loading...',
  taskName: 'Loading...',
  athleteNotes: 'Loading notes...',
  videoUrl: '', // URL rỗng để tránh lỗi video
};

/**
 * Component hiển thị 1 card review
 * @param {object} reviewData - Dữ liệu cho 1 bài nộp
 */
// SỬA LỖI: Thêm `reviewData = defaultData`
export default function ReviewCard({ reviewData = defaultData }) {
  // State nội bộ cho card này
  const [status, setStatus] = useState(null); // 'completed', 'not-completed', 'excused'
  const [feedback, setFeedback] = useState('');

  const handleStatusChange = (event, newStatus) => {
    // newStatus có thể là null nếu nhấn lại nút đang chọn
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };

  const handleSave = () => {
    const reviewResult = {
      submissionId: reviewData.id,
      status: status,
      feedback: feedback,
    };
    console.log("Đang lưu review:", reviewResult);
    // TODO: Gọi API để lưu kết quả này
  };

  return (
    // Dùng Paper để có viền và bóng đổ
    <Paper 
      elevation={3} 
      sx={{ 
        width: '100%', 
        maxWidth: '800px', // Rộng hơn form
        mb: 4, // Khoảng cách giữa các card
        mx: 'auto',
        borderRadius: '8px',
        overflow: 'hidden', // Đảm bảo video bo góc
        fontFamily: 'Aptos, sans-serif',
      }}
    >
      {/* 1. Video Player (Responsive) */}
      <Box sx={{ 
        position: 'relative', 
        width: '100%', 
        paddingTop: '56.25%', // 16:9
        backgroundColor: '#000'
      }}>
        <video 
          controls 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          src={reviewData.videoUrl} // Dùng URL từ data
        >
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
      </Box>

      {/* 2. Phần thông tin và nhập liệu */}
      <Box sx={{ p: 3, backgroundColor: '#ffffff' }}>
        
        {/* Thông tin cố định */}
        <Box sx={{ display: 'flex', mb: 1.5, alignItems: 'left' }}>
          <Typography sx={{ fontWeight: 'bold', minWidth: '150px', fontFamily: 'Aptos, sans-serif' }}>
            Athlete:
          </Typography>
          <Typography sx={{ fontFamily: 'Aptos, sans-serif' }}>
            {reviewData.athleteName}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', mb: 1.5, alignItems: 'left' }}>
          <Typography sx={{ fontWeight: 'bold', minWidth: '150px', fontFamily: 'Aptos, sans-serif' }}>
            Check-Off Task:
          </Typography>
          <Typography sx={{ fontFamily: 'Aptos, sans-serif' }}>
            {reviewData.taskName}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', mb: 1.5, alignItems: 'left' }}>
          <Typography sx={{ fontWeight: 'bold', minWidth: '150px', fontFamily: 'Aptos, sans-serif'}}>
            Athlete's Notes:
          </Typography>
          <Typography sx={{ fontFamily: 'Aptos, sans-serif' , textAlign: 'left'}}>
            {reviewData.athleteNotes}
          </Typography>
        </Box>

        {/* <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Aptos, sans-serif' }}>
            Athlete's Notes:
          </Typography>
          <CustomTextField
            disabled // Chỉ đọc
            multiline
            rows={3}
            value={reviewData.athleteNotes}
          />
        </Box> */}
        
        {/* 3. Các nút chọn Status (dùng ToggleButtonGroup) */}
        <ToggleButtonGroup
          value={status}
          exclusive // Đảm bảo chỉ chọn 1
          onChange={handleStatusChange}
          aria-label="Review Status"
          sx={{ display: 'flex', gap: '10px', mb: 3 }}
        >
          <StyledToggleButton value="completed" aria-label="Completed">
            Completed
          </StyledToggleButton>
          <StyledToggleButton 
            value="not-completed" 
            aria-label="Not Completed"
            selectedColor="#dc2626" // SỬA ĐỔI: Truyền màu đỏ
          >
            Not Completed
          </StyledToggleButton>
          {/* SỬA ĐỔI: Đã xóa nút "Excused" */}
        </ToggleButtonGroup>

        {/* 4. Ô nhập Feedback */}
        <Box sx={{ mb: 3 }}>
          {/* SỬA ĐỔI: Thêm label "Coach's feedback" */}
          <Typography sx={{ fontWeight: 'bold', mb: 1, fontFamily: 'Aptos, sans-serif' }}>
            Coach's feedback:
          </Typography>
          <CustomTextField
            placeholder="Enter check off feedback..."
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.gexittarget.value)}
          />
        </Box>

        {/* 5. Nút Save Review */}
        <Button 
          variant="contained" 
          fullWidth
          onClick={handleSave}
          disabled={!status} // Chỉ bật nút khi đã chọn 1 status
          sx={{ 
            backgroundColor: "#1e6341", // Màu xanh đậm
            color: "white", 
            fontSize: "15px", 
            fontWeight: "bold", 
            textTransform: "none", 
            borderRadius: "10px", 
            padding: "10px",
            '&:hover': {
              backgroundColor: '#257951' // Màu xanh lá
            },
            '&.Mui-disabled': {
              backgroundColor: '#a0a0a0', // Màu xám khi bị vô hiệu hóa
              color: '#f5f5f5'
            }
          }}
        >
          Save Review
        </Button>

      </Box>
    </Paper>
  );
}

