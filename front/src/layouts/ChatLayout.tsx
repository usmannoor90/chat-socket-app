// layouts/ChatLayout.tsx
import { Outlet } from "react-router-dom";
import { Card } from "@/components/ui/card";

const ChatLayout = () => {
  return (
    <div className="min-h-screen flex items-center w-full justify-center bg-slate-100 dark:bg-red-600">
      <Card className="w-full max-w-md h-screen p-6 space-y-6 shadow-lg"></Card>
      <div className="w-full  ">
        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayout;
