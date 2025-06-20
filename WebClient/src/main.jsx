import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import CallBack from "./CallBack.jsx";
import Header from "./Header.jsx";
import Home from "./Home.jsx";
const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
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
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
