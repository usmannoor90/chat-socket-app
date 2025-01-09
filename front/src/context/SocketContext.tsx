// SocketContext.ts
import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: React.ReactNode;
  value: Socket | null;
}

export const SocketProvider = ({ children, value }: SocketProviderProps) => (
  <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
);

export const useSocket = () => useContext(SocketContext);
