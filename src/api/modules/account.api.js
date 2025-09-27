import Client from "../client.api";

const Account = {
  async login(data) {
    try {
      const response = await Client.post("/account/login", data);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async signUp(data) {
    try {
      const response = await Client.post("/account/register", data);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async getAllUsers() {
    try {
      const response = await Client.get("/account/all");
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async deleteUser(id) {
    try {
      const response = await Client.delete(`/account/delete/${id}`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
  async getUserById(id) {
    try {
      const response = await Client.get(`/account/${id}`);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  },
    
     async updateUser(id, data, token) {
        try {
            const response = await Client.put(`/account/${id}`, data, {
                headers: {
                    token: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async changePassword(id, data, token) {
        try {
            const response = await Client.put(`/account/update-password/${id}`, data, {
                headers: {
                    token: `Bearer ${token}`,
                },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
    },
    async getUserProfile(id, token) {
        try {
            const response = await Client.get(`/account/profile/${id}`, {
                headers: {
                    token: `Bearer ${token}`,
                },
            });
            return response;
        } catch (error) {
            if (error.response) {
                return error.response;
            }
        }
}
};
export default Account;