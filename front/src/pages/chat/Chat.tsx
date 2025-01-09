import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "@/context/SocketContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const { roomId } = useParams();

  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (socket) {
      socket.on("message", (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });
    }
  }, [socket]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      socket.emit("sendMessage", {
        roomId,
        content: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex flex-col space-y-1">
              <span className="text-sm font-medium">{message.sender}</span>
              <div className="bg-muted p-3 rounded-lg">{message.content}</div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default Chat;
