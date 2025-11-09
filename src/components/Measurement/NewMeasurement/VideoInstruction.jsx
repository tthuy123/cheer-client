import * as React from 'react';
import { Box, Typography } from '@mui/material';

export default function VideoInstruction({
  videoUrl,
  description,
  steps,
  posterUrl, // thêm poster từ API
}) {
  const defaultVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
  const defaultDescription =
    "This test evaluates key physical capacity and helps track improvements over time.";
  const defaultSteps = [
    "Prepare the test area and safety check.",
    "Warm up 10–15 minutes with dynamic movements.",
    "Follow standard test protocol and record accurately.",
  ];

  const finalVideoUrl = videoUrl || defaultVideoUrl;
  const finalDescription = description || defaultDescription;
  const finalSteps = Array.isArray(steps) && steps.length > 0 ? steps : defaultSteps;

  return (
    <Box 
      sx={{ 
        maxWidth: 900,
        mx: 'auto',
        p: { xs: 2, md: 4 },
        backgroundColor: 'white',
        textAlign: 'left',
        borderRadius: 2,
        border: '1px solid #eee'
      }}
    >
      {/* Video 16:9 */}
      <Box sx={{ position: 'relative', width: '100%', pt: '56.25%', mb: 3 }}>
        <video 
          controls 
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            borderRadius: 8, objectFit: 'cover', border: '1px solid #ddd'
          }}
          src={finalVideoUrl}
          title="Instructional Video"
          poster={posterUrl || "https://placehold.co/800x450/e0e0e0/38a169?text=Video+Placeholder"}
        >
          Your browser does not support the video tag.
        </video>
      </Box>

      {/* Instructions */}
      <Typography 
        variant="h6" 
        component="h4" 
        sx={{ fontWeight: 600, fontSize: '1rem', mb: 1, color: '#333' }}
      >
        Instructions:
      </Typography>

      {/* Description */}
      <Typography 
        variant="body1" 
        sx={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#444', mb: 3 }}
      >
        {finalDescription}
      </Typography>

      {/* How to Perform */}
      <Typography 
        variant="subtitle1" 
        component="h5" 
        sx={{ fontWeight: 600, fontSize: '1rem', mb: 1, color: '#333' }}
      >
        How to Perform:
      </Typography>

      {/* Steps */}
      <Box component="ol" sx={{ listStyleType: 'decimal', pl: 3, fontSize: '0.95rem', color: '#444' }}>
        {finalSteps.map((step, idx) => (
          <Box component="li" key={idx} sx={{ mb: 1, lineHeight: 1.6 }}>
            {step}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
