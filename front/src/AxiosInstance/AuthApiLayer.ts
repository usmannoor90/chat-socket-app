import { LoginCredentials, RegisterData, User } from "@/context/AuthContext";
import axiosInstance from "./APILayerConfig";

interface AuthResponse {
  token: string;
  user: User;
}

export const AuthAPI = {
  validate: async (token: string): Promise<User> => {
    const response = await axiosInstance.request({
      method: "GET",
      url: "/auth/validate",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.request({
      method: "POST",
      url: "/auth/login",
      data: credentials,
    });
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axiosInstance.request({
      method: "POST",
      url: "/auth/register",
      data: data,
    });
    return response.data;
  },
};