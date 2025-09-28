import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Divider,
    IconButton,
    Chip,
    Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AlertCard = () => {
    // Sample data - you can replace this with props or state
    const pastDueCheckOffs = [
        { id: 1, name: 'Nhung Hong', type: 'asd', due: '09/19/2025' },
        { id: 2, name: 'Taylor nguyen', type: 'asd', due: '09/19/2025' },
        { id: 3, name: 'Quan Nguyen', type: 'asd', due: '09/19/2025' }
    ];

    const recentMeasurements = [
        { id: 1, name: 'Quan Nguyen', test: '1 Mile Time', duration: '33:00 minutes' },
        { id: 2, name: 'Taylor nguyen', test: '1 Mile Time', duration: '33:00 minutes' }
    ];

    const handleClose = (id, type) => {
        console.log(`Closing ${type} item with id: ${id}`);
        // Add your close logic here
    };

    return (
        <Card sx={{
            maxWidth: 800,
            mx: 'auto',
            mt: 2,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
                <Typography variant="body1" component="p" gutterBottom fontWeight="bold" align="left">
                    Alerts
                </Typography>

                {/* Past-Due Check-Offs Section */}
                <Box sx={{ mb: 4  }}>
                    <Typography
                        variant="body2"
                        sx={{ color: '#e8000c', fontWeight: 'medium', mb: 1 }}
                        align="left"
                    >
                        Past-Due Check-Offs
                    </Typography>

                    <Stack spacing={1}>
                        {pastDueCheckOffs.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: "flex-start",   // căn trên cùng
                                    p: 2,
                                    backgroundColor: '#fff2f2',
                                    borderRadius: "6px",
                                    borderLeft: "3px solid #e8000c", // chỉ viền bên trái
                                }}
                            >
                                <Box>
                                    <Typography variant="body2" fontWeight="medium" align="left">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="#4a5566" align="left">
                                        {item.type}
                                    </Typography>
                                    <Typography fontSize="13px" sx={{ color: '#e8000c' }} align="left">
                                        Due: {item.due}
                                    </Typography>
                                </Box>
                                <IconButton
                                    size="small"
                                    onClick={() => handleClose(item.id, 'pastDue')}
                                    sx={{ color: '#e8000c' }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        ))}
                    </Stack>
                </Box>

                {/* Submitted Check-Offs Section */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="body2"
                        sx={{ color: '#00a63d', fontWeight: 'medium', mb: 1 }}
                        align="left"
                    >
                        Submitted Check-Offs
                    </Typography>

                    <Box sx={{
                        p: 2,
                        textAlign: 'center'
                    }}>
                        <Typography variant="subtitle1" color="#6b7282">
                            No submitted check-offs.
                        </Typography>
                    </Box>
                </Box>


                {/* Recent Measurements Section */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{ color: '#2166fc', fontWeight: 'medium', mb: 1 }}
                        align="left"
                    >
                        Recent Measurements
                    </Typography>

                    <Stack spacing={1}>
                        {recentMeasurements.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    p: 2,
                                    backgroundColor: '#f0f6ff',
                                    borderRadius: "6px",
                                    borderLeft: "3px solid #2166fc", // chỉ viền bên trái
                                }}
                            >
                                <Box>
                                    <Typography variant="body2" fontWeight="medium" align="left">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="#4a5566" align="left">
                                        {item.test}
                                    </Typography>
                                    <Typography fontSize="13px" sx={{ color: '#2166fc' }} align="left">
                                        {item.duration}
                                    </Typography>
                                </Box>
                                <IconButton
                                    size="small"
                                    onClick={() => handleClose(item.id, 'measurement')}
                                    sx={{ color: '#2166fc' }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AlertCard;