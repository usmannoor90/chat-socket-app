import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Types
interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  status: "online" | "offline" | "away" | "busy";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  register: (data: RegisterData) => Promise<boolean>;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  displayName?: string;
  avatar?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on mount
    const token = localStorage.getItem("token");
    if (token) {
      // Validate token and fetch user data
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/validate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log("Auth validation error:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        localStorage.setItem("token", token);
        setUser(user);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log("Login error:", error);
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("respose", response);

      if (response.ok) {
        const { token, user } = await response.json();

        console.log(token, user);

        localStorage.setItem("token", token);
        setUser(user);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log("Registration error:", error);
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
