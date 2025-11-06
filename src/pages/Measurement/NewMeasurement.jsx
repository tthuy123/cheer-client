import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress } from "@mui/material";

// 1. IMPORT API
import Measurement from '../../api/modules/measurement.api.js'; 

// 2. IMPORT CÁC COMPONENT CON
import SelectMeasurement from "../../components/Measurement/TeamData/SelectMeasurement";
import VideoInstruction from "../../components/Measurement/NewMeasurement/VideoInstruction";
import MeasurementLayout from "../../components/layouts/MeasurementLayout";
import AthleteSelector from "../../components/Measurement/NewMeasurement/AthleteSelector";
import RecordPopup from '../../components/Measurement/NewMeasurement/RecordPopup';

import { useSelector } from 'react-redux';

/**
 * Parse "mm:ss" | "h:mm:ss" | "m" -> total seconds
 * RÀNG BUỘC:
 *  - Luôn yêu cầu 0 <= mm <= 60
 *  - 0 <= ss <= 60
 *  - Nếu có giờ (h>0) thì mm vẫn bị ràng buộc <= 60 (theo yêu cầu "mm và ss không > 60")
 *  - Nếu chỉ nhập "m" (số phút), cũng chặn m > 60
 * Trả về NaN nếu không hợp lệ
 */
function parseDurationToSeconds(input) {
  if (typeof input !== 'string') return NaN;
  const raw = input.trim();
  if (!raw) return NaN;

  const parts = raw.split(':').map(v => v.trim());
  if (parts.length > 3 || parts.length === 0) return NaN;

  const nums = parts.map(n => Number(n));
  if (nums.some(Number.isNaN)) return NaN;

  let h = 0, m = 0, s = 0;
  if (parts.length === 1) {
    // chỉ phút
    m = nums[0];
    if (m < 0 || m > 60) return NaN;        // CHẶN phút > 60
  } else if (parts.length === 2) {
    // mm:ss
    [m, s] = nums;
    if (m < 0 || m > 60) return NaN;        // CHẶN mm > 60
    if (s < 0 || s > 60) return NaN;        // CHẶN ss > 60
  } else if (parts.length === 3) {
    // h:mm:ss
    [h, m, s] = nums;
    if (h < 0) return NaN;
    if (m < 0 || m > 60) return NaN;        // CHẶN mm > 60 ngay cả khi có giờ
    if (s < 0 || s > 60) return NaN;        // CHẶN ss > 60
  }

  return h * 3600 + m * 60 + s;
}

export default function NewMeasurement() {
  const coachId = useSelector((state) => state.auth.user_id);
  console.log("Coach ID từ Redux:", coachId);

  // 4. STATE QUẢN LÝ DỮ LIỆU TỪ API
  const [measurementsList, setMeasurementsList] = useState([]); // Danh sách các bài đo
  const [athletesList, setAthletesList] = useState([]);         // Danh sách VĐV của coach

  // 5. STATE QUẢN LÝ LỰA CHỌN CỦA NGƯỜI DÙNG
  const [selectedMeasurement, setSelectedMeasurement] = useState(null); // Lưu trữ TOÀN BỘ object bài đo
  const [selectedAthletes, setSelectedAthletes] = useState([]); 

  // 6. STATE QUẢN LÝ UI (LOADING, POPUP)
  const [isLoading, setIsLoading] = useState(true);   // Loading ban đầu
  const [isSaving, setIsSaving] = useState(false);    // Đang lưu kết quả
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

        const mappedAthletes = athletesData.map(ath => ({
          id: ath.id, // Map 'user_id' -> 'id'
          name: `${ath.first_name} ${ath.last_name}` // Kết hợp tên
        }));

        setMeasurementsList(measurementsData);
        setAthletesList(mappedAthletes);

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
    if (!selectedMeasurement) {
      console.error("Không thể lưu: không có bài đo nào được chọn.");
      return;
    }

    setIsSaving(true);

    // chuẩn hoá unit (ví dụ: "minutes", "minute", "min")
    const unit = (selectedMeasurement?.imperial_unit || '')
      .toString()
      .toLowerCase()
      .trim();

    const isMinutes = ['minute', 'minutes', 'min', 'mins'].includes(unit);

    // --- VALIDATION TRƯỚC KHI GỬI: CHẶN mm/ss > 60 ---
    const invalids = [];
    const payloads = [];

    for (const result of results) {
      let numericValue;

      if (isMinutes) {
        if (typeof result.value === 'string') {
          // trường hợp "mm:ss" hoặc "h:mm:ss" hoặc "m"
          const secs = parseDurationToSeconds(result.value);
          if (Number.isNaN(secs)) {
            invalids.push({
              athleteId: result.athleteId,
              value: result.value
            });
            continue; // bỏ qua VĐV này
          }
          numericValue = secs; // LƯU THEO GIÂY
        } else {
          // nếu người dùng nhập số phút (vd: 12.5)
          const minutes = parseFloat(result.value);
          // CHẶN phút > 60 ngay cả khi không có ":"
          if (Number.isNaN(minutes) || minutes < 0 || minutes > 60) {
            invalids.push({
              athleteId: result.athleteId,
              value: result.value
            });
            continue;
          }
          numericValue = Math.round(minutes * 60);
        }
      } else {
        // các unit khác: giữ nguyên số
        const num = parseFloat(result.value);
        if (Number.isNaN(num)) {
          invalids.push({
            athleteId: result.athleteId,
            value: result.value
          });
          continue;
        }
        numericValue = num;
      }

      payloads.push({
        athleteId: result.athleteId,
        measurementId: selectedMeasurement.measurement_id,
        value: numericValue,
      });
    }

    // Nếu có giá trị không hợp lệ -> báo lỗi & không gửi API
    if (invalids.length > 0) {
      const list = invalids.map(iv => `• Athlete ${iv.athleteId}: "${iv.value}"`).join('\n');
      alert(
        `Một số giá trị không hợp lệ (mm và ss phải ≤ 60, dạng cho phép: m | mm:ss | h:mm:ss):\n\n${list}`
      );
      setIsSaving(false);
      return;
    }

    try {
      // Gửi tất cả request song song
      await Promise.all(payloads.map(body => Measurement.setNewRecord(body)));
      alert("Lưu kết quả thành công!");
      handleClosePopup();
      setSelectedAthletes([]);
    } catch (error) {
      console.error("Lỗi khi lưu kết quả:", error);
      alert("Đã xảy ra lỗi khi lưu kết quả.");
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
            measurementsList={measurementsList}
            selected={selectedMeasurement}
            onChange={setSelectedMeasurement}
          />
        </Box>

        {/* TODO: Bạn có thể muốn VideoInstruction thay đổi dựa trên 'selectedMeasurement' */}
        <VideoInstruction /> 
        
        <Box sx={{ width: '100%', maxWidth: 900 }}>
          <AthleteSelector 
            athletesList={athletesList}
            selectedAthletes={selectedAthletes} 
            onChange={setSelectedAthletes} 
          />
        </Box>

        <Button 
          variant="contained" 
          onClick={handleOpenPopup}
          disabled={isSaving}
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
        measurementUnit={selectedMeasurement?.imperial_unit || 'N/A'}
        // Vô hiệu hóa popup khi đang lưu
        isSaving={isSaving}
      />
    </MeasurementLayout>
  );
}
