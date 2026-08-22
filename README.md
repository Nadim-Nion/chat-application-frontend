# 🚀 Chat Application (Frontend)

---

A modern, scalable, and production-ready frontend for a real-time **Chat Application**, built with React, TypeScript, and modern frontend technologies.

The project focuses on a clean, maintainable, and modular architecture while providing a responsive user experience and real-time communication capabilities.

---

## 📚 Project Resources

### 🔗 Links

| Resource | Description | Link |
|----------|-------------|------|
| 📦 **GitHub Repository** | Source code and project documentation | [View Repository](https://github.com/Nadim-Nion/chat-application-frontend) |
| 🌐 **Live URL — Part 1** | Live deployment for Part 1 | [View Live Demo](Add-Live-URL) |
| 🌐 **Live URL — Part 2** | Live deployment for Part 2 | [View Live Demo](Add-Live-URL) |

---

## 📝 Part 3 — Q&A

### 1. What architectural pattern did you choose?

> I have chosen modular pattern. Where I have created separated folder or component structure for chat where I have stored Chat Header, Conversation Item, Conversation List, Message Bubble, Message Input etc. I have made everything in the separate component to manage it perfectly. So that whenever my project grows I can refactor it easily without breaking the system.

---

### 2. Question 2

> Didn't attempt

---

### 3. How did you approach responsive design?

> I mostly used AI to add responsive design. Firstly, I have implemented the basic design, then add responsive design by the help of AI. I use AI as my coding partner. Before pasting the code, I preview the AI generated code as a code reviewer. I read every line of code before implementing to my project.

---

### 4. What would you improve if you had more time?

> To be honest, Time is too short for me to implement this beautiful project. If I get 10 hours more, I would implement all the APIs and Part 2 landing page.

---

## 🏗️ Project Architecture

The application follows a modular and scalable architecture designed to keep the codebase clean, maintainable, and easy to extend.

Key architectural principles include:

- Component-based UI development
- Separation of concerns
- Centralized state management
- Reusable components
- Protected routes
- Form validation
- Real-time communication
- Type-safe development with TypeScript

---

## ✨ Features

- 🔐 User authentication
- 👤 User profile management
- 💬 Real-time messaging
- 🔔 Real-time notifications
- 🟢 Online/offline user status
- 🔒 Protected routes
- 📱 Responsive interface
- ⚡ Fast client-side navigation
- 📝 Form validation
- 🗂️ Centralized application state
- 🔄 Real-time updates using Socket.io

---

## 🔑 Authentication Flow

The application uses a simplified authentication flow:

1. User enters their **name** and **phone number**.
2. The frontend sends the information to the authentication API.
3. If the phone number already exists, the user is logged in.
4. If the phone number is new, the API automatically creates a new user.
5. The API returns authentication information.
6. The user is redirected to the chat application.
7. Protected routes prevent unauthenticated users from accessing the chat.

```text
User
  │
  ├── Name
  └── Phone Number
        │
        ▼
   Login API
        │
   ┌────┴────┐
   │         │
Existing   New User
   │         │
Login      Register
   │         │
   └────┬────┘
        │
        ▼
 Authentication
        │
        ▼
      /chat

```

---

## 📦 Tech Stack

- React – Library for building user interfaces
- React Router – Client-side routing for navigation
- Redux Toolkit – Simplified global state management
- TypeScript – Strongly typed JavaScript
- Ant Design – UI component library for building modern interfaces
- Socket.io – Real-time bidirectional communication between client and server
- React Hook Form - A lightweight library for managing form state, handling form submissions, and providing efficient client-side form validation.

---

## 📁 Project Structure

```bash
├── node_modules/
├── public/
├── src/
│   ├── assets/                # Static files (images, fonts, etc.)
│   ├── components/            # Reusable components
│   │   ├── form/              # Form-related components
│   │   ├── layout/            # Layout components
│   │   │   └── MainLayout.tsx
│   │   └── ui/                # Shared UI components
│   ├── config/                # App configuration
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Helper libraries / wrappers
│   ├── pages/                 # Application pages
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── redux/                 # State management (Redux Toolkit)
│   │   ├── api/               # API setup (RTK Query)
│   │   │   └── baseApi.ts
│   │   ├── features/          # Feature slices
│   │   ├── hooks.ts           # Typed Redux hooks
│   │   └── store.ts           # Store configuration
│   ├── routes/                # Routing configuration
│   │   └── routes.tsx
│   ├── styles/                # Global styles
│   ├── utils/                 # Utility functions
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx               # App entry point
│
├── .env.example
├── .env.local
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Nadim-Nion/react-project-setup
cd react-project-setup
```

### 2. Install dependencies

```bash
# Install dependencies
npm install @reduxjs/toolkit antd react react-dom react-hook-form react-redux react-router

# Install dev dependencies
npm install -D @eslint/js @types/node @types/react @types/react-dom @vitejs/plugin-react eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals typescript typescript-eslint vite
```

### 3. Create environment file

Create a .env file in the root directory and add:

```bash
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=react-project-setup
```

Follow .env.example file to know about the .env structure

---

## ▶️ Running the Application

### Development mode

```bash
npm run dev
```

### Production build

```bash
npm run build
```

---

## 🧪 Scripts

```bash
npm run dev        # Start development server (with hot reload)
npm run build      # Build the app for production
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint
```

---

## 🛠️ Features

Here’s your rewritten version tailored for a React frontend project:

---

- Modular architecture for scalability
- Type-safe development with TypeScript
- Centralized state management using Redux Toolkit
- Environment-based configuration (Vite `.env`)
- Clean and maintainable folder structure
- Client-side routing with React Router
- Reusable UI components with Ant Design
- Form handling with React Hook Form

---

## 🖼️ Screenshots

### Home Page

![Home Page](https://your-image-url.com/home.png)

### Dashboard

![Dashboard](https://your-image-url.com/dashboard.png)

### Mobile View

![Mobile View](https://your-image-url.com/mobile.png)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Fork the repository
- Create a new branch
- Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## ✨ Author

Nadim Mahmud Nion <br />
Full Stack (MERN) Developer
