import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { AuthProvider } from "./shared/context/AuthContext";
import { router } from "./router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

console.log("client:ID", import.meta.env.VITE_GOOGLE_CLIENT_ID);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
