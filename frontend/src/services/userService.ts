import axios, { AxiosResponse } from "axios";
import { UserDto } from "../models/userDto";
import { GetUsersResponse } from "../models/getUsersResponse";
import { API_BASE_URL } from "../../config"
import { GetUsersByIdResponse } from "../models/getUsersByIdResponse";

const userService = {

    getUsers: async (): Promise<UserDto[]> => {
        try {
            const response: AxiosResponse<GetUsersResponse> =
                await axios.get(`${API_BASE_URL}/users`);
            const users = response.data.userDtos;

            return users
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
            const response = await axios.get<GetUsersByIdResponse>(`${API_BASE_URL}/users/${userId}`);
            return response.data.userDto;
        } catch (error) {
            console.log("Error fetching user:", error);
            throw error;
        }
    }

}

export default userService;