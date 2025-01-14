# Real-Time Chat Application Backend

A scalable and robust backend implementation for a real-time chat application built with Node.js, Express, and Socket.IO.

## 🚀 Features

- Real-time messaging using Socket.IO
- User authentication and authorization
- Message persistence
- User management
- Scalable architecture
- RESTful API endpoints

## 🏗️ Architecture

The application follows a modular architecture with clear separation of concerns:

```
src/
├── controllers/     # Request handlers
├── lib/            # Core utilities and database connectors
├── middleware/     # Custom middleware functions
├── models/         # Data models
├── routes/         # API route definitions
└── userData/       # User-related data handling
```

```
front/
├── src/
│   ├── components/
│   │   ├── ui/               # Radix UI components
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   └── ...
│   │   ├── chat/            # Chat-specific components
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   └── EmojiPicker.tsx
│   │   ├── auth/            # Authentication components
│   │   └── layout/          # Layout components
│
│   ├── hooks/               # Custom React hooks
│   │   ├── useSocket.ts
│   │   ├── useAuth.ts
│   │   └── useChat.ts
│
│   ├── stores/              # Zustand stores
│   │   ├── authStore.ts
│   │   └── chatStore.ts
│
│   ├── lib/                 # Utility functions and constants
│   │   ├── axios.ts         # Axios instance & interceptors
│   │   ├── socket.ts        # Socket.io setup
│   │   └── utils.ts         # General utilities
│
│   ├── types/               # TypeScript type definitions
│   │   ├── auth.ts
│   │   ├── chat.ts
│   │   └── api.ts
│
│   ├── pages/               # Route pages
│   │   ├── auth/
│   │   │   ├── login.tsx
│   │   │   └── register.tsx
│   │   ├── chat/
│   │   │   ├── index.tsx
│   │   │   └── [id].tsx
│   │   └── settings/
│
│   ├── styles/              # Global styles
│   │   ├── globals.css
│   │   └── themes.css
│
│   ├── config/             # App configuration
│   │   └── constants.ts
│
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── public/                 # Static assets
├── .eslintrc.json
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Technology Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js, Vite React
- **Languages**: Javascript, Typescript
- **Real-time Communication**: Socket.IO, socket.io-client
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB

## 🚦 Prerequisites

- Node.js (v20.0.0 or higher)
- NPM (v10.9.0 or higher)
- mongoose (8.9.3)

## ⚡ Quick Start

1. Clone the repository:

```bash
git clone https://github.com/usmannoor90/chat-socket-app.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
JWT_SECRET=your_jwt_secret
PORT=8000
MONGO_DB=your_database_url
VITE_API_URL=http://localhost:8000/api/
```

4. Start the development server:

```bash
npm run dev
```

## 🔌 API Endpoints

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/verify` - Verify JWT token

### Messages

- `POST /messages/send` - Send a new message

### Users

- `GET /user/contacts` - Get user contacts
- `GET /user/contacts/search` - Get Searched user contacts
- `POST /user/contacts` - add user contact
- `DELETE /user/contacts/:contactId` - Delete user contact

## 🔗 Socket.IO Events

### Emitted Events

- `getOnlineUsers` - get online users to IO
- `sendMessage` - Client sends a message
- `getChatHistory` - get user chat history from DB
- `receiveMessage` - Client receive a message
- `connection` - socket connection
- `disconnect` - socket disconnect

### Listened Events

- `sendMessage` - Client sends a message
- `receiveMessage` - Client receive a message
- `getChatHistory` - get user chat history from DB
- `connection` - socket connection
- `disconnect` - socket disconnect

## 🛡️ Security

- JWT authentication
- Request validation
- CORS configuration

## ⚖️ Error Handling

The application uses a library named (http-errors) for handling errors.

## 🔄 Data Flow

1. Client makes a request (REST/Socket)
2. Request passes through middleware
3. Controller handles the request
4. Service layer processes business logic
5. Models interact with database
6. Response sent back to client

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🤝 Contact

For Contact, email [m.usmannoor90@gmail.com]

---
