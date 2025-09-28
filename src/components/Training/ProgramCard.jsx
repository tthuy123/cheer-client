import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    Button
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const ProgramList = () => {
    const programs = [
        {
            id: 1,
            title: 'Base Overhead Day 1',
            description: 'Exercises: Push Press, Shoulder Press, Standing Lateral Flexion with Overhead Resistance, Unilateral Overhead Carry'
        },
        {
            id: 2,
            title: 'Strength Training Day 2',
            description: 'Exercises: Deadlift, Squat, Bench Press, Bent-over Row'
        }
    ];

    const ProgramCard = ({ title, description }) => {
        return (
            <Card
                sx={{
                    maxWidth: 800,
                    mx: 'auto',
                    mt: 2,
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid',
                    borderColor: '#e6e6e8', // Màu xám grey.400
                }}
            >
                <CardContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    {/* Left content */}
                    <Box>
                        <Typography
                            variant="body1"
                            fontSize={'18px'}
                            fontWeight="bold"
                            color="#101829"
                            gutterBottom
                            align="left"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body2"
                            fontSize={'15px'}
                            color="#4a5566"
                            align="left"
                        >
                            {description}
                        </Typography>
                    </Box>

                    {/* Right content */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: 10,
                        }}
                    >
                        {/* Copy icon */}
                        <IconButton size="small" sx={{ color: '#4a5566' }}>
                            <ContentCopyIcon fontSize="small" />
                        </IconButton>

                        {/* Start button */}
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<PlayArrowIcon />}
                            sx={{
                                color: '#257850',
                                borderColor: '#257850',
                                textTransform: 'none',
                                borderRadius: '6px',
                            }}
                        >
                            Start
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        );
    };

    return (
        <>
            {programs.map(p => (
                <ProgramCard
                    key={p.id}
                    title={p.title}
                    description={p.description}
                />
            ))}
        </>
    );
};

export default ProgramList;