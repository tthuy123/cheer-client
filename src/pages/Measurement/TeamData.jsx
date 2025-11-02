import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from "@mui/material";
import { useSelector } from 'react-redux';

// Import API
import Measurement from '../../api/modules/measurement.api.js'; 

// Import các component con
import SelectAthlete from "../../components/Measurement/TeamData/SelectAthlete";
import SelectMeasurement from "../../components/Measurement/TeamData/SelectMeasurement";
import ProgressChart from "../../components/Measurement/TeamData/ProgressChart";
import MeasurementLayout from "../../components/layouts/MeasurementLayout";

export default function TeamData() {
  const coachId = useSelector((state) => state.auth.user_id);

  // State cho danh sách
  const [athletesList, setAthletesList] = useState([]);
  const [measurementsList, setMeasurementsList] = useState([]);

  // State cho lựa chọn hiện tại
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [selectedMeasurement, setSelectedMeasurement] = useState(null);

  // State cho dữ liệu biểu đồ
  const [progressData, setProgressData] = useState(null);
  
  // State cho loading
  const [isListLoading, setIsListLoading] = useState(true);
  const [isChartLoading, setIsChartLoading] = useState(false);

  // 1. useEffect: Tải danh sách Athletes và Measurements
  useEffect(() => {
    if (!coachId) return;

    const loadInitialLists = async () => {
      setIsListLoading(true);
      try {
        const [measurementsData, athletesData] = await Promise.all([
          Measurement.listAllMeasurements(),
          Measurement.listAthletesOfCoach(coachId)
        ]);

        // Map lại athletesData để có { id, name }
        const mappedAthletes = athletesData.map(ath => ({
          id: ath.id, 
          name: `${ath.first_name} ${ath.last_name}`
        }));
        
        setMeasurementsList(measurementsData);
        setAthletesList(mappedAthletes);

        // Tự động chọn giá trị đầu tiên (nếu có)
        if (mappedAthletes.length > 0) {
          setSelectedAthlete(mappedAthletes[0]);
        }
        if (measurementsData.length > 0) {
          setSelectedMeasurement(measurementsData[0]);
        }

      } catch (error) {
        console.error("Lỗi khi tải danh sách:", error);
      } finally {
        setIsListLoading(false);
      }
    };

    loadInitialLists();
  }, [coachId]);

  // 2. useEffect: Tải dữ liệu biểu đồ BẤT CỨ KHI NÀO 1 trong 2 select thay đổi
  useEffect(() => {
    if (!selectedAthlete || !selectedMeasurement) {
      setProgressData(null); // Xóa dữ liệu cũ nếu 1 trong 2 chưa chọn
      return;
    }

    const loadProgressData = async () => {
      setIsChartLoading(true);
      setProgressData(null); // Xóa dữ liệu cũ
      try {
        const data = await Measurement.getAthleteProgress(
          selectedAthlete.id, 
          selectedMeasurement.measurement_id // Đảm bảo key khớp (từ file SelectMeasurement)
        );
        setProgressData(data); // data là { summary: {...}, history: [...] }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu biểu đồ:", error);
      } finally {
        setIsChartLoading(false);
      }
    };

    loadProgressData();
  }, [selectedAthlete, selectedMeasurement]); // Phụ thuộc vào cả 2


  // Hiển thị loading chính
  if (isListLoading) {
    return (
      <MeasurementLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      </MeasurementLayout>
    );
  }

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
        
        {/* 3. Truyền props (data + state + hàm) xuống component con */}
        <Box sx={{ width: '100%', maxWidth: 900 }}>
          <SelectAthlete 
            athletesList={athletesList}
            selected={selectedAthlete}
            onChange={setSelectedAthlete}
          />
        </Box>

        <Box sx={{ width: '100%', maxWidth: 900 }}>
          <SelectMeasurement 
            measurementsList={measurementsList}
            selected={selectedMeasurement}
            onChange={setSelectedMeasurement}
          />
        </Box>

        <Box sx={{ width: '100%', maxWidth: 900, mt: 2 }}>
          {isChartLoading ? (
            <CircularProgress />
          ) : (
            <ProgressChart 
              data={progressData} // Truyền dữ liệu {summary, history} xuống
            />
          )}
        </Box>
      
      </Box>
    </MeasurementLayout>
  );
}