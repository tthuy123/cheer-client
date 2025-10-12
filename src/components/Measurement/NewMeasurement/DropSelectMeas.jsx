    import * as React from 'react';
    import { FormControl, InputLabel, Select, MenuItem, Box, FormHelperText } from '@mui/material';
    import { color, styled } from '@mui/system';
    import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
    import CheckIcon from '@mui/icons-material/Check';

    // 1. Tạo Styled Components để tùy chỉnh giao diện
    const CustomFormControl = styled(FormControl)({
    minWidth: 320,
    '& .MuiInputLabel-root': {
        fontSize: '0.875rem',
        transform: 'translate(14px, -9px) scale(0.75)', // Di chuyển label lên trên
        '&.Mui-focused': {
        color: 'rgba(0, 0, 0, 0.6)', // Giữ màu label khi focus
        },
        '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -9px) scale(0.75)', // Giữ label ở trên khi đã chọn
        },
    },
    });

    const CustomSelect = styled(Select)(({ theme }) => ({
    // Loại bỏ viền ngoài (fieldset) mặc định của OutlinedInput
    '& .MuiOutlinedInput-notchedOutline': {
        border: `1px solid`,
        borderRadius: 8,
    },
    // Tùy chỉnh khi hover
    '&:hover .MuiOutlinedInput-notchedOutline': {
    },
    // Tùy chỉnh khi focus
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        // borderColor: theme.palette.primary.main, // Màu xanh khi focus
        borderWidth: 1,
    },
    // Tùy chỉnh phần tử hiển thị giá trị đã chọn
    '& .MuiSelect-select': {
        padding: '8px 16px',
        minHeight: '1.5em',
        lineHeight: 1.5,
        fontSize: '0.875rem',
    },
    // Tùy chỉnh icon dropdown
    '& .MuiSelect-icon': {
        right: 10,
        fontSize: '1rem',
    },
    }));

    // 2. Component chính
    export default function DropSelectMeas() {
    const [measurement, setMeasurement] = React.useState('');

    const options = [
        '1 Mile Time',
        '2 Mile Time',
        '40 Yard Dash',
        '400m Time',
        'Bench Press - 1 Rep Max',
        'Bench Press - 10 Rep Max',
        'Deadlift - 1 Rep Max',
        'Deadlift - 10 Rep Max',
        'Dumbbell Goblet Squat + Press',
        'Forward Triple Hop - Left',
        'Forward Triple Hop - Right',
    ];

    const handleChange = (event) => {
        setMeasurement(event.target.value);
    };

    return (
        <Box sx={{ p: 3, backgroundColor: 'white' }}>
        <CustomFormControl variant="outlined">
            {/* InputLabel được sử dụng như label riêng bên ngoài form control để giống ảnh */}
            <InputLabel 
                shrink 
                htmlFor="measurement-select" 
                sx={{ 
                    position: 'static',
                    transform: 'none', 
                    marginBottom: '0px', 
                    marginLeft: '-12px',
                    color: 'rgba(0, 0, 0, 0.6)', 
                    fontSize: '1rem', textAlign: 'left',
                    fontWeight: 1000
                }}
            >
                Select Measurement
            </InputLabel>

            {/* Component Select */}
            <CustomSelect
            labelId="measurement-select-label"
            id="measurement-select"
            value={measurement}
            onChange={handleChange}
            IconComponent={KeyboardArrowDownIcon} // Sử dụng icon mũi tên xuống
            renderValue={(selected) => (
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'rgba(0, 0, 0, 0.87)', fontWeight: 600 }}>

                {selected}
                </Box>
            )}
            // Props cho MenuProps để tùy chỉnh Listbox
            MenuProps={{
                PaperProps: {
                sx: {
                    borderRadius: 2, // Border-radius cho menu
                    mt: 1, // Khoảng cách với button
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    minWidth: '320px !important'
                },
                },
                MenuListProps: {
                    sx: {
                        padding: '8px 0', // Padding bên trong Listbox
                    }
                }
            }}
            >
            {options.map((option) => (
                <MenuItem 
                key={option} 
                value={option}
                sx={{
                    fontSize: '0.875rem',
                    padding: '8px 16px',
                    justifyContent: 'space-between', // Để CheckIcon nằm ở bên phải
                    '&.Mui-selected': {
                backgroundColor: '#f4f4f5', // Màu xanh đậm khi selected
                        color: 'rgba(0, 0, 0, 0.87)', // Màu đen cho text khi selected

                        fontWeight: 600,
                        '&:hover': {
                        backgroundColor: '#f4f4f5', // Giữ màu khi hover trên selected

                        }
                    },
                    '&:hover': {
                        backgroundColor: '#e0e0e0', // Màu xám nhạt khi hover (có thể điều chỉnh)
                    }
                }}
                >
                {option}
                {/* Hiển thị CheckIcon nếu là item được chọn */}
                {measurement === option && <CheckIcon sx={{ fontSize: '1.1rem', color: '#f4f4f5' }} />}
                </MenuItem>
            ))}
            </CustomSelect>
        </CustomFormControl>
        </Box>
    );
    }