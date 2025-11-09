// src/api/modules/checkoff.api.js
import Client from "../client.api";

const Checkoff = {
  // Tạo mới checkoff
  async createNewCheckoff(data, token) {
    try {
      const response = await Client.post("/checkoffs/new", data, {
        headers: token
          ? { token: `Bearer ${token}` }
          : undefined,
      });
      return response;
    } catch (error) {
      if (error.response) return error.response;
    }
  },

  // Lấy review
  async getCheckoffReviewByCoach(coachId, token) {
    try {
      const response = await Client.get(`/checkoffs/review/${coachId}`, {
        headers: token
          ? { token: `Bearer ${token}` }
          : undefined,
      });
      return response;
    } catch (error) {
      if (error.response) return error.response;
    }
  },

  // Thêm comment của coach vào checkoff
  // data ví dụ: { coach_id: "...", comment: "Nội dung nhận xét" }
  async addCoachComment(submitId, data, token) {
    try {
      const response = await Client.post(`/checkoffs/comment/${submitId}`, data, {
        headers: token
          ? { token: `Bearer ${token}` }
          : undefined,
      });
      return response;
    } catch (error) {
      if (error.response) return error.response;
    }
  },
};

export default Checkoff;
