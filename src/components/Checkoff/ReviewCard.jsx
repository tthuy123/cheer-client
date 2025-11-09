'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  styled,
} from '@mui/material';

import { useSelector } from 'react-redux';
import Checkoff from '../../api/modules/checkoff.api';

// 1) CustomTextField giữ nguyên
const CustomTextField = styled(TextField)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    fontFamily: 'Aptos, sans-serif',
    borderRadius: '8px',
    '& fieldset': { borderColor: '#a0a0a0' },
    '&:hover fieldset': { borderColor: '#757575' },
    '&.Mui-focused fieldset': { borderColor: '#257951', borderWidth: '2px' },
    '& .MuiInputBase-input': { fontFamily: 'Aptos, sans-serif', color: '#333' },
    '& .MuiInputBase-input.Mui-disabled': {
      backgroundColor: '#f4f4f4',
      color: '#555',
      WebkitTextFillColor: '#555',
    },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e0e0e0' },
  },
  '& .MuiInputBase-input::placeholder': { color: '#a0a0a0', opacity: 1 },
});

// 2) StyledToggleButton giữ nguyên
const StyledToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== 'selectedColor',
})(({ selectedColor }) => ({
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
    backgroundColor: selectedColor || '#257951',
    '&:hover': {
      backgroundColor: selectedColor === '#dc2626' ? '#b91c1c' : '#1e6341',
    },
  },
}));

const defaultData = {
  id: 'default',
  athleteName: 'Loading...',
  taskName: 'Loading...',
  athleteNotes: 'Loading notes...',
  videoUrl: '',
};

export default function ReviewCard({ reviewData = defaultData }) {
  const coachId = useSelector((s) => s.auth.user_id);
  const token = useSelector((s) => s.auth.token);

  const [status, setStatus] = useState(null); // 'completed' | 'not-completed'
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);

  // NEW: Ẩn card sau khi lưu thành công
  const [visible, setVisible] = useState(true);

  const handleStatusChange = (_e, newStatus) => {
    if (newStatus !== null) setStatus(newStatus);
  };

  const handleSave = async () => {
    if (!coachId) {
      alert('Thiếu coach_id. Vui lòng đăng nhập lại.');
      return;
    }
    if (!status) {
      alert('Vui lòng chọn trạng thái (Completed/Not Completed).');
      return;
    }

    // Map sang 1/0 cho backend
    const numericStatus = status === 'completed' ? 1 : 0;

    const payload = {
      coachId: coachId,                  // chú ý key: khớp backend controller
      status: numericStatus,             // 1 = completed, 0 = not completed
      comment: (feedback || '').trim() || null,
    };

    try {
      setSaving(true);
      const res = await Checkoff.addCoachComment(reviewData.id, payload, token);
      console.log('Response from addCoachComment:', res);

      if (res) {
        alert('Lưu review thành công!');
        // Ẩn card ngay sau khi lưu
        setVisible(false);
      } else {
        alert(res?.data?.error || 'Lưu review thất bại.');
      }
    } catch (err) {
      console.error('Lỗi lưu review:', err);
      alert('Đã xảy ra lỗi khi lưu review.');
    } finally {
      setSaving(false);
    }
  };

  // Nếu đã ẩn thì không render gì nữa
  if (!visible) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        maxWidth: '800px',
        mb: 4,
        mx: 'auto',
        borderRadius: '8px',
        overflow: 'hidden',
        fontFamily: 'Aptos, sans-serif',
      }}
    >
      {/* 1. Video */}
      <Box sx={{ position: 'relative', width: '100%', paddingTop: '56.25%', backgroundColor: '#000' }}>
        <video
          controls
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          src={reviewData.videoUrl}
        >
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
      </Box>

      {/* 2. Info + nhập liệu */}
      <Box sx={{ p: 3, backgroundColor: '#ffffff' }}>
        <Box sx={{ display: 'flex', mb: 1.5, alignItems: 'left' }}>
          <Typography sx={{ fontWeight: 'bold', minWidth: '150px' }}>Athlete:</Typography>
          <Typography>{reviewData.athleteName}</Typography>
        </Box>

        <Box sx={{ display: 'flex', mb: 1.5, alignItems: 'left' }}>
          <Typography sx={{ fontWeight: 'bold', minWidth: '150px' }}>Check-Off Task:</Typography>
          <Typography>{reviewData.taskName}</Typography>
        </Box>

        <Box sx={{ display: 'flex', mb: 1.5, alignItems: 'left' }}>
          <Typography sx={{ fontWeight: 'bold', minWidth: '150px' }}>Athlete&apos;s Notes:</Typography>
          <Typography sx={{ textAlign: 'left' }}>{reviewData.athleteNotes}</Typography>
        </Box>

        {/* 3. Status */}
        <ToggleButtonGroup
          value={status}
          exclusive
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
            selectedColor="#dc2626"
          >
            Not Completed
          </StyledToggleButton>
        </ToggleButtonGroup>

        {/* 4. Feedback */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Coach&apos;s feedback:</Typography>
          <CustomTextField
            placeholder="Enter check off feedback..."
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)} // FIX typo
          />
        </Box>

        {/* 5. Save */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleSave}
          disabled={!status || saving}
          sx={{
            backgroundColor: '#1e6341',
            color: 'white',
            fontSize: '15px',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: '10px',
            padding: '10px',
            '&:hover': { backgroundColor: '#257951' },
            '&.Mui-disabled': { backgroundColor: '#a0a0a0', color: '#f5f5f5' },
          }}
        >
          {saving ? 'Saving...' : 'Save Review'}
        </Button>
      </Box>
    </Paper>
  );
}
