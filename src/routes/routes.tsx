import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: '/',
      element: <h1>Welcome to the Chat Application</h1>,
    }],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
