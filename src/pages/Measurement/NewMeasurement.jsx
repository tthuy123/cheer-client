import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress } from "@mui/material";

// 1. IMPORT API
// Đảm bảo đường dẫn này trỏ đúng đến file 'Measurement.api.js' của bạn
import Measurement from '../../api/modules/measurement.api.js'; 

// 2. IMPORT CÁC COMPONENT CON
import SelectMeasurement from "../../components/Measurement/TeamData/SelectMeasurement";
import VideoInstruction from "../../components/Measurement/NewMeasurement/VideoInstruction";
import MeasurementLayout from "../../components/layouts/MeasurementLayout";
import AthleteSelector from "../../components/Measurement/NewMeasurement/AthleteSelector";
import RecordPopup from '../../components/Measurement/NewMeasurement/RecordPopup';

import { useSelector } from 'react-redux';


export default function NewMeasurement() {
  const coachId = useSelector((state) => state.auth.user_id);
  console.log("Coach ID từ Redux:", coachId);

  // 4. STATE QUẢN LÝ DỮ LIỆU TỪ API
  const [measurementsList, setMeasurementsList] = useState([]); // Danh sách các bài đo
  const [athletesList, setAthletesList] = useState([]);       // Danh sách VĐV của coach

  // 5. STATE QUẢN LÝ LỰA CHỌN CỦA NGƯỜI DÙNG
  const [selectedMeasurement, setSelectedMeasurement] = useState(null); // Lưu trữ TOÀN BỘ object bài đo
  const [selectedAthletes, setSelectedAthletes] = useState([]); 

  // 6. STATE QUẢN LÝ UI (LOADING, POPUP)
  const [isLoading, setIsLoading] = useState(true);   // Loading ban đầu
  const [isSaving, setIsSaving] = useState(false);     // Đang lưu kết quả
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 7. HOOK ĐỂ TẢI DỮ LIỆU BAN ĐẦU (DANH SÁCH VĐV VÀ BÀI ĐO)
  useEffect(() => {
    const loadInitialData = async () => {
      if (!coachId) return; // Đảm bảo có coachId

      setIsLoading(true);
      try {
        // Gọi API song song
        const [measurementsData, athletesData] = await Promise.all([
          Measurement.listAllMeasurements(),
          Measurement.listAthletesOfCoach(coachId)
        ]);
        console.log("Dữ liệu measurements:", measurementsData);
        console.log("Dữ liệu athletes:", athletesData);

        // Xử lý dữ liệu athletes để khớp với định dạng component (id, name)
        // GIẢ SỬ API trả về { user_id, first_name, last_name }
        const mappedAthletes = athletesData.map(ath => ({
          id: ath.id, // Map 'user_id' -> 'id'
          name: `${ath.first_name} ${ath.last_name}` // Kết hợp tên
        }));
        
        setMeasurementsList(measurementsData); // API trả về mảng đầy đủ [ {id, name, unit...} ]
        setAthletesList(mappedAthletes); // Nguồn dữ liệu VĐV mới

      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        // TODO: Hiển thị thông báo lỗi cho người dùng (ví dụ: Snackbar)
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [coachId]); // Tải lại nếu coachId thay đổi

  // 8. LỌC DANH SÁCH VĐV ĐỂ TRUYỀN VÀO POPUP (sử dụng state 'athletesList')
  const athletesToRecord = athletesList.filter(athlete => 
    selectedAthletes.includes(athlete.id)
  );

  // 9. CẬP NHẬT HÀM MỞ POPUP (thêm kiểm tra bài đo)
  const handleOpenPopup = () => {
    if (!selectedMeasurement) {
      alert("Vui lòng chọn một bài đo (measurement).");
      return;
    }
    if (selectedAthletes.length === 0) {
      alert("Vui lòng chọn ít nhất một vận động viên.");
      return;
    }
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // 10. CẬP NHẬT HÀM LƯU KẾT QUẢ (GỌI API)
  const handleSaveResults = async (results) => {
    // 'results' là mảng từ popup, ví dụ: [{ athleteId: '...', value: '...' }]
    
    if (!selectedMeasurement) {
      console.error("Không thể lưu: không có bài đo nào được chọn.");
      return;
    }
    
    setIsSaving(true);
    const dateRecorded = new Date().toISOString();

    // Tạo một mảng các promise để gọi API cho từng VĐV
    const savePromises = results.map(result => {
      
      // QUAN TRỌNG: Chuyển đổi giá trị 'value' (ví dụ: "10:30")
      // thành một con số (ví dụ: 630 giây) nếu cần.
      // Ở đây, tôi giả sử 'result.value' đã là một con số.
      const numericalValue = parseFloat(result.value); 

      if (isNaN(numericalValue)) {
        console.warn(`Bỏ qua giá trị không hợp lệ của ${result.athleteId}: ${result.value}`);
        return Promise.resolve(null); // Bỏ qua VĐV này
      }

      const measurementData = {
        athleteId: result.athleteId,
        measurementId: selectedMeasurement.measurement_id, // Lấy ID từ state
        value: numericalValue, // Giá trị đã xử lý
       // dateRecorded: dateRecorded
      };
      
      return Measurement.setNewRecord(measurementData);
    });

    try {
      // Gửi tất cả request song song
      await Promise.all(savePromises);
      
      alert("Lưu kết quả thành công!"); // TODO: Dùng Snackbar
      
      // Đóng popup và reset
      handleClosePopup();
      setSelectedAthletes([]); // Xóa các VĐV đã chọn

    } catch (error) {
      console.error("Lỗi khi lưu kết quả:", error);
      alert("Đã xảy ra lỗi khi lưu kết quả."); // TODO: Dùng Snackbar
    } finally {
      setIsSaving(false);
    }
  };

  // 11. HIỂN THỊ LOADING BAN ĐẦU
  if (isLoading) {
    return (
      <MeasurementLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      </MeasurementLayout>
    );
  }

  // 12. GIAO DIỆN CHÍNH
  return (
    <MeasurementLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          width: '100%',
          gap: 2,
          p: 2,
        }}
      >
        {/* TRUYỀN DỮ LIỆU VÀ HÀM VÀO CÁC COMPONENT CON */}
        <Box sx={{ width: '100%', maxWidth: 900 }}>
         <SelectMeasurement
            measurementsList={measurementsList} // <-- THÊM PROP NÀY
            selected={selectedMeasurement}
            onChange={setSelectedMeasurement}
          />
        </Box>

        {/* TODO: Bạn có thể muốn VideoInstruction thay đổi dựa trên 'selectedMeasurement' */}
        <VideoInstruction /> 
        
        <Box sx={{ width: '100%', maxWidth: 900 }}>
          <AthleteSelector 
            athletesList={athletesList} // <-- Dùng state từ API
            selectedAthletes={selectedAthletes} 
            onChange={setSelectedAthletes} 
          />
        </Box>

        <Button 
          variant="contained" 
          onClick={handleOpenPopup}
          disabled={isSaving} // Vô hiệu hóa nút khi đang lưu
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
          {isSaving ? 'Đang lưu...' : 'Set Record Results'}
        </Button>
      </Box>

      {/* POPUP */}
      <RecordPopup
        open={isPopupOpen}
        handleClose={handleClosePopup}
        onSave={handleSaveResults}
        athletes={athletesToRecord}
        // Lấy đơn vị (unit) từ bài đo đã chọn
        measurementUnit={selectedMeasurement?.imperial_unit || 'N/A'} // Sửa: Dùng imperial_unit
        // Vô hiệu hóa popup khi đang lưu
        isSaving={isSaving}
      />
    </MeasurementLayout>
  );
}