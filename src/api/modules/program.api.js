// src/api/modules/program.api.js
import { Delete } from "@mui/icons-material";
import Client from "../client.api.js";

const Program = {
  async ListAllProgramsOfUser(userId, token, type) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const params  = type && type !== "all" ? { type } : {};
    const res = await Client.get(`/programs/users/${userId}`, { headers, params });
    console.log("✅ Kết quả từ API:", res);
    return res; // axios response
  },

  async SearchProgramsByNameForUser(userId, nameQuery, token, type) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const params  = { name: nameQuery };
    if (type && type !== "all") params.type = type;
    const res = await Client.get(`/programs/users/${userId}/search`, { headers, params });
    return res;
  },

   async CreateProgram(userId, data, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await Client.post(`/programs/users/${userId}`, data, { headers });
    return res?.data ?? res;
  },
  
// Code MỚI (đã sửa)
async GetProgramDetailsById(userId, programId, token) {
  // headers cơ bản (gồm token nếu có)
  const baseHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  // Gộp headers cơ bản với headers chống cache
  const headers = {
    ...baseHeaders,
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  };

  const res = await Client.get(`/programs/users/${userId}/programs/${programId}`, { headers });
  console.log("📘 Chi tiết program:", res?.data || res);
  return res?.data ?? res;
},

  async SaveWorkout(userId, programId, programExerciseId, payload, token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await Client.post(
    `/programs/${programId}/exercises/${programExerciseId}/workouts`,
    { user_id: userId, ...payload }, // nếu BE lấy user từ token thì có thể bỏ user_id
    { headers }
  );
  return res?.data ?? res;
},
 async DeleteProgram(userId, programId, token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    
    // SỬA LỖI: Endpoint và cấu trúc gọi API xóa (DELETE)
    const res = await Client.delete(
      // Endpoint: /programs/users/{userId}/programs/{programId}
      `/programs/users/${userId}/${programId}`,
      { headers } // DELETE thường không có body, chỉ cần truyền headers
    );
    
    console.log(`❌ Program ${programId} deleted:`, res);
    return res?.data ?? res; // Trả về data hoặc toàn bộ response
  }

};

export default Program;
