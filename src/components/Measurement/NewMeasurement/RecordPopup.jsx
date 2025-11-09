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

// ---- Helpers
const isMinutesUnit = (unit) =>
  !!unit && ['minute', 'minutes', 'min', 'mins'].includes(String(unit).toLowerCase().trim());

/**
 * Kiểm tra input theo unit.
 * minutes:
 *  - Cho phép: "m" | "mm:ss" | "h:mm:ss"
 *  - Ràng buộc: 0 <= mm <= 60, 0 <= ss <= 60, nếu chỉ "m" thì 0 <= m <= 60
 * others:
 *  - Chỉ số (có thể thập phân)
 * Trả về { ok: boolean, message: string|null }
 */
function validateByUnit(input, unit) {
  const val = (input ?? '').toString().trim();
  if (val === '') return { ok: false, message: 'Vui lòng nhập giá trị.' };

  if (isMinutesUnit(unit)) {
    // minutes mode
    const parts = val.split(':').map((p) => p.trim());

    // chỉ "m"
    if (parts.length === 1) {
      const m = Number(parts[0]);
      if (!Number.isFinite(m)) return { ok: false, message: 'Chỉ nhập số phút hoặc mm:ss / h:mm:ss.' };
      if (m < 0 || m > 60) return { ok: false, message: 'Phút phải trong khoảng 0–60.' };
      return { ok: true, message: null };
    }

    // "mm:ss"
    if (parts.length === 2) {
      const m = Number(parts[0]);
      const s = Number(parts[1]);
      if (![m, s].every(Number.isFinite)) {
        return { ok: false, message: 'Định dạng không hợp lệ. Dùng mm:ss (vd: 12:30).' };
      }
      if (m < 0 || m >= 60) return { ok: false, message: 'Phần phút (mm) phải 0–59.' };
      if (s < 0 || s >= 60) return { ok: false, message: 'Phần giây (ss) phải 0–59.' };
      return { ok: true, message: null };
    }

    // "h:mm:ss"
    if (parts.length === 3) {
      const h = Number(parts[0]);
      const m = Number(parts[1]);
      const s = Number(parts[2]);
      if (![h, m, s].every(Number.isFinite)) {
        return { ok: false, message: 'Định dạng không hợp lệ. Dùng h:mm:ss (vd: 1:05:30).' };
      }
      if (h < 0) return { ok: false, message: 'Giờ (h) không được âm.' };
      if (m < 0 || m >= 60) return { ok: false, message: 'Phần phút (mm) phải 0–59.' };
      if (s < 0 || s >= 60) return { ok: false, message: 'Phần giây (ss) phải 0–59.' };
      return { ok: true, message: null };
    }

    return { ok: false, message: 'Định dạng không hợp lệ. Dùng m | mm:ss | h:mm:ss.' };
  }

  // unit khác
  const num = Number(val);
  if (!Number.isFinite(num)) return { ok: false, message: 'Chỉ nhập số.' };
  return { ok: true, message: null };
}

// Component chính
// 2. THAY ĐỔI PROPS: Thêm 'athletes', 'onSave', 'measurementUnit', (tùy chọn) 'isSaving'
const RecordPopup = ({
  open,
  handleClose,
  athletes = [], // Mảng các VĐV (vd: [{id, name}, ...])
  onSave,        // Hàm để gửi dữ liệu về
  measurementUnit = 'units', // Đơn vị đo
  isSaving = false,          // Khoá nút khi đang lưu (nếu parent truyền)
}) => {
  // 3. STATE NỘI BỘ
  const [results, setResults] = useState({});
  const [errors, setErrors] = useState({}); // { athleteId: 'message' | undefined }

  // 4. XỬ LÝ NHẬP LIỆU + VALIDATE NGAY
  const handleResultChange = (athleteId, value) => {
    setResults((prev) => ({ ...prev, [athleteId]: value }));

    const { ok, message } = validateByUnit(value, measurementUnit);
    setErrors((prev) => ({ ...prev, [athleteId]: ok ? undefined : message }));
  };

  // 5. NÚT SAVE — DISABLE nếu còn lỗi hoặc ô trống
  const hasAnyError = Object.values(errors).some((msg) => !!msg);
  const hasAnyEmpty = athletes.some((a) => (results[a.id] ?? '').toString().trim() === '');

  const canSave = !hasAnyError && !hasAnyEmpty && athletes.length > 0 && !isSaving;

  // 6. SAVE
  const handleSaveClick = () => {
    // Double-check phía trước
    if (!canSave) return;

    const resultsArray = athletes.map((a) => ({
      athleteId: a.id,
      value: results[a.id],
    }));

    if (onSave) onSave(resultsArray);
  };

  // 7. DỌN DẸP KHI ĐÓNG
  useEffect(() => {
    if (!open) {
      setResults({});
      setErrors({});
    }
  }, [open]);

  // Gợi ý placeholder theo unit
  const placeholder =
    isMinutesUnit(measurementUnit)
      ? 'm | mm:ss | h:mm:ss (mm, ss < 60)'
      : 'Enter number';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
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
          padding: '0 0 16px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
          Set Record Result
        </Typography>
        <IconButton aria-label="close" onClick={handleClose} sx={{ color: '#757575' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: 0, overflowY: 'unset' }}>
        {athletes.map((athlete) => {
          const value = results[athlete.id] ?? '';
          const errMsg = errors[athlete.id];
          return (
            <Box key={athlete.id} sx={{ marginBottom: '20px' }}>
              <Typography sx={{ marginBottom: '8px', fontWeight: 'bold', color: '#757575' }}>
                {athlete.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CustomTextField
                  fullWidth
                  placeholder={placeholder}
                  variant="outlined"
                  size="small"
                  value={value}
                  onChange={(e) => handleResultChange(athlete.id, e.target.value)}
                  error={!!errMsg}
                  helperText={errMsg || ' '}
                  inputProps={{
                    // Một chút hạn chế nhẹ nhàng giúp người dùng đỡ nhập ký tự lạ
                    inputMode: isMinutesUnit(measurementUnit) ? 'text' : 'decimal',
                    pattern: isMinutesUnit(measurementUnit)
                      ? undefined // cho phép ":" trong minutes mode
                      : '[0-9]*[.,]?[0-9]*',
                  }}
                />
                <Typography sx={{ marginLeft: '8px', color: '#757575' }}>
                  {measurementUnit}
                </Typography>
              </Box>
            </Box>
          );
        })}

        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: canSave ? '#1e6341' : '#9fb3a9',
            color: '#fff',
            padding: '12px',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: canSave ? '#257951' : '#9fb3a9',
            },
          }}
          onClick={handleSaveClick}
          disabled={!canSave}
        >
          {isSaving ? 'Saving…' : 'Save Result'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RecordPopup;
