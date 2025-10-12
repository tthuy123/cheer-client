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
    async getAllExercises(token) {
        try {
            const response = await Client.get("/exercises", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching exercises:", error);
            throw error;
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