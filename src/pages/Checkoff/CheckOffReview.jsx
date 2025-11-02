'use client';

import React from 'react';
import { Box } from '@mui/material';
import CheckOffLayout from '../../components/layouts/CheckOffLayout';
import ReviewCard from '../../components/Checkoff/ReviewCard'; // Card review

// 1. DỮ LIỆU MOCK BẠN CUNG CẤP
const MOCK_REVIEWS = [
  {
    id: 'submission_1',
    athleteName: 'cecile cimon',
    taskName: 'Perfect the Tumbling Sequence',
    athleteNotes: 'Completed all 5 tumbling reps with clean landings. Focused on keeping core tight and arm placement consistent. Feeling more stable on back handsprings.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // (Video placeholder)
  },
  {
    id: 'submission_2',
    athleteName: 'athur doccle',
    taskName: 'Team Chant Performance Practice',
    athleteNotes: 'Practiced team chant 10 times with full voice projection and hand motions. Synced timing with my stunt group on last 3 reps. Confident with rhythm now.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // (Video placeholder)
  },
  {
    id: 'submission_3',
    athleteName: 'cecile cimon',
    taskName: 'Flexibility & Stretch Routine',
    athleteNotes: 'Held all splits for 45 seconds each side, improved left split depth by 3 cm. Also added shoulder stretches. No pain or strain.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // (Video placeholder)
  },
];

export default function CheckOffReview() {
  // TODO: Thay vì MOCK_REVIEWS, hãy dùng useState và useEffect
  // để tải (fetch) dữ liệu này từ API của bạn.
  
  // const [reviews, setReviews] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => { 
  //   fetch('/api/reviews').then(...).then(data => {
  //     setReviews(data);
  //     setIsLoading(false);
  //   })
  // }, []);

  return (
    <CheckOffLayout>
      {/* Box ngoài cùng (của trang) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Căn giữa danh sách
          flex: 1,
          width: '100%',
          fontFamily: 'Aptos, sans-serif',
        }}
      >
        {/* 2. LẶP QUA MOCK DATA VÀ RENDER CARD */}
        {MOCK_REVIEWS.map((review) => (
          <ReviewCard key={review.id} reviewData={review} />
        ))}
        
        {/* TODO: Thêm xử lý khi isLoading hoặc khi không có review nào */}
      </Box>
    </CheckOffLayout>
  );
}

