import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "@/context/SocketContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
}

const Chat = () => {
  const { roomId: recipientId } = useParams();

  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Fetch chat history from the backend
  useEffect(() => {
    if (socket && recipientId) {
      socket.emit(
        "getChatHistory",
        { userId: "CURRENT_USER_ID", recipientId },
        (response: { status: string; messages: Message[] }) => {
          if (response.status === "success") {
            setMessages(response.messages);
          } else {
            console.error("Failed to fetch chat history");
          }
        }
      );
    }
  }, [socket, recipientId]);

  // Listen for incoming real-time messages
  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message: Message) => {
        setMessages((prev) => [...prev, message]);
        console.log(message);
      });
    }
    return () => {
      if (socket) {
        socket.off("receiveMessage");
      }
    };
  }, [socket]);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      const messageData: Message = {
        id: `${Date.now()}`, // or use a proper unique id generator
        senderId: "CURRENT_USER_ID",
        recipientId: recipientId || "",
        content: newMessage,
        timestamp: new Date().toISOString(),
      };

      // Emit the message to the server
      socket.emit(
        "sendMessage",
        messageData,
        (response: { status: string; message: string }) => {
          if (response.status === "success") {
            setMessages((prev) => [...prev, messageData]);
          } else {
            console.error("Failed to send message:", response.message);
          }
        }
      );

      setNewMessage("");
      setShowEmojiPicker(false);
    }
  };

  const onEmojiClick = (emojiData: { emoji: string }) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col space-y-1 ${
                message.senderId === "CURRENT_USER_ID"
                  ? "items-end"
                  : "items-start"
              }`}
            >
              <span className="text-sm font-medium">
                {message.senderId === "CURRENT_USER_ID" ? "You" : "Other"}
              </span>
              <div
                className={`p-3 rounded-lg max-w-[70%] ${
                  message.senderId === "CURRENT_USER_ID"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form
        onSubmit={sendMessage}
        className="p-4 border-t flex gap-2 items-end"
      >
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(e);
            }
          }}
        />
        <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-10 w-10"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="end">
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              width="100%"
              height={400}
            />
          </PopoverContent>
        </Popover>
        <Button type="submit" size="icon" className="h-10 w-10">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default Chat;
