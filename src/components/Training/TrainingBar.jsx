import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TrainingBar = () => {
    const [activeTab, setActiveTab] = useState('Strength');
    const navigate = useNavigate();
    const tabs = [
        { label: 'Strength', path: '/training/strength' },
        { label: 'Cardio', path: '/training/cardio' },
        { label: 'Team Training Log', path: '/training/team-training-log' }
    ];

    return (
        <Box
            display="flex"
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex={1000}
            width="100%"
            borderBottom="1px solid #ccc"
        >
            {tabs.map((tab) => (
                <Button
                    key={tab.label}
                    onClick={() => {
                        setActiveTab(tab.label);
                        navigate(tab.path);
                    }}
                    sx={{
                        flex: 1,
                        borderRadius: 0,
                        color: activeTab === tab.label ? '#fff' : '#4a5566',
                        backgroundColor: activeTab === tab.label ? '#257850' : '#fff',
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        height: '40px',
                    }}
                >
                    {tab.label}
                </Button>
            ))}
        </Box>
    );
};

export default TrainingBar;
