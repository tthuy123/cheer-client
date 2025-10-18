// src/api/Measurement.api.js
import Client from "../client.api.js";

const Measurement = {
  async listAllName() {
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
};

export default Measurement;