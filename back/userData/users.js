// Helper function to generate timestamps
const now = new Date().toISOString();

export const users = [
  {
    username: "john_doe",
    displayName: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+16506466506",
    passwordHash:
      "$2a$10$x0.5yympGdAU3jRi7D/Ph.BKNZoYkCCnw0KIX/YOoeTqKgTHGo4NO",
    profile: {
      avatar: "https://example.com/avatars/john.jpg",
      status: "online",
      statusMessage: "Available for chat",
      timezone: "America/New_York",
    },
    chatSettings: {
      rooms: ["room_1", "room_2"],
      contacts: ["+16506466507", "++923497424096"], // Using phone numbers for contacts
      blockedUsers: [],
      preferences: {
        notifications: true,
        soundEnabled: true,
        theme: "light",
        messageRetention: 30,
      },
    },
    meta: {
      createdAt: now,
      lastLogin: now,
      lastActive: now,
      isVerified: true,
      accountType: "free",
      deviceTokens: ["device_token_1"],
    },
  },
  {
    username: "jane_smith",
    displayName: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+16506466507",
    passwordHash:
      "$2a$10$x0.5yympGdAU3jRi7D/Ph.BKNZoYkCCnw0KIX/YOoeTqKgTHGo4NO",
    profile: {
      avatar: "https://example.com/avatars/jane.jpg",
      status: "busy",
      statusMessage: "In a meeting",
      timezone: "Europe/London",
    },
    chatSettings: {
      rooms: ["room_1", "room_3"],
      contacts: ["+16506466506", "++923497424096"], // Using phone numbers for contacts
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
  {
    username: "musmannoor90",
    displayName: "m Usman",
    email: "m.usmannoor90@gmail.com",
    phoneNumber: "+923497424096",
    passwordHash:
      "$2a$10$x0.5yympGdAU3jRi7D/Ph.BKNZoYkCCnw0KIX/YOoeTqKgTHGo4NO",
    profile: {
      avatar: "https://example.com/avatars/jane.jpg",
      status: "busy",
      statusMessage: "In a meeting",
      timezone: "Europe/London",
    },
    chatSettings: {
      rooms: ["room_1", "room_3"],
      contacts: ["+16506466506", "+16506466507,"], // Using phone numbers for contacts
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
