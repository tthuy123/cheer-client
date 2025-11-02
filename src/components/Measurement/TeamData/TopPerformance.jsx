import React, { useState, useEffect } from 'react'; // 1. THÊM HOOKS
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress, // 2. THÊM LOADING
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux'; // 3. THÊM REDUX
import Measurement from '../../../api/modules/measurement.api'; // 4. THÊM API
// ... (Các hằng số màu sắc và component styled giữ nguyên) ...
const HEADER_BG_COLOR = '#e9f1ed'; 
const TEXT_COLOR_PRIMARY = '#1e1e1e'; 
const TEXT_COLOR_SECONDARY = '#757575'; 
const DIVIDER_COLOR = '#e0e0e0'; 

// 5. XÓA BỎ DỮ LIỆU MẪU (performanceData)

const CategoryHeader = styled(Box)(({ theme }) => ({
  // ... (style giữ nguyên)
  backgroundColor: HEADER_BG_COLOR,
  padding: theme.spacing(1.5, 2), 
  borderBottom: `1px solid ${DIVIDER_COLOR}`,
}));

// Component chính
const TopPerformance = () => { // 6. XÓA PROP 'data'

  // 7. THÊM STATE ĐỂ LẤY DỮ LIỆU
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const coachId = useSelector((state) => state.auth.user_id); // Lấy coachId

  // 8. THÊM useEffect ĐỂ GỌI API
  useEffect(() => {
    if (!coachId) {
      setIsLoading(false);
      return; // Không làm gì nếu không có coachId
    }

    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        // Gọi API
        const apiData = await Measurement.getTeamLeaderboard(coachId);
        
        // 9. BIẾN ĐỔI DỮ LIỆU API
        const transformedData = apiData.map(group => ({
          // API 'measurement_name' -> Component 'category'
          category: group.measurement_name,
          
          // API 'rankings' -> Component 'records'
          records: group.rankings.map(record => ({
            rank: record.rank,
            // API 'first_name', 'last_name' -> Component 'name'
            name: `${record.first_name} ${record.last_name}`,
            // API 'result' -> Component 'time'
            time: record.result,
            // API 'unit' (từ group) -> Component 'unit' (trong record)
            unit: group.unit,
          }))
        }));
        
        setLeaderboardData(transformedData);

      } catch (error) {
        console.error("Lỗi khi tải bảng xếp hạng:", error);
        setLeaderboardData([]); // Đặt về mảng rỗng nếu lỗi
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [coachId]); // Gọi lại khi coachId thay đổi


  // 10. THÊM TRẠNG THÁI LOADING
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 11. THÊM TRẠNG THÁI KHÔNG CÓ DỮ LIỆU
  if (leaderboardData.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <Typography color="textSecondary">Không có dữ liệu xếp hạng.</Typography>
      </Box>
    );
  }

  // 12. CẬP NHẬT RENDER (chỉ đổi tên biến 'data' -> 'leaderboardData')
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 900, 
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      {leaderboardData.map((categoryGroup, index) => ( // Đổi tên biến
        <React.Fragment key={categoryGroup.category}>
          {/* Header */}
          <CategoryHeader>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                color: TEXT_COLOR_PRIMARY,
                textTransform: 'none',
                textAlign: 'left',
              }}
            >
              {categoryGroup.category}
            </Typography>
          </CategoryHeader>

          {/* Danh sách các kỷ lục */}
          <List disablePadding>
            {categoryGroup.records.map((record, recordIndex) => (
              // Logic render bên trong này giữ nguyên vì dữ liệu đã được biến đổi
              <React.Fragment key={recordIndex}>
                <ListItem
                  sx={{
                    padding: (theme) => theme.spacing(1, 2), 
                  }}
                >
                  {/* Cột 1: Rank và Tên */}
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          component="span"
                          sx={{
                            width: '20px', 
                            marginRight: 2,
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

                  {/* Cột 2: Thời gian và Đơn vị */}
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
                        marginRight: 1,
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

                {/* Divider (Nếu không phải là mục cuối cùng trong nhóm) */}
                {recordIndex < categoryGroup.records.length - 1 && (
                  <Divider component="li" sx={{ margin: '0 16px' }} />
                )}
              </React.Fragment>
            ))}
          </List>

          {/* Divider lớn giữa các Category (Nếu không phải là nhóm cuối cùng) */}
          {index < leaderboardData.length - 1 && ( // Đổi tên biến
            <Divider sx={{ borderBottomWidth: 5, borderColor: '#f7f7f7' }} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default TopPerformance;