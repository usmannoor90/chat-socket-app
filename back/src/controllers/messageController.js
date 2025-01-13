import mongoose from "mongoose";
import User from "../models/User.js";
import Message from "../models/Messages.js";

class MessageController {
  static async sendMessage(req, res, next) {
    try {
      const { senderId, recipientId, content } = req.body;

      console.log(req.body);

      if (!senderId || !recipientId || !content) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // Validate users

      const sender = await User.findOne({
        _id: new mongoose.Types.ObjectId(senderId),
      });
      const recipient = await User.findOne({
        _id: new mongoose.Types.ObjectId(recipientId),
      });

      if (!sender || !recipient) {
        return res
          .status(404)
          .json({ message: "Sender or recipient not found." });
      }

      // Save the message to the database
      const newMessage = await Message.create({
        senderId,
        recipientId,
        content,
      });

      return res.status(201).json({
        status: "success",
        message: "Message sent successfully.",
        data: newMessage,
      });
    } catch (error) {
      next(error); // Pass the error to the global error handler
    }
  }
}
export default MessageController;
