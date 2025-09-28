import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    return (
        <Box
            sx={{
                width: {
                    xs: '100%',   // mobile: full width
                    sm: '100%',    // tablet
                    md: '800px'   // desktop
                },
                mx: 'auto',     // căn giữa
                mt: 2,          // margin top
                
            }}
        >
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search programs..."
                size="medium"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon
                                sx={{
                                    color: 'grey.500',
                                    
                                }}
                            />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                            borderColor: '#e6e6e8', // mặc định xám
                        },
                        '&:hover fieldset': {
                            borderColor: 'grey.600', // hover xám đậm
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#2e7d32',  // khi focus đổi xanh
                            borderWidth: 2,
                        },
                    },
                }}
            />
        </Box>
    );
};

export default SearchBar;
