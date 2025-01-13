import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  profile: {
    avatar: {
      type: String,
      default: "https://example.com/default-avatar.jpg", // Default avatar
    },
    status: {
      type: String,
      enum: ["online", "offline", "away", "busy"],
      default: "offline",
    },
    statusMessage: {
      type: String,
      default: "",
    },
    timezone: {
      type: String,
      default: "UTC",
    },
  },
  chatSettings: {
    rooms: {
      type: [String],
      default: [],
    },
    contacts: {
      type: [String],
      default: [],
    },
    blockedUsers: {
      type: [String],
      default: [],
    },
    preferences: {
      notifications: {
        type: Boolean,
        default: true,
      },
      soundEnabled: {
        type: Boolean,
        default: true,
      },
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      messageRetention: {
        type: Number,
        default: 30, // days
      },
    },
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    lastActive: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accountType: {
      type: String,
      enum: ["free", "premium", "admin"],
      default: "free",
    },
    deviceTokens: {
      type: [String],
      default: [],
    },
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("passwordHash")) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// indexes
userSchema.index({ username: 1 });
userSchema.index({ displayName: 1 });
userSchema.index({ "meta.lastActive": -1 });
userSchema.index({ "profile.status": 1 });
userSchema.index({ "chatSettings.contacts": 1 });

// Add compound indexes for common queries
userSchema.index({
  "chatSettings.contacts": 1,
  "meta.lastActive": -1,
});

userSchema.index({
  username: "text",
  displayName: "text",
});

const User = mongoose.model("User", userSchema);

export default User;
