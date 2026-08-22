export interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  name: string;
  type: "direct" | "group";
  participants: User[];
  lastMessage?: Message;
}

export const currentUser: User = {
  id: "user-1",
  name: "Nion",
  phone: "+8801712345678",
};

export const users: User[] = [
  {
    id: "user-2",
    name: "Alice",
    phone: "+8801812345678",
  },
  {
    id: "user-3",
    name: "Bob",
    phone: "+8801912345678",
  },
  {
    id: "user-4",
    name: "Charlie",
    phone: "+8801612345678",
  },
];

export const conversations: Conversation[] = [
  {
    id: "conversation-1",
    name: "Alice",
    type: "direct",
    participants: [currentUser, users[0]],
  },
  {
    id: "conversation-2",
    name: "Bob",
    type: "direct",
    participants: [currentUser, users[1]],
  },
  {
    id: "conversation-3",
    name: "Developers",
    type: "group",
    participants: [currentUser, users[0], users[1]],
  },
  {
    id: "conversation-4",
    name: "Charlie",
    type: "direct",
    participants: [currentUser, users[2]],
  },
];

export const messages: Record<string, Message[]> = {
  "conversation-1": [
    {
      id: "message-1",
      senderId: "user-2",
      content: "Hey Nion! How are you?",
      createdAt: "2026-08-22T09:30:00Z",
    },
    {
      id: "message-2",
      senderId: "user-1",
      content: "I'm doing great! How about you?",
      createdAt: "2026-08-22T09:31:00Z",
    },
    {
      id: "message-3",
      senderId: "user-2",
      content: "I'm good. Are you working on the chat app?",
      createdAt: "2026-08-22T09:32:00Z",
    },
    {
      id: "message-4",
      senderId: "user-1",
      content: "Yes! I'm implementing the real-time messaging now.",
      createdAt: "2026-08-22T09:33:00Z",
    },
  ],

  "conversation-2": [],

  "conversation-3": [
    {
      id: "message-5",
      senderId: "user-3",
      content: "Good morning everyone!",
      createdAt: "2026-08-22T08:00:00Z",
    },
    {
      id: "message-6",
      senderId: "user-1",
      content: "Morning! Let's start at 10.",
      createdAt: "2026-08-22T08:02:00Z",
    },
  ],

  "conversation-4": [],
};