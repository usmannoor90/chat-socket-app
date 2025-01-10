import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, User, LogOut, ArrowRightCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import UserMessageCard from "./UserMessageCard";
import { useState } from "react";

const MainLayout = () => {
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;
  const navigate = useNavigate();

  const [selectedChat, setSelectedChat] = useState("");

  const sampleUser = {
    id: "1",
    name: "John Doe",
    avatar: "/api/placeholder/32/32",
    lastMessage: "Hey, how are you doing?",
    timestamp: "10:30 AM",
    unreadCount: 3,
    isOnline: true,
    isMessageRead: false,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      {/* side bar */}
      <div className=" flex items-center  ">
        <div className="w-[420px] h-screen bg-black ">
          <header className="">
            <div className="flex h-16 items-center justify-between w-full px-4 ">
              <nav className="text-white ">username</nav>
              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-11 w-11 rounded-full bg-white !p-2 "
                  >
                    <User color="black" size={32} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <div className="   ">
            <form className="px-2">
              <Label className="  relative  ">
                <Input
                  type="text"
                  className=" h-[42px] text-white   "
                  placeholder="Find User..."
                />
                <Button
                  type="submit"
                  className="  absolute top-[50%] translate-y-[-50%] right-2 p-2 h-[30px] w-[30px] rounded-full   "
                  variant={"secondary"}
                >
                  <ArrowRightCircle />
                </Button>
              </Label>
            </form>
            <div className=" space-y-1 py-4 ">
              {Array.from([1, 2, 3, 4, 5, 8, 52, 56, 47, 55, 53]).map(
                (_, index) => {
                  return (
                    <UserMessageCard
                      key={index}
                      user={sampleUser}
                      isSelected={selectedChat}
                      onClick={(userId) => {
                        setSelectedChat(userId);
                        navigate(`/chat/${userId}`);
                      }}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="container mx-auto min-h-screen ">
          <header className="border-b">
            <div className="flex h-16 items-center "></div>
          </header>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
