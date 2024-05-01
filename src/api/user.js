import axiosInstance from "@/api/axiosInstance.js";

const fetchAllUsers = async () => {
    try {
        const response = await axiosInstance.get("/users");
        return response.data;
    } catch (error) {
        throw error;
    }
}

const addUser = async (user) => {
  try {
    const response = await axiosInstance.post("/users", user);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const deleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const updateUser = async (id, user) => {
    try {
        const response = await axiosInstance.put(`/users/${id}`, user);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export { fetchAllUsers, addUser, updateUser, deleteUser };