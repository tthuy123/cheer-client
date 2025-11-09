import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Card, CardContent, Typography } from "@mui/material";

import Measurement from '../../api/modules/measurement.api.js';

import SelectMeasurement from "../../components/Measurement/TeamData/SelectMeasurement";
import VideoInstruction from "../../components/Measurement/NewMeasurement/VideoInstruction";
import MeasurementLayout from "../../components/layouts/MeasurementLayout";
import AthleteSelector from "../../components/Measurement/NewMeasurement/AthleteSelector";
import RecordPopup from '../../components/Measurement/NewMeasurement/RecordPopup';

import { useSelector } from 'react-redux';

/* ---------------------- Time Parser: mm | mm:ss | h:mm:ss ---------------------- */
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
    m = nums[0];
    if (m < 0 || m > 60) return NaN;
  } else if (parts.length === 2) {
    [m, s] = nums;
    if (m < 0 || m > 60) return NaN;
    if (s < 0 || s > 60) return NaN;
  } else if (parts.length === 3) {
    [h, m, s] = nums;
    if (h < 0) return NaN;
    if (m < 0 || m > 60) return NaN;
    if (s < 0 || s > 60) return NaN;
  }

  return h * 3600 + m * 60 + s;
}

/* ---------------------- Instruction Parser từ API ---------------------- */
/** 
 * Tách chuỗi instruction của API thành:
 * - description: phần trước "How to Perform:"
 * - steps: danh sách 1., 2., 3. ... (cắt trước các section Equipment/Safety/Supervision)
 */
function parseInstruction(instructionRaw = "") {
  const txt = String(instructionRaw).trim();

  // Cắt theo "How to Perform:"
  const split = txt.split(/^\s*How to Perform\s*:\s*/im);
  const description = split[0]?.trim() || "";

  let stepsBlock = split[1] || "";

  // Cắt phần sau steps nếu gặp các heading khác
  stepsBlock = stepsBlock.split(/^\s*(Equipment Required|Safety Considerations|Supervision Requirement)\s*:/im)[0] || stepsBlock;

  // Lấy dòng dạng "1. ...."
  const stepMatches = [...stepsBlock.matchAll(/^\s*\d+\.\s*(.+?)\s*$/gim)].map(m => m[1].trim());

  let steps = stepMatches;
  if (steps.length === 0 && stepsBlock) {
    steps = stepsBlock
      .split(/\n+/)
      .map(s => s.replace(/^[\-\*\u2022]\s*/, '').trim())
      .filter(Boolean);
  }

  return { description, steps };
}

/* Build dữ liệu hiển thị cho VideoInstruction từ selectedMeasurement (API fields) */
function buildInstructionFromMeasurementAPI(selectedMeasurement) {
  if (!selectedMeasurement) return null;

  const { instruction, video_link, thumbnail_link, name } = selectedMeasurement;
  const { description, steps } = parseInstruction(instruction || "");

  return {
    videoUrl: video_link || "",
    posterUrl: thumbnail_link || "",
    description: description || `This test measures performance in "${name || 'the selected measurement'}".`,
    steps: steps && steps.length ? steps : [
      "Prepare equipment and testing area.",
      "Explain and demo correct technique and scoring rules.",
      "Warm up adequately before the test.",
      "Perform the test per standard protocol.",
      "Record results immediately and double-check entries."
    ],
  };
}

export default function NewMeasurement() {
  const coachId = useSelector((state) => state.auth.user_id);

  // STATE dữ liệu API
  const [measurementsList, setMeasurementsList] = useState([]);
  const [athletesList, setAthletesList] = useState([]);

  // STATE lựa chọn user
  const [selectedMeasurement, setSelectedMeasurement] = useState(null);
  const [selectedAthletes, setSelectedAthletes] = useState([]);

  // STATE UI
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  /* ---------------------- Load initial data ---------------------- */
  useEffect(() => {
    const loadInitialData = async () => {
      if (!coachId) return;
      setIsLoading(true);
      try {
        const [measurementsData, athletesData] = await Promise.all([
          Measurement.listAllMeasurements(),
          Measurement.listAthletesOfCoach(coachId)
        ]);

        const mappedAthletes = athletesData.map(ath => ({
          id: ath.id, // hoặc ath.user_id tùy API
          name: `${ath.first_name} ${ath.last_name}`,
        }));

        setMeasurementsList(measurementsData);
        setAthletesList(mappedAthletes);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, [coachId]);

  const athletesToRecord = athletesList.filter(a => selectedAthletes.includes(a.id));

  /* ---------------------- Popup control ---------------------- */
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
  const handleClosePopup = () => setIsPopupOpen(false);

  /* ---------------------- Save results ---------------------- */
  const handleSaveResults = async (results) => {
    if (!selectedMeasurement) {
      console.error("Không thể lưu: không có bài đo nào được chọn.");
      return;
    }

    setIsSaving(true);

    const unit = (selectedMeasurement?.imperial_unit || '').toString().toLowerCase().trim();
    const isMinutes = ['minute', 'minutes', 'min', 'mins'].includes(unit);

    const invalids = [];
    const payloads = [];

    for (const result of results) {
      let numericValue;

      if (isMinutes) {
        if (typeof result.value === 'string') {
          const secs = parseDurationToSeconds(result.value);
          if (Number.isNaN(secs)) {
            invalids.push({ athleteId: result.athleteId, value: result.value });
            continue;
          }
          numericValue = secs; // lưu theo giây
        } else {
          const minutes = parseFloat(result.value);
          if (Number.isNaN(minutes) || minutes < 0 || minutes > 60) {
            invalids.push({ athleteId: result.athleteId, value: result.value });
            continue;
          }
          numericValue = Math.round(minutes * 60);
        }
      } else {
        const num = parseFloat(result.value);
        if (Number.isNaN(num)) {
          invalids.push({ athleteId: result.athleteId, value: result.value });
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

    if (invalids.length > 0) {
      const list = invalids.map(iv => `• Athlete ${iv.athleteId}: "${iv.value}"`).join('\n');
      alert(
        `Một số giá trị không hợp lệ (mm và ss phải ≤ 60, dạng cho phép: m | mm:ss | h:mm:ss):\n\n${list}`
      );
      setIsSaving(false);
      return;
    }

    try {
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

  /* ---------------------- Loading UI ---------------------- */
  if (isLoading) {
    return (
      <MeasurementLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      </MeasurementLayout>
    );
  }

  /* ---------------------- Build instruction VM ---------------------- */
  const instructionVM = selectedMeasurement
    ? buildInstructionFromMeasurementAPI(selectedMeasurement)
    : null;

  /* ---------------------- UI ---------------------- */
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
        {/* Chọn bài đo */}
        <Box sx={{ width: '100%', maxWidth: 900 }}>
          <SelectMeasurement
            measurementsList={measurementsList}
            selected={selectedMeasurement}
            onChange={setSelectedMeasurement}
          />
        </Box>

        {/* VideoInstruction động */}
        {selectedMeasurement ? (
          <VideoInstruction
            videoUrl={instructionVM.videoUrl}
            posterUrl={instructionVM.posterUrl}
            description={instructionVM.description}
            steps={instructionVM.steps}
          />
        ) : (
          <Box sx={{ width: '100%', maxWidth: 900 }}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  Select a measurement to view instructions.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The video tutorial and procedure will appear once you select a Measurement.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Chọn vận động viên */}
        <Box sx={{ width: '100%', maxWidth: 900 }}>
          <AthleteSelector 
            athletesList={athletesList}
            selectedAthletes={selectedAthletes} 
            onChange={setSelectedAthletes} 
          />
        </Box>

        {/* Nút mở popup ghi kết quả */}
        <Button 
          variant="contained" 
          onClick={handleOpenPopup}
          disabled={isSaving}
          sx={{ 
            width: "100%", 
            maxWidth: 900, 
            backgroundColor: "#257951", 
            color: "white", 
            fontSize: 15, 
            fontWeight: "bold", 
            textTransform: "none", 
            borderRadius: "10px", 
            p: "8px", 
            mt: "10px" 
          }}
        >
          {isSaving ? 'Đang lưu...' : 'Set Record Results'}
        </Button>
      </Box>

      {/* Popup ghi kết quả */}
      <RecordPopup
        open={isPopupOpen}
        handleClose={handleClosePopup}
        onSave={handleSaveResults}
        athletes={athletesToRecord}
        measurementUnit={selectedMeasurement?.imperial_unit || 'N/A'}
        isSaving={isSaving}
      />
    </MeasurementLayout>
  );
}
