// src/api/modules/program.api.js
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
};

export default Program;
