import Client from "../client.api";

const Exercise = {
  async createExercise(data, token) {
    try {
      const response = await Client.post("/exercises", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating exercise:", error);
      throw error;
    }
  },
  async getAllExercises(page = 1, token) {
    try {
      const res = await Client.get("/exercises", {
        params: { page },
       // headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      // Backend trả { items, page, pageSize, total, totalPages }
      return res?.data ?? res;
    } catch (error) {
      console.error("Error fetching exercises:", error);
      // Nên ném thông điệp gọn gàng
      throw new Error(
        error?.response?.data?.message || error?.message || "Failed to load exercises"
      );
    }
  },
    async getExerciseById(id, token) {
        try {
            const response = await Client.get(`/exercises/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching exercise with id ${id}:`, error);
            throw error;
        }
    }
};

export default Exercise;