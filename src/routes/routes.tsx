import { createBrowserRouter } from "react-router";

import App from "../App";
import ChatPage from "../pages/ChatPage";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
// import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  // Public routes
  {
    path: "/login",
    element: <Login />,
  },

  // Protected routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <h1>Welcome to the Chat Application</h1>,
          },
        ],
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
    ],
  },
]);

export default router;
