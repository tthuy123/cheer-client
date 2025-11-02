import React, { useState } from 'react';
import { Box, Button } from "@mui/material";
import SelectMeasurement from "../../components/Measurement/TeamData/SelectMeasurement";
import VideoInstruction from "../../components/Measurement/NewMeasurement/VideoInstruction";
import MeasurementLayout from "../../components/layouts/MeasurementLayout";
import AthleteSelector from "../../components/Measurement/NewMeasurement/AthleteSelector";
import RecordPopup from '../../components/Measurement/NewMeasurement/RecordPopup';

// 3. ĐỊNH NGHĨA DANH SÁCH VĐV ĐẦY ĐỦ (Source of Truth)
// Bạn nên lấy từ API, nhưng tạm thời hardcode ở đây để giống ví dụ trước
const ATHLETES_LIST = [
  { id: 'athur-doocie-123', name: 'Athur Doocie' },
  { id: 'bethony-cimon-456', name: 'Bethony Cimon' },
  { id: 'cecilia-cimon-789', name: 'Cecilia Cimon' },
];

// Định nghĩa chiều rộng tối đa thống nhất cho tất cả các control
const MAX_WIDTH = 500; // Có thể chọn 400, 500, hoặc 600px tùy ý

export default function NewMeasurement() {

// 4. THÊM STATE ĐỂ QUẢN LÝ
  // State lưu ID của các VĐV được chọn
  const [selectedAthletes, setSelectedAthletes] = useState([]); 
  // State quản lý việc popup Mở hay Đóng
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 5. LỌC DANH SÁCH VĐV ĐỂ TRUYỀN VÀO POPUP
  // Lấy ra các đối tượng VĐV đầy đủ dựa trên ID đã chọn
  const athletesToRecord = ATHLETES_LIST.filter(athlete => 
    selectedAthletes.includes(athlete.id)
  );

  // 6. THÊM CÁC HÀM ĐIỀU KHIỂN POPUP
  const handleOpenPopup = () => {
    // Chỉ mở popup nếu có ít nhất 1 VĐV được chọn
    if (selectedAthletes.length > 0) {
      setIsPopupOpen(true);
    } else {
      alert("Vui lòng chọn ít nhất một vận động viên."); // Hoặc dùng Snackbar
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Hàm này nhận dữ liệu từ popup (khi nhấn "Save Result")
  const handleSaveResults = (results) => {
    console.log("Dữ liệu kết quả để gửi đi:", results);
    // TODO: Gọi API để lưu 'results' tại đây

    // Sau khi lưu xong, đóng popup
    handleClosePopup();
  };

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
      
      

      {/* <Box sx={{ width: '100%', maxWidth: 900 }}>
        <AthleteSelector />
      </Box> */}

      {/* 5. Áp dụng chiều rộng tối đa thống nhất cho Button */}
{/*       <Button 
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
</Box> */}

{/* 7. CẬP NHẬT ATHLETESELECTOR ĐỂ TRUYỀN PROPS */}
        <Box sx={{ width: '100%', maxWidth: 900 }}>
          <AthleteSelector 
            athletesList={ATHLETES_LIST} // Truyền danh sách đầy đủ
            selectedAthletes={selectedAthletes} // Truyền state VĐV đã chọn
            onChange={setSelectedAthletes} // Truyền hàm để cập nhật state
          />
        </Box>

        {/* 8. CẬP NHẬT NÚT BUTTON ĐỂ GỌI HÀM MỞ POPUP */}
        <Button 
          variant="contained" 
          onClick={handleOpenPopup} // THAY ĐỔI: Gắn hàm mở popup
          sx={{ 
            width: "100%", 
            maxWidth: 900, 
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

      {/* 9. THÊM COMPONENT POPUP VÀO ĐÂY */}
      {/* Nó sẽ bị ẩn (open={false}) cho đến khi state isPopupOpen = true */}
      <RecordPopup
        open={isPopupOpen}
        handleClose={handleClosePopup}
        onSave={handleSaveResults}
        athletes={athletesToRecord} // Truyền VĐV đã lọc vào
        measurementUnit="minutes"   // Truyền đơn vị
      />

    
    </MeasurementLayout>
  );
}