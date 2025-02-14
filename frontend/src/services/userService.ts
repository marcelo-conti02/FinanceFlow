import axios, { AxiosResponse } from "axios";
import { UserDto } from "../models/userDto";
import { API_BASE_URL } from "../../config"

const userService = {

    getUsers: async (): Promise<UserDto[]> => {
        try {
            const response: AxiosResponse<UserDto[]> =
                await axios.get(`${API_BASE_URL}/users`);
            return response.data;
        } catch (error) {
            console.log("Error fetching users:", error);
            throw error;
        }
    },

    createUser: async (user: UserDto): Promise<UserDto> => {
        try {
            const response = await axios.post<UserDto>(`${API_BASE_URL}/users`, user);
            return response.data;
        } catch (error) {
            console.log("Error creating user", error)
            throw error;
        }
    },

    getUserById: async (userId: number): Promise<UserDto | undefined> => {
        try {
            const response = await axios.get<UserDto>(`${API_BASE_URL}/users/${userId}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching user:", error);
            throw error;
        }
    }

}

export default userService;