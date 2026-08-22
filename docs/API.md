# Chat API Documentation

## Base URL

```text
https://frontend-task-chatapp.onrender.com
```

All API responses use JSON.

---

## Authentication

The API uses **Bearer Token authentication**.

After successful login, the API returns an access token.

For authenticated endpoints, include the token in the `Authorization` header:

```http
Authorization: Bearer <access_token>
```

The login endpoint does not require authentication.

---

# 1. Login

Authenticates an existing user or automatically creates a new user when the provided phone number is not registered.

There is intentionally no separate registration endpoint.

```http
POST /auth/login
```

### Request

```json
{
  "phone": "01712345678",
  "name": "Nion"
}
```

### Request Fields

| Field   | Type   | Required | Description         |
| ------- | ------ | -------: | ------------------- |
| `phone` | string |      Yes | User's phone number |
| `name`  | string |      Yes | User's display name |

### Response

**200 OK**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "usr_123",
      "name": "Nion",
      "phone": "01712345678"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Notes

- If the phone number already exists, the existing user is authenticated.
- If the phone number is new, a new user is created automatically.
- The returned `user.id` uniquely identifies the user throughout the chat system.

---

# 2. Search Users

Searches for users by name or phone number so that the current user can start a conversation.

```http
GET /users/search
```

### Authentication

Required.

```http
Authorization: Bearer <access_token>
```

### Query Parameters

| Parameter | Type   | Required | Description                         |
| --------- | ------ | -------: | ----------------------------------- |
| `q`       | string |      Yes | Name or phone number to search for  |
| `limit`   | number |       No | Maximum number of results to return |

Example:

```http
GET /users/search?q=rahim&limit=10
```

### Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "usr_456",
        "name": "Rahim Hasan",
        "phone": "01812345678"
      },
      {
        "id": "usr_789",
        "name": "Rahim Ahmed",
        "phone": "01912345678"
      }
    ]
  }
}
```

### Notes

- The authenticated user should not appear in their own search results.
- Search should support both partial name matching and phone-number matching.
- An empty result should return an empty array rather than an error.

Example:

```json
{
  "success": true,
  "data": {
    "users": []
  }
}
```

---

# 3. Create Conversation

Creates a new one-to-one conversation with another user.

```http
POST /conversations
```

### Authentication

Required.

### Request

```json
{
  "participantId": "usr_456"
}
```

### Request Fields

| Field           | Type   | Required | Description                                 |
| --------------- | ------ | -------: | ------------------------------------------- |
| `participantId` | string |      Yes | ID of the user to start a conversation with |

### Response

**201 Created**

```json
{
  "success": true,
  "message": "Conversation created successfully",
  "data": {
    "conversation": {
      "id": "conv_123",
      "type": "direct",
      "participants": [
        {
          "id": "usr_123",
          "name": "Nion",
          "phone": "01712345678"
        },
        {
          "id": "usr_456",
          "name": "Rahim Hasan",
          "phone": "01812345678"
        }
      ],
      "createdAt": "2026-08-21T16:30:00.000Z",
      "updatedAt": "2026-08-21T16:30:00.000Z"
    }
  }
}
```

### Important Behavior

If a one-to-one conversation between the two users already exists, the API should return the existing conversation instead of creating a duplicate.

This makes the operation effectively **idempotent** from the client's perspective.

---

# 4. Get Conversations

Returns all conversations belonging to the authenticated user.

```http
GET /conversations
```

### Authentication

Required.

### Query Parameters

| Parameter | Type   | Required | Description                      |
| --------- | ------ | -------: | -------------------------------- |
| `page`    | number |       No | Page number                      |
| `limit`   | number |       No | Number of conversations per page |

Example:

```http
GET /conversations?page=1&limit=20
```

### Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "id": "conv_123",
        "type": "direct",
        "name": "Rahim Hasan",
        "participants": [
          {
            "id": "usr_123",
            "name": "Nion",
            "phone": "01712345678"
          },
          {
            "id": "usr_456",
            "name": "Rahim Hasan",
            "phone": "01812345678"
          }
        ],
        "lastMessage": {
          "id": "msg_789",
          "senderId": "usr_456",
          "content": "See you tomorrow!",
          "createdAt": "2026-08-21T16:45:00.000Z"
        },
        "createdAt": "2026-08-21T16:30:00.000Z",
        "updatedAt": "2026-08-21T16:45:00.000Z"
      },
      {
        "id": "conv_456",
        "type": "group",
        "name": "Development Team",
        "participants": [
          {
            "id": "usr_123",
            "name": "Nion",
            "phone": "01712345678"
          },
          {
            "id": "usr_789",
            "name": "Karim",
            "phone": "01912345678"
          }
        ],
        "lastMessage": {
          "id": "msg_999",
          "senderId": "usr_789",
          "content": "Let's start at 10 AM.",
          "createdAt": "2026-08-21T15:30:00.000Z"
        },
        "createdAt": "2026-08-20T10:00:00.000Z",
        "updatedAt": "2026-08-21T15:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 2,
      "totalPages": 1
    }
  }
}
```

### Notes

Conversations should be ordered by `updatedAt` in descending order so that the most recently active conversation appears first.

---

# 5. Get Messages

Returns the message history for a conversation.

```http
GET /conversations/:conversationId/messages
```

### Authentication

Required.

### Path Parameters

| Parameter        | Type   | Required | Description            |
| ---------------- | ------ | -------: | ---------------------- |
| `conversationId` | string |      Yes | ID of the conversation |

### Query Parameters

| Parameter | Type   | Required | Description                  |
| --------- | ------ | -------: | ---------------------------- |
| `page`    | number |       No | Page number                  |
| `limit`   | number |       No | Number of messages to return |

Example:

```http
GET /conversations/conv_123/messages?page=1&limit=50
```

### Response

**200 OK**

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "msg_001",
        "conversationId": "conv_123",
        "sender": {
          "id": "usr_456",
          "name": "Rahim Hasan"
        },
        "content": "Hey Nion!",
        "createdAt": "2026-08-21T16:30:00.000Z"
      },
      {
        "id": "msg_002",
        "conversationId": "conv_123",
        "sender": {
          "id": "usr_123",
          "name": "Nion"
        },
        "content": "Hey! How are you?",
        "createdAt": "2026-08-21T16:31:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 2,
      "totalPages": 1
    }
  }
}
```

### Notes

- Only participants of the conversation can access its messages.
- Messages should be returned in chronological order for straightforward rendering in the chat panel.
- The frontend can use `sender.id` to determine whether a message belongs to the current user.

---

# 6. Send Message

Sends a new message to a conversation.

```http
POST /conversations/:conversationId/messages
```

### Authentication

Required.

### Path Parameters

| Parameter        | Type   | Required | Description                   |
| ---------------- | ------ | -------: | ----------------------------- |
| `conversationId` | string |      Yes | ID of the target conversation |

### Request

```json
{
  "content": "Hello! How are you?"
}
```

### Request Fields

| Field     | Type   | Required | Description     |
| --------- | ------ | -------: | --------------- |
| `content` | string |      Yes | Message content |

### Validation

The server should reject messages containing only whitespace.

Invalid:

```json
{
  "content": "   "
}
```

### Response

**201 Created**

```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "message": {
      "id": "msg_003",
      "conversationId": "conv_123",
      "sender": {
        "id": "usr_123",
        "name": "Nion"
      },
      "content": "Hello! How are you?",
      "createdAt": "2026-08-21T16:35:00.000Z"
    }
  }
}
```

### Real-Time Behavior

After successfully creating a message, the server should publish the new message to all connected participants of the conversation through the real-time channel.

The client should not need to refresh the conversation to see incoming messages.

---

# 7. Create Group

Creates a group conversation with multiple participants.

```http
POST /conversations/groups
```

### Authentication

Required.

### Request

```json
{
  "name": "Development Team",
  "participantIds": ["usr_456", "usr_789", "usr_999"]
}
```

### Request Fields

| Field            | Type     | Required | Description                                   |
| ---------------- | -------- | -------: | --------------------------------------------- |
| `name`           | string   |      Yes | Name of the group                             |
| `participantIds` | string[] |      Yes | IDs of users who should be added to the group |

### Response

**201 Created**

```json
{
  "success": true,
  "message": "Group created successfully",
  "data": {
    "conversation": {
      "id": "conv_group_123",
      "type": "group",
      "name": "Development Team",
      "participants": [
        {
          "id": "usr_123",
          "name": "Nion",
          "phone": "01712345678"
        },
        {
          "id": "usr_456",
          "name": "Rahim Hasan",
          "phone": "01812345678"
        },
        {
          "id": "usr_789",
          "name": "Karim Ahmed",
          "phone": "01912345678"
        },
        {
          "id": "usr_999",
          "name": "Fahim",
          "phone": "01612345678"
        }
      ],
      "createdAt": "2026-08-21T16:40:00.000Z",
      "updatedAt": "2026-08-21T16:40:00.000Z"
    }
  }
}
```

### Validation

The API should reject:

- Empty group names
- Duplicate participant IDs
- Invalid/non-existent users
- A request that contains fewer participants than required for a group
- The authenticated user's ID appearing multiple times

The authenticated user should automatically become a participant of the newly created group.

---

# 8. Real-Time Messages

Real-time message delivery is handled separately from the REST API.

### WebSocket Connection

```text
wss://api.example.com/ws
```

The access token should be supplied when establishing the connection.

For example:

```text
wss://api.example.com/ws?token=<access_token>
```

### Connection

```text
Client
   │
   │ WebSocket connection
   ▼
Server
   │
   │ Authenticate token
   ▼
Connection established
```

### Incoming Message Event

When another participant sends a message, the server sends an event such as:

```json
{
  "event": "message:new",
  "data": {
    "message": {
      "id": "msg_004",
      "conversationId": "conv_123",
      "sender": {
        "id": "usr_456",
        "name": "Rahim Hasan"
      },
      "content": "Are you available?",
      "createdAt": "2026-08-21T16:45:00.000Z"
    }
  }
}
```

The frontend receives this event and adds the message to the corresponding conversation in the Redux store.

### Client Flow

```text
WebSocket Event
       │
       ▼
Parse Event
       │
       ▼
Validate Message
       │
       ▼
Redux addIncomingMessage()
       │
       ▼
MessageList Re-renders
       │
       ▼
New message displayed
```

---

# 9. Error Response Format

All API errors should follow a consistent structure.

### Example

**400 Bad Request**

```json
{
  "success": false,
  "message": "Message content cannot be empty",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": {
      "content": "Message content is required"
    }
  }
}
```

### Common HTTP Status Codes

| Status | Meaning                                    |
| -----: | ------------------------------------------ |
|  `200` | Request successful                         |
|  `201` | Resource successfully created              |
|  `400` | Invalid request                            |
|  `401` | Missing or invalid authentication          |
|  `403` | User is not allowed to access the resource |
|  `404` | Resource not found                         |
|  `409` | Resource conflict                          |
|  `500` | Internal server error                      |

---

# 10. API Design Summary

| Feature                    | Method      | Endpoint                                  |
| -------------------------- | ----------- | ----------------------------------------- |
| Login                      | `POST`      | `/auth/login`                             |
| Search users               | `GET`       | `/users/search`                           |
| Create direct conversation | `POST`      | `/conversations`                          |
| Get conversations          | `GET`       | `/conversations`                          |
| Get messages               | `GET`       | `/conversations/:conversationId/messages` |
| Send message               | `POST`      | `/conversations/:conversationId/messages` |
| Create group               | `POST`      | `/conversations/groups`                   |
| Real-time messages         | `WebSocket` | `/ws`                                     |

---

# Design Decisions

### 1. Conversations are the central resource

Messages belong to conversations:

```text
Conversation
    │
    └── Messages
```

This makes both direct and group conversations use the same message API.

### 2. Direct and group conversations use the same resource

Instead of creating separate APIs such as:

```text
/direct-messages
/group-messages
```

both are represented as:

```json
{
  "type": "direct"
}
```

or:

```json
{
  "type": "group"
}
```

This keeps the API simpler and makes the frontend easier to maintain.

### 3. Login doubles as registration

Because the assignment explicitly says there is no separate registration flow, the login endpoint performs an upsert-style operation based on the phone number.

### 4. REST + WebSocket

REST is used for persistent operations:

```text
Login
Search
Create conversation
Get conversations
Get message history
Send message
Create group
```

WebSocket is used for:

```text
Real-time incoming messages
```

This separation keeps responsibilities clear.

### 5. Consistent response structure

Successful responses follow:

```json
{
  "success": true,
  "data": {}
}
```

while errors follow:

```json
{
  "success": false,
  "message": "...",
  "error": {}
}
```
