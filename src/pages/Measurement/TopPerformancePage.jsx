import { Box, Button } from "@mui/material";
import TopPerformance from "../../components/Measurement/TeamData/TopPerformance";
import MeasurementLayout from "../../components/layouts/MeasurementLayout";



export default function TopPerformancePage() {
  return (
    <MeasurementLayout>
  {/* <Box
      sx={{
        // 1. Component cha chịu trách nhiệm căn giữa toàn bộ khối
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // CĂN GIỮA: Căn chỉnh các mục con theo trục ngang (x)
        flex: 1,
        width: '100%', // Đảm bảo chiếm đủ chiều rộng màn hình
        gap: 2,
        p: 2,
      }}
    >
       */}
      {/* 2. Áp dụng chiều rộng tối đa thống nhất cho các Select */}
      <Box sx={{ 
  //width: '100%', maxWidth: 900, alignItems: 'center' 
  display: 'flex',
  
        flexDirection: 'column',
        alignItems: 'center', // CĂN GIỮA: Căn chỉnh các mục con theo trục ngang (x)
        flex: 1,
        width: '100%', // Đảm bảo chiếm đủ chiều rộng màn hình
        gap: 2,
        p: 2,
  }}>
        <TopPerformance/>
      </Box>

{/*     </Box> */}
    </MeasurementLayout>
  );
}