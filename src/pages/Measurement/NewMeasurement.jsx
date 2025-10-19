import { Box, Button } from "@mui/material";
import SelectAthlete from "../../components/Measurement/TeamData/SelectAthlete";
import SelectMeasurement from "../../components/Measurement/TeamData/SelectMeasurement";
import VideoInstruction from "../../components/Measurement/NewMeasurement/VideoInstruction";
import MeasurementLayout from "../../components/layouts/MeasurementLayout";

// Định nghĩa chiều rộng tối đa thống nhất cho tất cả các control
const MAX_WIDTH = 500; // Có thể chọn 400, 500, hoặc 600px tùy ý

export default function NewMeasurement() {
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
      
      {/* 2. Áp dụng chiều rộng tối đa thống nhất cho các Select */}
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <SelectMeasurement />
      </Box>

      {/* 3. VideoInstruction đã có maxWidth riêng là 900px, không cần Box bao bọc */}
      <VideoInstruction /> 
      
      {/* 4. Áp dụng chiều rộng tối đa thống nhất cho SelectAthlete */}
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <SelectAthlete />
      </Box>

      {/* 5. Áp dụng chiều rộng tối đa thống nhất cho Button */}
      <Button 
        variant="contained" 
        sx={{ 
          width: "100%", 
          maxWidth: 900, // THAY ĐỔI: Sử dụng MAX_WIDTH
          backgroundColor: "#257951", 
          color: "white", 
          fontSize: "15px", 
          fontWeight: "bold", 
          textTransform: "none", 
          borderRadius: "10px", 
          padding: "8px", 
          marginTop: "10px" 
        }}
      >
        Set Record Results
      </Button>
    </Box>
    </MeasurementLayout>
  );
}