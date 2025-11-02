// src/api/Measurement.api.js
import Client from "../client.api.js";

const Measurement = {
  async listAllMeasurements() {
    try {
      // Client.get("/measurements") trả về response object (ví dụ: { data: { measurements: Array(47) } })
      const response = await Client.get("/measurements");
      
      // KIỂM TRA VÀ TRẢ VỀ CHÍNH XÁC MẢNG measurements
      if (response  && Array.isArray(response.measurements)) {
          return response.measurements; 
      }
      
      console.error("API trả về dữ liệu không đúng cấu trúc.");
      return []; // Trả về mảng rỗng nếu dữ liệu không hợp lệ
      
    } catch (error) {
      console.error("Lỗi khi gọi API listAllName:", error.response || error);
      return []; // Trả về mảng rỗng nếu lỗi
    }
  },
  async listAthletesOfCoach(coachId) {
    if (!coachId) {
        console.error("Thiếu coachId khi gọi listAthletesOfCoach");
        return [];
    }
    try {
      // Gọi tới GET /api/measurements/coaches/:coachId/athletes
      const response = await Client.get(`/measurements/coaches/${coachId}/athletes`);
      console.log("Dữ liệu từ API listAthletesOfCoach:", response);
      if (Array.isArray(response.athletes)) {
          return response.athletes;
      }

      console.error("API listAthletesOfCoach trả về dữ liệu không đúng cấu trúc:", response);
      return [];
    } catch (error) {
      console.error("Lỗi khi gọi API listAthletesOfCoach:", error.response?.data || error.message);
      return [];
    }
  },
  async setNewRecord(measurementData) {
    try {
      // Gọi tới POST /api/measurements/sessions
      const response = await Client.post("/measurements/sessions", measurementData);
      
      // Trả về response thành công (ví dụ: { message: "...", recordId: 123 })
      return response;
    } catch (error) {
      console.error("Lỗi khi gọi API setNewRecord:", error.response?.data || error.message);
      // Ném lỗi để component/form có thể bắt và xử lý (ví dụ: hiển thị thông báo)
      throw error.response?.data || new Error("Lỗi khi tạo bản ghi mới");
    }
  },
  async getTeamLeaderboard(coachId) {
    if (!coachId) {
        console.error("Thiếu coachId khi gọi getTeamLeaderboard");
        return [];
    }
    try {
      // Gọi tới GET /api/measurements/leaderboard/:coachId
      const response = await Client.get(`/measurements/leaderboard/${coachId}`);
      
      // Trả về mảng đã được nhóm: [ { measurement_name: ..., rankings: [...] }, ... ]
      if (Array.isArray(response)) {
        return response;
      }
      
      console.error("API getTeamLeaderboard trả về dữ liệu không đúng cấu trúc:", response);
      return [];
    } catch (error) {
      console.error("Lỗi khi gọi API getTeamLeaderboard:", error.response?.data || error.message);
      return [];
    }
  },
  async getAthleteProgress(athleteId, measurementId) {
    if (!athleteId || !measurementId) {
        console.error("Thiếu athleteId hoặc measurementId khi gọi getAthleteProgress");
        return null;
    }
    try {
      // Gọi tới GET /api/measurements/progress/:athleteId/:measurementId
      const response = await Client.get(`/measurements/progress/${athleteId}/${measurementId}`);
      
      // Trả về object: { summary: {...}, history: [...] }
      if (response && response.summary && Array.isArray(response.history)) {
        return response;
      }
      
      console.error("API getAthleteProgress trả về dữ liệu không đúng cấu trúc:", response);
      return null;
    } catch (error) {
      console.error("Lỗi khi gọi API getAthleteProgress:", error.response?.data || error.message);
      return null;
    }
  },
};

export default Measurement;