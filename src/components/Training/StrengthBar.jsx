import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

const StrengthBar = () => {
    const [activeSubTab, setActiveSubTab] = useState('Cheer Trainer');
    const strengthSubTabs = ['Cheer Trainer', 'Team Programs', 'My Programs'];

    return (
        <Box
            display="flex"
            justifyContent="center"  // 👈 căn giữa
            position="fixed"
            top="40px"  // nằm ngay dưới thanh chính
            left={0}
            right={0}
            zIndex={999}
            width="100%"
            boxShadow="0px 1px 2px rgba(0,0,0,0.1)"
            bgcolor="#fff"
        >
            {strengthSubTabs.map((sub) => (
                <Button
                    key={sub}
                    onClick={() => setActiveSubTab(sub)}
                    sx={{
                        borderRadius: 0,
                        color: activeSubTab === sub ? '#257850' : '#71717a', // chỉ đổi màu chữ
                        backgroundColor: '#fff', // nền luôn trắng
                        fontWeight: activeSubTab === sub ? 'normal' : 'normal',
                        fontSize: activeSubTab === sub ? '1.1rem' : '1.1rem',
                        textTransform: 'none',
                        height: '40px',
                        mx: 2, // khoảng cách ngang giữa các nút
                    
                    }}
                >
                    {sub}
                </Button>
            ))}
        </Box>
    );
};

export default StrengthBar;
