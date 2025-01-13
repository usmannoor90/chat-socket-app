import { AuthAPI } from "@/AxiosInstance/AuthApiLayer";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Types
export interface ChatSettings {
  preferences: {
    [key: string]: string;
  };
  rooms: Array<string>;
  contacts: Array<string>;
  blockedUsers: Array<string>;
}

export interface Meta {
  createdAt: string;
  lastLogin: string;
  lastActive: string;
  isVerified: boolean;
  accountType: "free" | "premium" | "enterprise";
}

export interface Profile {
  avatar: string;
  status: "online" | "offline" | "away" | "busy";
  statusMessage?: string;
  timezone: string;
}

export interface User {
  id: string;
  _id: string;
  username: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  passwordHash: string;
  chatSettings: ChatSettings;
  meta: Meta;
  profile: Profile;
  __v: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  register: (data: RegisterData) => Promise<boolean>;
  tokens: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  displayName?: string;
  avatar?: string;
  phoneNumber?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token);
      setTokens(token);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      const userData = await AuthAPI.validate(token);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Auth validation error:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const { token, user } = await AuthAPI.login(credentials);
      localStorage.setItem("token", token);
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      const { token, user } = await AuthAPI.register(data);
      localStorage.setItem("token", token);
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        register,
        tokens,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
// Custom hook with type safety
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
