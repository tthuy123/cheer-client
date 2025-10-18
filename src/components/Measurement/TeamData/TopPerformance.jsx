import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Màu sắc gợi ý từ hình ảnh:
const HEADER_BG_COLOR = '#e9f1ed'; // Màu xanh nhạt cho tiêu đề nhóm (ví dụ: 1 Mile Time)
const TEXT_COLOR_PRIMARY = '#1e1e1e'; // Gần như đen
const TEXT_COLOR_SECONDARY = '#757575'; // Màu xám cho phút/giây
const DIVIDER_COLOR = '#e0e0e0'; // Màu xám nhạt cho Divider

// Dữ liệu mẫu (Sample Data)
const performanceData = [
  {
    category: '1 Mile Time',
    records: [
      { rank: 1, name: 'Duy Coach', time: '08:00', unit: 'minutes' },
      { rank: 2, name: 'Daniel Davis', time: '11:12', unit: 'minutes' },
      { rank: 3, name: 'Benjamin Robinson', time: '12:11', unit: 'minutes' },
    ],
  },
  {
    category: '2 Mile Time',
    records: [
      { rank: 1, name: 'Duy Coach', time: '23:00', unit: 'minutes' },
      { rank: 2, name: 'Benjamin Robinson', time: '66:00', unit: 'minutes' },
    ],
  },
  {
    category: '20m Sprint',
    records: [
      { rank: 1, name: 'Duy Coach', time: '10:00', unit: 'minutes' },
    ],
  },
];

// Component cho tiêu đề nhóm (Category Header)
const CategoryHeader = styled(Box)(({ theme }) => ({
  backgroundColor: HEADER_BG_COLOR,
  padding: theme.spacing(1.5, 2), // 12px trên/dưới, 16px trái/phải
  borderBottom: `1px solid ${DIVIDER_COLOR}`,
}));

// Component chính
const TopPerformance = ({ data = performanceData }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 900, // Giới hạn chiều rộng cho dễ nhìn
        margin: '0 auto',
        // Thêm đường viền mờ xung quanh toàn bộ khối để giống trong ảnh (tùy chọn)
        // border: `1px solid ${DIVIDER_COLOR}`,
        // borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      {data.map((categoryGroup, index) => (
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
              <React.Fragment key={recordIndex}>
                <ListItem
                  sx={{
                    padding: (theme) => theme.spacing(1, 2), // Khoảng đệm ListItem
                  }}
                >
                  {/* Cột 1: Rank và Tên */}
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          component="span"
                          sx={{
                            width: '20px', // Cố định chiều rộng cho Rank
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
                      minWidth: '100px', // Đảm bảo không bị xuống dòng
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
                        fontSize: '0.875rem', // Kích thước chữ nhỏ hơn
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
          {index < data.length - 1 && (
            <Divider sx={{ borderBottomWidth: 5, borderColor: '#f7f7f7' }} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default TopPerformance;