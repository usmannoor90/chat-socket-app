import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { CheckCheck } from "lucide-react";

interface UserMessageCardProps {
  user: {
    _id: string;
    displayName: string;
    username: string;
    profile: {
      avatar?: string;
      status?: string;
      statusMessage?: string;
    };
    meta: {
      lastActive?: string;
    };
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
    onClick?.(user._id);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 cursor-pointer  hover:bg-gray-100 group transition-colors",
        "border-b border-gray-200",
        isSelected !== "" && isSelected === user._id && "bg-gray-100"
      )}
      onClick={handleClick}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.profile.avatar} alt={user.displayName} />
          <AvatarFallback>
            {user.displayName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        {/* {profile.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
        )} */}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white group-hover:text-gray-900  truncate">
            {user.username}
          </h3>
          <span className="text-xs text-white group-hover:text-gray-500">
            {user.meta.lastActive}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-white group-hover:text-gray-600 truncate max-w-[70%]">
            {user.profile.statusMessage}
          </p>
          {/* <div className="flex items-center gap-2">
            {profile.isMessageRead && (
              <CheckCheck className="h-4 w-4 text-blue-500" />
            )}
            {profile.unreadCount ? (
              <Badge
                variant="default"
                className="bg-green-500 hover:bg-green-500"
              >
                {profile.unreadCount}
              </Badge>
            ) : null}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserMessageCard;
