import mongoose from "mongoose";

// MongoDB Models
const MessageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  recipientId: { type: String, required: true },
  content: { type: String },
  media: { type: String }, // URL for picture, GIF, or video
  mediaType: { type: String }, // e.g., "image", "video", or "gif"
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

export default Message;
