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

// ---- Helpers cho minutes
const isMinutesUnit = (unit) =>
  !!unit && ['minute', 'minutes', 'min', 'mins'].includes(String(unit).toLowerCase().trim());

// Format giây -> "mm:ss", có hỗ trợ giá trị âm (cho Total Change)
const formatSecondsToMMSS = (totalSeconds) => {
  if (!Number.isFinite(totalSeconds)) return 'N/A';
  const isNegative = totalSeconds < 0;
  const abs = Math.abs(Math.round(totalSeconds));
  const m = Math.floor(abs / 60);
  const s = abs % 60;
  const str = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return isNegative ? `-${str}` : str;
};

// --- Format kết quả để hiển thị theo unit (đÃ CHỈNH LOGIC CHUẨN HÓA) ---
// Quy ước: nếu unit là minutes -> value đang là GIÂY (theo DB), hiển thị "mm:ss"
//         unit khác -> hiển thị số (giữ nguyên), dùng cho chart axis/tooltip
const formatResult = (value, unit) => {
  if (value === null || value === undefined) return 'N/A';
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return 'N/A';

  if (isMinutesUnit(unit)) {
    // VALUE ĐANG LÀ GIÂY -> hiển thị mm:ss
    return formatSecondsToMMSS(numericValue);
  }
  // Default: hiển thị số (có thể là giây thuần hoặc đơn vị khác)
  return String(numericValue);
};

// Component phụ trợ cho Thẻ Kết quả
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
  // Nếu không có dữ liệu
  if (!data || !data.summary || !data.history || data.history.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', width: '100%' }}>
        <Typography color="textSecondary">
          No measurement data available for this athlete.
        </Typography>
      </Box>
    );
  }

  const { summary, history } = data;
  const unit = summary.unit || 'units';
  const minutesMode = isMinutesUnit(unit);

  // Thẻ tóm tắt
  const latestResultFormatted = formatResult(summary.latestResult, unit);
  const totalChangeFormatted = formatResult(summary.totalChange, unit);

  // Dữ liệu cho biểu đồ: Recharts cần CŨ -> MỚI
  const chartData = [...history].reverse().map((item) => ({
    value: Number(item.result), // GIỮ GIÁ TRỊ THÔ (giây nếu minutes)
    // THAY ĐỔI: Sử dụng ngày và giờ đầy đủ làm nhãn để mỗi điểm là DUY NHẤT.
    label: new Date(item.date).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    }),
  }));

  // Recent Tests (đã MỚI -> CŨ sẵn trong `history`)
  const recentTests = history.slice(0, 5).map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }),
    result: formatResult(item.result, unit), // mm:ss nếu minutes
    unit: unit, // GIỮ nguyên chữ "minutes"
  }));

  return (
    <Box sx={{ width: '100%' }}>
      {/* Tiêu đề */}
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          color: '#1e1e1e', 
          fontWeight: 'bold',
          textAlign: 'left',
        }}
      >
        Progress Chart
      </Typography>
      
      {/* Khu vực biểu đồ */}
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
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              interval="preserveStartEnd"
              // THAY ĐỔI: Chỉ hiển thị ngày (MM/DD) trên trục X để giữ gọn
              tickFormatter={(fullLabel) => {
                // fullLabel có định dạng MM/DD/YYYY, HH:MM
                // Tách lấy MM/DD/YYYY
                const parts = fullLabel.split(',')[0]; 
                // Cắt lấy MM/DD
                return parts.substring(0, 5);
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              padding={{ top: 5, bottom: 5 }}
              // Nếu minutes -> hiển thị mm:ss trên trục Y; ngược lại hiển thị số
              tickFormatter={(v) => (minutesMode ? formatSecondsToMMSS(Number(v)) : Math.round(Number(v)))}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip 
              // THAY ĐỔI: Thêm nhãn ngày/giờ đầy đủ vào Tooltip
              labelFormatter={(label) => `Test Date: ${label}`}
              formatter={(value) => [formatResult(value, unit), 'Result']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={primaryGreen}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Thẻ kết quả */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <ResultCard 
            title="Latest Result" 
            value={latestResultFormatted}   // ví dụ: 22:00
            unit={unit}                     // giữ chữ "minutes"
            icon={ArrowOutwardIcon} 
            color={primaryGreen}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ResultCard 
            title="Total Change" 
            value={totalChangeFormatted}    // ví dụ: -07:00
            unit={unit} 
            icon={FiberManualRecordIcon} 
            color={primaryGreen}
          />
        </Grid>
      </Grid>
      
      {/* Recent Tests */}
      <Typography 
        variant="body1" 
        sx={{ 
          mb: 2, 
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
                  {test.result} {/* mm:ss nếu minutes */}
                </Typography>
                <Typography variant="body2" component="span" sx={{ color: '#56616f' }}>
                  {test.unit}   {/* giữ chữ "minutes" */}
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