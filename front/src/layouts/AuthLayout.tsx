// layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";
import { Card } from "@/components/ui/card";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center w-full justify-center bg-slate-100 dark:bg-slate-900">
      <Card className="w-full max-w-md p-6 space-y-6 shadow-lg">
        <Outlet />
      </Card>
    </div>
  );
};

export default AuthLayout;
