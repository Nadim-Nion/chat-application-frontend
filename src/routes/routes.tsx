import { createBrowserRouter } from "react-router";

import App from "../App";
import ChatPage from "../pages/ChatPage";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  // Public routes
  {
    // path: "/login",
    index: true,
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
            path: "chat",
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
