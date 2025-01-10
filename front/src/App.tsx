import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// shadcn components
import { ThemeProvider as ShadcnThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

// Layout Components
import MainLayout from "@/components/custom/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Page Components
import Login from "./pages/auth/Login";
import Register from "@/pages/auth/Register";
import Chat from "./pages/chat/Chat";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import NotFound from "@/pages/NotFound";

// Context
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketContext";
import StartChat from "./pages/StartChat";

// Guards
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const authContext = useAuth();
  const isAuthenticated = authContext ? authContext.isAuthenticated : false;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const authContext = useAuth();
  const isAuthenticated = authContext ? authContext.isAuthenticated : false;
  return !isAuthenticated ? children : <Navigate to="/chat" />;
};

function AppContent() {
  const authContext = useAuth();
  const isAuthenticated = authContext ? authContext.isAuthenticated : false;
  const user = authContext ? authContext.user : null;
  const [socket, setSocket] = useState<Socket | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && user) {
      const newSocket = io(`http://localhost:8000/`, {
        auth: {
          token: localStorage.getItem("token"),
        },
        query: {
          userId: user.id,
        },
      });

      newSocket.on("connect", () => {
        toast({
          title: "Connected to chat",
          description: "You're now online",
        });
      });

      newSocket.on("disconnect", () => {
        toast({
          title: "Disconnected",
          description: "Connection lost",
          variant: "destructive",
        });
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [isAuthenticated, user, toast]);

  return (
    <SocketProvider value={socket}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
          </Route>

          {/* Protected Routes */}

          <Route
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<StartChat />} />
            <Route path="/chat/:roomId" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Redirect root to chat or login */}
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/chat" : "/login"} replace />
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </SocketProvider>
  );
}

function App() {
  return (
    <ShadcnThemeProvider defaultTheme="dark">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ShadcnThemeProvider>
  );
}

export default App;
