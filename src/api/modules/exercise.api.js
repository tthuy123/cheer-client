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
  async getAllExercises(page = 1, token, { searchQuery = "" } = {}) {
    try {
      let endpoint = "/exercises";
      let params = {};
      
      // Nếu có searchQuery, gọi endpoint tìm kiếm
      if (searchQuery) {
        endpoint = "/exercises/search";
        params = { name: searchQuery }; 
      } else {
        // Nếu không có query, gọi endpoint phân trang thông thường
        params = { page }; 
      }

      const res = await Client.get(endpoint, {
        params: params,
      });
      
      const responseData = res;
      const fetchedItems = responseData?.items || responseData || [];
      console.log(responseData);
      console.log(fetchedItems);


      // Nếu là kết quả Search (chỉ trả về items, không có phân trang)
      if (endpoint.includes("/search")) {
         return {
            items: Array.isArray(fetchedItems) ? fetchedItems : [], // Đảm bảo luôn là mảng
            page: 1,
            pageSize: fetchedItems.length, // Đặt pageSize bằng tổng số lượng tìm thấy
            total: fetchedItems.length,
            totalPages: 1,
         };
      }
      
      // Nếu là kết quả List (có phân trang)
      return {
          items: Array.isArray(responseData?.items) ? responseData.items : [], // Đảm bảo items là mảng
          page: responseData?.page ?? 1,
          pageSize: responseData?.pageSize ?? 10,
          total: responseData?.total ?? 0,
          totalPages: responseData?.totalPages ?? 1,
      };

    } catch (error) {
      console.error("Error fetching exercises:", error);
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
    },

};

export default Exercise;