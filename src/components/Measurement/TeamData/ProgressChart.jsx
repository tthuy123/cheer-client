import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Stack,
  // XÓA: Container
} from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'; 


// Dữ liệu giả định cho biểu đồ
const CHART_DATA = [
  { name: '09/17_1', value: 750, label: '09/17' },
  { name: '09/17_2', value: 5999, label: '' },
  { name: '09/17_3', value: 5999, label: '09/17' },
  { name: '09/18', value: 3000, label: '09/18' },
];
const yTicks = [0, 1500, 3000, 4499, 5999];
const primaryGreen = '#257951'; 

// Dữ liệu giả định cho danh sách các bài kiểm tra gần đây
const RECENT_TESTS_DATA = [
  { date: '09/18', result: '54:54', unit: 'minutes' },
  { date: '09/17', result: '99:59', unit: 'minutes' },
  { date: '09/17', result: '99:59', unit: 'minutes' },
];


// Component phụ trợ cho Thẻ Kết quả
const ResultCard = ({ title, value, unit, icon: Icon, color }) => (
  <Box 
    sx={{ 
      padding: 2, 
      backgroundColor: '#fff', 
      borderRadius: '8px', 
      border: '1px solid #e0e0e0',
      height: '100%',
      // THAY ĐỔI: XÓA maxWidth 900px ở đây.
      // Thay vào đó, nó sẽ tự động mở rộng 100% trong Grid item cha.
      fontFamily: [
      'Aptos',
      'sans-serif',
    ].join(','),
    }}
  >
    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
      <Icon sx={{ fontSize: '1rem', color: color, transform: title === 'Latest Result' ? 'rotate(45deg)' : 'none' }} />
      <Typography variant="body2" sx={{ color: '#56616f', fontWeight: 'bold' }}>
        {title}
      </Typography>
    </Stack>
    <Box>
      <Typography 
        variant="h4" 
        component="span" 
        sx={{ fontWeight: 'bold', mr: 0.5, color: '#1e1e1e' }}
      >
        {value}
      </Typography>
      <Typography variant="body1" component="span" sx={{ color: '#56616f' }}>
        {unit}
      </Typography>
    </Box>
  </Box>
);


const ProgressChart = () => {
  // Hàm hiển thị nhãn trục X
  const renderXAxisTick = ({ x, y, payload }) => {
    if (payload.value && payload.value.length > 0) {
      return (
        <text x={x} y={y + 10} dy={16} textAnchor="middle" fill="#666" style={{ fontSize: '12px' }}>
          {payload.value}
        </text>
      );
    }
    return null;
  };

  return (
    <Box 
      // THAY THẾ Container bằng Box
      // Đặt chiều rộng tối đa là 900px và căn giữa
      sx={{ 
        padding: 3, 
        margin: '0 auto',
        maxWidth: 850, // Đặt giới hạn chiều rộng toàn bộ component
        width: '100%', // Đảm bảo nó chiếm 100% trong giới hạn
      }}
    >
      {/* 1. TIÊU ĐỀ CHÍNH */}
      <Typography 
        variant="h6" 
        sx={{ 
          marginBottom: 2, 
          color: '#1e1e1e', 
          fontWeight: 'bold',
          textAlign: 'left',
        }}
      >
        Progress Chart
      </Typography>
      
      {/* 2. KHU VỰC BIỂU ĐỒ (Sử dụng Recharts) */}
      <Box 
        sx={{ 
          height: 300, 
          mb: 3, 
          border: '1px solid #e0e0e0', 
          borderRadius: '4px',
          p: 1
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={CHART_DATA}
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          >
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={renderXAxisTick} 
              interval={0} 
            />
            <YAxis
              domain={[0, 5999]}
              ticks={yTicks}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              padding={{ top: 5, bottom: 5 }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={primaryGreen}
              strokeWidth={2}
              dot={{ r: 5, fill: primaryGreen, stroke: primaryGreen, strokeWidth: 1 }}
              activeDot={{ r: 8 }}
              curve="monotone" 
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* 3. THẺ KẾT QUẢ */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <ResultCard 
            title="Latest Result" 
            value="54:54" 
            unit="minutes" 
            icon={ArrowOutwardIcon} 
            color={primaryGreen}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ResultCard 
            title="Total Change" 
            value="42:31" 
            unit="minutes" 
            icon={FiberManualRecordIcon} 
            color={primaryGreen}
          />
        </Grid>
      </Grid>
      
      {/* 4. CÁC BÀI KIỂM TRA GẦN ĐÂY */}
      <Typography 
        variant="body1" 
        sx={{ 
          marginBottom: 2, 
          color: '#1e1e1e', 
          fontWeight: 'bold',
          textAlign: 'left',
        }}
      >
        Recent Tests
      </Typography>

      <Box sx={{ backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #e0e0e0' }}>
        {RECENT_TESTS_DATA.map((test, index) => (
          <React.Fragment key={index}>
            <Grid container alignItems="center" sx={{ py: 1.5, px: 2 }}>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: '#1e1e1e', fontWeight: 'normal' }}>
                  {test.date}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', color: '#1e1e1e', mr: 0.5 }}>
                  {test.result}
                </Typography>
                <Typography variant="body2" component="span" sx={{ color: '#56616f' }}>
                  {test.unit}
                </Typography>
              </Grid>
            </Grid>
            {/* Thêm Divider trừ item cuối cùng */}
            {index < RECENT_TESTS_DATA.length - 1 && <Divider sx={{ my: 0 }} />}
          </React.Fragment>
        ))}
      </Box>

    </Box>
  );
};

export default ProgressChart;
