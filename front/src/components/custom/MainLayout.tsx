import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, MessageSquare, Settings, User, LogOut } from "lucide-react";

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const auth = useAuth();
  const user = auth?.user;
  const logout = auth?.logout;
  const navigate = useNavigate();

  const onNavigate = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          {/* Mobile menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="flex flex-col space-y-4">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => onNavigate("/chat")}
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Chat
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => onNavigate("/profile")}
                >
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => onNavigate("/settings")}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-4 mx-6">
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => navigate("/chat")}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Chat
            </Button>
          </nav>

          <div className="ml-auto flex items-center space-x-4">
            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.username} />
                    <AvatarFallback>
                      {user?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
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
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
