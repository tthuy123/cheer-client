import * as React from 'react';
import { Box, Typography } from '@mui/material';

// --- Interface (Mô phỏng Props) ---
// interface VideoInstructionProps {
//   videoUrl: string; 
//   description: string; 
//   steps: string[]; 
// }

// --- Component chính ---
export default function VideoInstruction({
  videoUrl,
  description,
  steps,
}) {
  
  // Dữ liệu giả định nếu props không được truyền (chỉ để đảm bảo component hiển thị)
  const defaultVideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";
  const defaultDescription = "The 1 Mile Time test measures the athlete's aerobic capacity and cardiovascular endurance - a key indicator of overall fitness for cheerleading performance. This test helps track the athlete's cardiovascular improvements over time and identifies areas for conditioning focus in training programs.";
  const defaultSteps = [
    "Use a track or accurately measured flat course to ensure precise results.",
    "Ensure the athlete completes a thorough 10-15 minute warm-up with light jogging and dynamic stretches before testing.",
    "Position the athlete at the starting line in a standing start position.",
    "On the start signal, the athlete should run the complete 1 mile distance (1609 meters or 4 laps on a standard track) at maximum sustainable pace (timing begins immediately when the start signal is given).",
    "The athlete should focus on pacing - start strong but save energy to maintain speed throughout.",
    "The athlete should run the entire distance without walking or stopping.",
    "The athlete should drive hard through the finish line without slowing down before crossing."
  ];

  const finalVideoUrl = videoUrl || defaultVideoUrl;
  const finalDescription = description || defaultDescription;
  const finalSteps = steps || defaultSteps;

  return (
    <Box 
      sx={{ 
        maxWidth: '900px', 
        mx: 'auto', 
        p: { xs: -10, md: 4 }, // Padding responsive
        backgroundColor: 'white',
        // SỬA LỖI CĂN GIỮA: Đảm bảo toàn bộ nội dung căn trái
        textAlign: 'left' 
      }}
    >
      {/* 1. Video Player (Responsive 16:9 Aspect Ratio) */}
      <Box sx={{ 
        position: 'relative', 
        width: '100%', 
        paddingTop: '56.25%', // 16:9 Aspect Ratio (9/16 * 100)
        mb: 3 // consistent vertical rhythm (khoảng cách dưới video)
      }}>
        <video 
          controls 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            objectFit: 'cover', // Đảm bảo video lấp đầy box
            border: '1px solid #ddd'
          }}
          // Sử dụng URL video được truyền vào
          src={finalVideoUrl}
          title="Instructional Video"
          // Tạm thời dùng placeholder poster
          poster="https://placehold.co/800x450/e0e0e0/38a169?text=Video+Placeholder"
        >
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
      </Box>

      {/* 2. Instruction Header */}
      <Typography 
        variant="h6" 
        component="h4" 
        sx={{ 
          fontWeight: 600, 
          fontSize: '1rem', 
          mb: 1, // Khoảng cách nhỏ với đoạn mô tả
          color: '#333'
        }}
      >
        Instructions:
      </Typography>

      {/* 3. Description Text */}
      <Typography 
        variant="body1" 
        sx={{ 
          fontSize: '0.9rem', 
          lineHeight: 1.6, 
          color: '#444',
          mb: 3 // Khoảng cách lớn với phần "How to Perform"
        }}
      >
        {finalDescription}
      </Typography>

      {/* 4. How to Perform Header */}
      <Typography 
        variant="subtitle1" 
        component="h5" 
        sx={{ 
          fontWeight: 600, 
          fontSize: '1rem', 
          mb: 0, // Khoảng cách với danh sách bước
          color: '#333'
        }}
      >
        How to Perform:
      </Typography>

      {/* 5. Instruction List */}
      <Box component="ol" sx={{ 
        listStyleType: 'decimal', 
        pl: 3, // Padding trái cho danh sách
        fontSize: '0.9rem',
        color: '#444'
      }}>
        {finalSteps.map((step, index) => (
          <Box 
            component="li" 
            key={index} 
            sx={{ 
              mb: 1 , 
              lineHeight: 1.5
            }}
          >
            {step}
          </Box>
        ))}
      </Box>

      {/* Phần trống để giữ khoảng cách dưới cùng */}
      <Box sx={{ mt: -5 }} />
    </Box>
  );
}
