// Helper function to generate timestamps
const now = new Date().toISOString();

export const users = [
  {
    id: "user_1", // Using string IDs for better scalability
    username: "john_doe",
    displayName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+16506466506",
    // Never store plain passwords - this should be hashed in production
    passwordHash: "$2a$10$someHashedPasswordHere",
    profile: {
      avatar: "https://example.com/avatars/john.jpg",
      status: "online", // online, offline, away, busy
      statusMessage: "Available for chat",
      timezone: "America/New_York",
    },
    chatSettings: {
      rooms: ["room_1", "room_2"],
      contacts: ["user_2", "user_3"],
      blockedUsers: [],
      preferences: {
        notifications: true,
        soundEnabled: true,
        theme: "light",
        messageRetention: 30, // days
      },
    },
    meta: {
      createdAt: now,
      lastLogin: now,
      lastActive: now,
      isVerified: true,
      accountType: "free", // free, premium, admin
      deviceTokens: ["device_token_1"], // for push notifications
    },
  },
  {
    id: "user_2",
    username: "jane_smith",
    displayName: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+16506466507",
    passwordHash: "$2a$10$someHashedPasswordHere",
    profile: {
      avatar: "https://example.com/avatars/jane.jpg",
      status: "busy",
      statusMessage: "In a meeting",
      timezone: "Europe/London",
    },
    chatSettings: {
      rooms: ["room_1", "room_3"],
      contacts: ["user_1", "user_4"],
      blockedUsers: [],
      preferences: {
        notifications: true,
        soundEnabled: false,
        theme: "dark",
        messageRetention: 30,
      },
    },
    meta: {
      createdAt: now,
      lastLogin: now,
      lastActive: now,
      isVerified: true,
      accountType: "premium",
      deviceTokens: ["device_token_2"],
    },
  },
];

// Helper functions for user management
export const findUserById = (id) => users.find((user) => user.id === id);

export const findUserByEmail = (email) =>
  users.find((user) => user.email === email);

export const getUserContacts = (userId) => {
  const user = findUserById(userId);
  if (!user) return [];
  return users.filter((u) => user.chatSettings.contacts.includes(u.id));
};

export const getUserRooms = (userId) => {
  const user = findUserById(userId);
  return user ? user.chatSettings.rooms : [];
};

export const updateUserStatus = (userId, status) => {
  const user = findUserById(userId);
  if (user) {
    user.profile.status = status;
    user.meta.lastActive = new Date().toISOString();
  }
};

// Validation helper
export const validateUser = (user) => {
  const required = ["username", "email", "passwordHash"];
  const missing = required.filter((field) => !user[field]);

  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email)) {
    throw new Error("Invalid email format");
  }

  return true;
};
