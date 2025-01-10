import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCheck } from "lucide-react";

interface UserMessageCardProps {
  user: {
    id: string;
    name: string;
    avatar?: string;
    lastMessage: string;
    timestamp: string;
    unreadCount?: number;
    isOnline?: boolean;
    isMuted?: boolean;
    isMessageRead?: boolean;
  };
  isSelected?: string;
  onClick?: (userId: string) => void;
}

const UserMessageCard = ({
  user,
  isSelected = "",
  onClick,
}: UserMessageCardProps) => {
  const handleClick = () => {
    onClick?.(user.id);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 cursor-pointer  hover:bg-gray-100 group transition-colors",
        "border-b border-gray-200",
        isSelected !== "" && isSelected === user.id && "bg-gray-100"
      )}
      onClick={handleClick}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        {user.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white group-hover:text-gray-900  truncate">
            {user.name}
          </h3>
          <span className="text-xs text-white group-hover:text-gray-500">
            {user.timestamp}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-white group-hover:text-gray-600 truncate max-w-[70%]">
            {user.lastMessage}
          </p>
          <div className="flex items-center gap-2">
            {user.isMessageRead && (
              <CheckCheck className="h-4 w-4 text-blue-500" />
            )}
            {user.unreadCount ? (
              <Badge
                variant="default"
                className="bg-green-500 hover:bg-green-500"
              >
                {user.unreadCount}
              </Badge>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMessageCard;
