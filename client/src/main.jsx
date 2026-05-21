// client/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRoutes";
import AuthProvider from "./context/AuthContext";
import ElectionProvider from "./context/ElectionContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ElectionProvider>
        <RouterProvider router={router} />
      </ElectionProvider>
    </AuthProvider>
  </React.StrictMode>
);