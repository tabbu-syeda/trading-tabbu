import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import CallBack from "./CallBack.jsx";
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import Explore from "./Explore.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
const AppLayout = () => {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <div>Invalid Url!</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/callback",
        element: <CallBack />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
