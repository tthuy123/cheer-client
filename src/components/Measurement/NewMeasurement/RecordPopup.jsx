import React from 'react';
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

// Component tùy chỉnh cho TextField giữ nguyên...
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
const RecordPopup = ({ open = true, handleClose = () => { } }) => {
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
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#000',
          }}
        >
          Set Record Result
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: '#757575',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: '0', overflowY: 'unset' }}>

        {/* Trường nhập liệu cho athur doccle */}
        <Box sx={{ marginBottom: '20px' }}>
          <Typography
            sx={{
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#757575',
            }}
          >
            athur doccle
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomTextField
              fullWidth
              placeholder="Enter measurement"
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#257951',
                    borderWidth: '2px',
                  },
                  '& fieldset': {
                    borderColor: '#257951',
                    borderWidth: '2px',
                  },
                },
              }}
            />
            <Typography
              sx={{
                marginLeft: '8px',
                color: '#757575',
              }}
            >
              minutes
            </Typography>
          </Box>
        </Box> {/* THẺ ĐÓNG CỦA BOX NÀY BỊ THIẾU TRONG ẢNH */}

        {/* Trường nhập liệu cho bethony cimon */}
        <Box sx={{ marginBottom: '20px' }}>
          <Typography
            sx={{
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#757575',
            }}
          >
            bethony cimon
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomTextField
              fullWidth
              placeholder="Enter measurement"
              variant="outlined"
              size="small"
            />
            <Typography
              sx={{
                marginLeft: '8px',
                color: '#757575',
              }}
            >
              minutes
            </Typography>
          </Box>
        </Box> {/* THẺ ĐÓNG CỦA BOX NÀY BỊ THIẾU TRONG ẢNH */}

        {/* Trường nhập liệu cho cecile cimon */}
        <Box sx={{ marginBottom: '30px' }}>
          <Typography
            sx={{
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#757575',
            }}
          >
            cecile cimon
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomTextField
              fullWidth
              placeholder="Enter measurement"
              variant="outlined"
              size="small"
            />
            <Typography
              sx={{
                marginLeft: '8px',
                color: '#757575',
              }}
            >
              minutes
            </Typography>
          </Box>
        </Box> {/* THẺ ĐÓNG CỦA BOX NÀY BỊ THIẾU TRONG ẢNH */}

        {/* Nút Save Result */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#1e6341',
            color: '#fff',
            padding: '12px',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#257951',
            },
          }}
          //           onClick={() => {
          //             console.log('Save Result clicked');
          //             handleClose();
          //           }}
          //         >
          //           Save Result
          //         </Button>
          //       </DialogContent> **{/* THẺ ĐÓNG CỦA DIALOGCONTENT BỊ THIẾU TRONG ẢNH */}**
          //     </Dialog> **{/* THẺ ĐÓNG CỦA DIALOG BỊ THIẾU TRONG ẢNH */}**
          //   );
          // };

          onClick={() => {
            // Xử lý lưu kết quả
            console.log('Save Result clicked');
            handleClose();
          }}
        >
          Save Result
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default RecordPopup;