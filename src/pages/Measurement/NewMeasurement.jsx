import { Box, Button } from "@mui/material";
import AthleteSelector from "../../components/Measurement/NewMeasurement/AthleteSelector";
import DropSelectMeas from "../../components/Measurement/NewMeasurement/DropSelectMeas";
import VideoInstruction from "../../components/Measurement/NewMeasurement/VideoInstruction";

export default function NewMeasurement() {
  return (
    <Box sx={{
        // 1. Kích hoạt Flexbox và sắp xếp theo chiều dọc (Stacking)
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        
        // 2. Căn chỉnh các mục (items) con theo chiều ngang (cross-axis)
        // 'flex-start' đảm bảo các mục được căn chỉnh về phía trái.
        // Mặc dù alignItems: 'stretch' là mặc định cho column, 
        // việc đặt rõ ràng giúp đảm bảo ý định căn trái.
        alignItems: 'flex-start', // <-- THAY ĐỔI CẦN THIẾT
        
        // 3. Thêm khoảng cách giữa các component và padding để dễ nhìn hơn (Tùy chọn)
        gap: 2, // Khoảng cách 16px (mặc định của MUI spacing unit)
        p: 2,   // Padding 16px xung quanh container
      }}
      >
      
      
      <DropSelectMeas />
      <VideoInstruction />
      <AthleteSelector />
      <Button sx = {{ width: "100%", backgroundColor: "#257951", color: "white", fontSize: "15px", fontWeight: "bold", textTransform: "none", borderRadius: "10px", padding: "8px", marginTop: "10px" }} variant="contained">
        Set Record Results
      </Button>
    </Box>
  );
}
