import { Box, Button } from "@mui/material";
import SelectAthlete from "../../components/Measurement/TeamData/SelectAthlete";
import SelectMeasurement from "../../components/Measurement/TeamData/SelectMeasurement";
import ProgressChart from "../../components/Measurement/TeamData/ProgressChart";
import MeasurementLayout from "../../components/layouts/MeasurementLayout";



export default function TeamData() {
  return (
    <MeasurementLayout>
  <Box
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
      
      {/* 4. Áp dụng chiều rộng tối đa thống nhất cho SelectAthlete */}
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <SelectAthlete />
      </Box>

{/* 2. Áp dụng chiều rộng tối đa thống nhất cho các Select */}
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <SelectMeasurement />
      </Box>

    
      
      

<Box sx={{ width: '100%', maxWidth: 900 }}>
        <ProgressChart />
      </Box>

      
     
    </Box>
    </MeasurementLayout>
  );
}