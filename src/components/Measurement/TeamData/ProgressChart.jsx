import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Stack,
} from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'; 

const primaryGreen = '#257951'; 

// --- 2. SỬA LỖI LOGIC: Hàm formatResult ---
const formatResult = (value, unit) => {
  if (value === null || value === undefined) return "N/A";

  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return "N/A";

  // Xử lý giá trị âm (cho Total Change)
  const isNegative = numericValue < 0;
  const absValue = Math.abs(numericValue);
  let totalSeconds = 0;

  // SỬA LOGIC: Kiểm tra 'unit'
  if (unit === 'minutes') {
    // Nếu unit là "minutes", giá trị "22" nghĩa là 22 phút
    totalSeconds = Math.round(absValue * 60);
  } else {
    // Mặc định (hoặc unit là 'seconds'), giá trị (ví dụ: "3294") là giây
    totalSeconds = Math.round(absValue);
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  // Trả về, thêm dấu trừ nếu cần
  return isNegative ? `-${formattedTime}` : formattedTime;
};
// --- Kết thúc sửa lỗi ---


// Component phụ trợ cho Thẻ Kết quả (Giữ nguyên)
const ResultCard = ({ title, value, unit, icon: Icon, color }) => (
  <Box 
    sx={{ 
      padding: 2, 
      backgroundColor: '#fff', 
      borderRadius: '8px', 
      border: '1px solid #e0e0e0',
      height: '100%',
      fontFamily: 'Aptos, sans-serif',
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

// Component chính (NHẬN PROPS 'data')
const ProgressChart = ({ data }) => {
  
  // 4. XỬ LÝ LOGIC: Nếu không có dữ liệu
  if (!data || !data.summary || !data.history || data.history.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', width: '100%' }}>
        <Typography color="textSecondary">
          Chưa có dữ liệu cho lựa chọn này.
        </Typography>
      </Box>
    );
  }

  // 5. BIẾN ĐỔI DỮ LIỆU TỪ PROPS (Logic)
  const { summary, history } = data;
  const unit = summary.unit || 'units';

  // Định dạng dữ liệu cho thẻ
  const latestResultFormatted = formatResult(summary.latestResult, unit);
  const totalChangeFormatted = formatResult(summary.totalChange, unit);

  // Định dạng dữ liệu cho biểu đồ (history MỚI -> CŨ)
  // Recharts cần CŨ -> MỚI, nên chúng ta đảo ngược (reverse)
  const chartData = [...history].reverse().map((item) => ({
    value: item.result, // Giá trị thô (ví dụ: "22" hoặc "11")
    label: new Date(item.date).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit'
    }),
  }));
  
  // Định dạng dữ liệu cho 'Recent Tests' (history đã MỚI -> CŨ)
  const recentTests = history.slice(0, 5).map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }),
    result: formatResult(item.result, unit), // Dùng hàm đã sửa
    unit: unit,
  }));

  // Hàm hiển thị nhãn trục X (Giữ nguyên)
  const renderXAxisTick = ({ x, y, payload }) => { /* ... */ };

  return (
    // SỬA LAYOUT: Xóa padding, margin, maxWidth
    <Box 
      sx={{ 
        width: '100%', // Lấp đầy 100% Box 900px của cha
      }}
    >
      {/* 1. TIÊU ĐỀ CHÍNH (Giữ nguyên) */}
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
      
      {/* 2. KHU VỰC BIỂU ĐỒ (Dùng dữ liệu 'chartData') */}
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
            data={chartData} 
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          >
            <XAxis
              dataKey="label"
              /* ... */
            />
            <YAxis
              domain={['dataMin - 1', 'dataMax + 1']} // Tự động co giãn
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              padding={{ top: 5, bottom: 5 }}
              tickFormatter={(value) => Math.round(value)} 
            />
            <Tooltip 
              // Thêm Tooltip để hiển thị đúng
              formatter={(value, name, props) => {
                return [formatResult(value, unit), "Result"];
              }}
            />
            <Line
              type="monotone"
              dataKey="value" // Dùng giá trị thô
              stroke={primaryGreen}
              strokeWidth={3}
              /* ... */
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* 3. THẺ KẾT QUẢ (Dùng dữ liệu đã xử lý) */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <ResultCard 
            title="Latest Result" 
            value={latestResultFormatted} // Sẽ hiển thị: 22:00
            unit={unit} 
            icon={ArrowOutwardIcon} 
            color={primaryGreen}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ResultCard 
            title="Total Change" 
            value={totalChangeFormatted} // Sẽ hiển thị: -07:00
            unit={unit} 
            icon={FiberManualRecordIcon} 
            color={primaryGreen}
          />
        </Grid>
      </Grid>
      
      {/* 4. CÁC BÀI KIỂM TRA GẦN ĐÂY (Dùng dữ liệu 'recentTests') */}
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
        {recentTests.map((test, index) => ( 
          <React.Fragment key={index}>
            <Grid container alignItems="center" sx={{ py: 1.5, px: 2 }}>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: '#1e1e1e', fontWeight: 'normal' }}>
                  {test.date}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', color: '#1e1e1e', mr: 0.5 }}>
                  {test.result} {/* Sẽ hiển thị: 22:00, 11:00, ... */}
                </Typography>
                <Typography variant="body2" component="span" sx={{ color: '#56616f' }}>
                  {test.unit}
                </Typography>
              </Grid>
            </Grid>
            {index < recentTests.length - 1 && <Divider sx={{ my: 0 }} />}
          </React.Fragment>
        ))}
      </Box>

    </Box>
  );
};

export default ProgressChart;