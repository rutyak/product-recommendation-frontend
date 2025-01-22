import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import App from "./App";
import Home from "./pages/Home/Home";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signup";
const Profile = lazy(() => import("./pages/Profile/Profile"));

const Fallback = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin border-4 border-t-4 border-gray-500 border-solid w-16 h-16 rounded-full"></div>
    <span className="ml-4 text-xl text-gray-700">Loading...</span>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      // {
      //   path: "createShopping",
      //   element: (
      //     <PrivateRoute>
      //        <Cart />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "profile",
        element: (
          <Suspense fallback={<Fallback />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
