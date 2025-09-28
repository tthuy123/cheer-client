// CreateCard.jsx (phiên bản đơn giản)
import React, { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const CreateCard = ({ onClick }) => {
    const [selected, setSelected] = useState(false);

    const handleClick = () => {
        setSelected(!selected);
        if (onClick) onClick();
    };

    return (
        <Card
            onClick={handleClick}
            sx={{
                maxWidth: 800,
                mx: 'auto',
                mt: 5,
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '2px dashed',
                borderColor: '#e6e6e8', // Giữ nguyên màu viền
                cursor: "pointer",
                bgcolor: selected ? '#fffff' : 'grey.100', // Chỉ background thành xám khi selected
                transition: "background-color 0.3s ease", // Chỉ transition background
                textAlign: "center",
                "&:hover": {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
            }}
        >
            <CardContent sx={{ py: 2}}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <AddIcon sx={{ color: '#08080a', mr: 1}} /> {/* Giữ nguyên màu icon */}
                    <Typography
                        variant="body2"
                        fontSize={'15px'}
                        fontWeight="bold"
                        color="#08080a" // Giữ nguyên màu text
                    >
                        Create New Program
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CreateCard;