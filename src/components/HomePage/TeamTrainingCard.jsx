import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

const TeamCheckOffCard = () => {
    return (
        <Card
            sx={{
                maxWidth: 800,
                margin: 2,
                mx: 'auto',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#ffffff'
            }}
        >
            <CardContent sx={{ padding: 3 }}>
                <Typography
                    variant="body1"
                    component="p"
                    sx={{
                        fontWeight: 500,
                        color: '#4a5566',
                        marginBottom: 2,
                        textAlign: 'left'
                    }}
                >
                    Team Training Averages
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography
                                variant="body2"
                                component="p"
                                sx={{
                                    fontWeight: 550,
                                    color: '#4a5566',
                                    marginBottom: 0.5,
                                    
                                }}
                            >
                                Strength
                            </Typography>
                            <Typography
                                variant="h3"
                                component="div"
                                sx={{
                                    fontWeight: 600,
                                    color: '#257850',
                                    marginBottom: 0.5,
                                    fontSize: '2rem'
                                }}
                            >
                                1
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#6b7282',
                                    fontWeight: 400
                                }}
                            >
                                Days per week
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography
                                variant="body2"
                                component="p"
                                sx={{
                                    fontWeight: 550,
                                    color: '#4a5566',
                                    marginBottom: 0.5,

                                }}
                            >
                                Cardio
                            </Typography>
                            <Typography
                                variant="h3"
                                component="div"
                                sx={{
                                    fontWeight: 600,
                                    color: '#257850',
                                    marginBottom: 0.5,
                                    fontSize: '2rem'
                                }}
                            >
                                0
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#6b7282',
                                    fontWeight: 400
                                }}
                            >
                                Minutes per week
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default TeamCheckOffCard;