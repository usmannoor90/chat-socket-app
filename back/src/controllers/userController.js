import mongoose from "mongoose";
import User from "../models/User.js";

class UserController {
  static async GetContactsUsers(req, res, next) {
    try {
      // Extract userId from the request
      const userId = await req.userId;

      // Fetch user to get the contacts list

      const { chatSettings } = await User.findOne({
        _id: new mongoose.Types.ObjectId(userId),
      })
        .select("chatSettings.contacts")
        .lean();
      console.log("user id ", chatSettings.contacts);

      if (!chatSettings || !chatSettings.contacts) {
        return res.status(404).json({ message: "User or contacts not found" });
      }

      // Create query to find users in the contacts list
      const query = {
        phoneNumber: { $in: chatSettings.contacts },
      };

      // Execute query with projection
      const contacts = await User.find(query)
        .select({
          username: 1,
          displayName: 1,
          "profile.avatar": 1,
          "profile.status": 1,
          "profile.statusMessage": 1,
          "meta.lastActive": 1,
          _id: 1,
        })
        .lean();

      // Return the contacts data
      return res.json({ contacts });
    } catch (error) {
      next(error); // Pass error to the error handler
    }
  }

  static async AddContact(req, res, next) {
    try {
      const { contactId } = req.body;
      const { user } = req;

      // Validate if contact exists
      const contactExists = await User.findById(contactId);
      if (!contactExists) {
        return res.status(404).json({ message: "Contact not found" });
      }

      // Check if already in contacts
      if (user.chatSettings.contacts.includes(contactId)) {
        return res.status(400).json({ message: "Contact already exists" });
      }

      // Add contact
      await User.findByIdAndUpdate(
        user._id,
        {
          $addToSet: { "chatSettings.contacts": contactId },
        },
        { new: true }
      );

      res.json({ message: "Contact added successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async RemoveContact(req, res, next) {
    try {
      const { contactId } = req.params;
      const { user } = req;

      await User.findByIdAndUpdate(
        user._id,
        {
          $pull: { "chatSettings.contacts": contactId },
        },
        { new: true }
      );

      res.json({ message: "Contact removed successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async SearchContacts(req, res, next) {
    try {
      const { query = "", page = 1, limit = 20 } = req.query;
      const { user } = req;

      const searchQuery = {
        _id: { $in: user.chatSettings.contacts },
        $or: [
          { username: { $regex: query, $options: "i" } },
          { displayName: { $regex: query, $options: "i" } },
        ],
      };

      const contacts = await User.find(searchQuery)
        .select({
          username: 1,
          displayName: 1,
          "profile.avatar": 1,
          "profile.status": 1,
          _id: 1,
        })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .lean();

      const totalResults = await User.countDocuments(searchQuery);

      res.json({
        contacts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalResults / limit),
          totalResults,
          hasMore: page * limit < totalResults,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
