import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Measurement from '../../../api/modules/measurement.api';

const HEADER_BG_COLOR = '#e9f1ed';
const TEXT_COLOR_PRIMARY = '#1e1e1e';
const TEXT_COLOR_SECONDARY = '#757575';
const DIVIDER_COLOR = '#e0e0e0';

const CategoryHeader = styled(Box)(({ theme }) => ({
  backgroundColor: HEADER_BG_COLOR,
  padding: theme.spacing(1.5, 2),
  borderBottom: `1px solid ${DIVIDER_COLOR}`,
}));

// ---- Helpers cho minutes
const isMinutesUnit = (unit) =>
  !!unit && ['minute', 'minutes', 'min', 'mins'].includes(unit.toLowerCase().trim());

const formatSecondsToMMSS = (totalSeconds) => {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '—';
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const TopPerformance = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const coachId = useSelector((state) => state.auth.user_id);

  useEffect(() => {
    if (!coachId) {
      setIsLoading(false);
      return;
    }

    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        const apiData = await Measurement.getTeamLeaderboard(coachId);

        const transformed = apiData.map((group) => {
          const unit = group.unit;
          const minutesMode = isMinutesUnit(unit);

          return {
            category: group.measurement_name,
            records: group.rankings.map((record) => {
              const raw = record.result;

              // Nếu đơn vị là minutes → hiển thị dạng mm:ss
              const displayTime = minutesMode
                ? formatSecondsToMMSS(Number(raw))
                : raw;

              const displayUnit = minutesMode ? 'minutes' : unit;

              return {
                rank: record.rank,
                name: `${record.first_name} ${record.last_name}`,
                time: displayTime,
                unit: displayUnit,
                rawValue: raw,
              };
            }),
          };
        });

        setLeaderboardData(transformed);
      } catch (err) {
        console.error('Lỗi khi tải bảng xếp hạng:', err);
        setLeaderboardData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [coachId]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (leaderboardData.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <Typography color="textSecondary">Không có dữ liệu xếp hạng.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 900, margin: '0 auto', overflow: 'hidden' }}>
      {leaderboardData.map((categoryGroup, index) => (
        <React.Fragment key={categoryGroup.category}>
          <CategoryHeader>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                color: TEXT_COLOR_PRIMARY,
                textAlign: 'left',
              }}
            >
              {categoryGroup.category}
            </Typography>
          </CategoryHeader>

          <List disablePadding>
            {categoryGroup.records.map((record, recordIndex) => (
              <React.Fragment key={recordIndex}>
                <ListItem sx={{ padding: (theme) => theme.spacing(1, 2) }}>
                  {/* Rank + Tên */}
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          component="span"
                          sx={{
                            width: '20px',
                            mr: 2,
                            fontWeight: 'bold',
                            color: TEXT_COLOR_PRIMARY,
                          }}
                        >
                          {record.rank}
                        </Typography>
                        <Typography
                          component="span"
                          sx={{
                            color: TEXT_COLOR_PRIMARY,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {record.name}
                        </Typography>
                      </Box>
                    }
                  />

                  {/* Thời gian + đơn vị */}
                  <Typography
                    variant="body1"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      whiteSpace: 'nowrap',
                      minWidth: '100px',
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 'bold',
                        color: TEXT_COLOR_PRIMARY,
                        mr: 1,
                      }}
                    >
                      {record.time}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        color: TEXT_COLOR_SECONDARY,
                        fontSize: '0.875rem',
                      }}
                    >
                      {record.unit}
                    </Typography>
                  </Typography>
                </ListItem>

                {recordIndex < categoryGroup.records.length - 1 && (
                  <Divider component="li" sx={{ margin: '0 16px' }} />
                )}
              </React.Fragment>
            ))}
          </List>

          {index < leaderboardData.length - 1 && (
            <Divider sx={{ borderBottomWidth: 5, borderColor: '#f7f7f7' }} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default TopPerformance;
