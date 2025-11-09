'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import CheckOffLayout from '../../components/layouts/CheckOffLayout';
import ReviewCard from '../../components/Checkoff/ReviewCard';
import Checkoff from '../../api/modules/checkoff.api.js';


// Giả sử coachId được lấy từ Redux store hoặc context

// Helper: chuẩn hoá 1 item từ API -> ReviewCard props
function mapToReviewCardItem(item, idx = 0) {
  // Thử lấy tên VĐV từ nhiều field khả dĩ
  const athleteName =
    item.athlete_name ||
    item.athlete_full_name ||
    (item.first_name || item.last_name
      ? `${item.first_name ?? ''} ${item.last_name ?? ''}`.trim()
      : item.athleteId || item.athlete_id || 'Unknown athlete');

  // Thử lấy tên task từ join new_checkoff nếu có
  const taskName =
    item.assigned_task ||
    item.task_name ||
    item.task ||
    `Checkoff #${item.checkoff_id ?? 'N/A'}`;

  // Ghi chú của VĐV
  const athleteNotes = item.note || item.athlete_note || '';

  // Link video
  const videoUrl = item.media_link || item.video_link || '';

  // id duy nhất cho card
  const id =
    item.submit_id ||
    item.id ||
    `${item.checkoff_id ?? 'N'}.${item.athlete_id ?? idx}`;

  return { id, athleteName, taskName, athleteNotes, videoUrl, raw: item };
}

export default function CheckOffReview() {
  const coachId = useSelector((s) => s.auth.user_id);
  const token  = useSelector((s) => s.auth.token);
  
  const [reviewsRaw, setReviewsRaw] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Gọi API
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const res = await Checkoff.getCheckoffReviewByCoach(coachId, token);
      console.log('Checkoff review response:', res);
      const payload = res;

      let items = [];
      if (Array.isArray(payload)) {
        items = payload;
      } else if (Array.isArray(payload?.data)) {
        items = payload.data;
      } else if (Array.isArray(payload?.reviews)) {
        items = payload.reviews;
      } else if (payload && typeof payload === 'object') {
        // Trường hợp API trả về 1 object duy nhất (ví dụ Postman bạn gửi)
        items = [payload];
      } else {
        console.warn('Unexpected review payload:', payload);
      }

      setReviewsRaw(items);
      setIsLoading(false);
    };
    load();
  }, [token]);

  // Chuẩn hoá về format ReviewCard
  const reviews = useMemo(
    () => (reviewsRaw || []).map((it, i) => mapToReviewCardItem(it, i)),
    [reviewsRaw]
  );

  return (
    <CheckOffLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          width: '100%',
          fontFamily: 'Aptos, sans-serif',
          p: 2,
          gap: 2,
        }}
      >
        {isLoading ? (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Đang tải các submission…
            </Typography>
          </Box>
        ) : reviews.length === 0 ? (
          <Box sx={{ py: 6, textAlign: 'center', opacity: 0.8 }}>
            <Typography variant="body1">Chưa có submission nào.</Typography>
          </Box>
        ) : (
          reviews.map((review) => <ReviewCard key={review.id} reviewData={review} />)
        )}
      </Box>
    </CheckOffLayout>
  );
}
