import React from "react";
import ReactDOM from "react-dom/client";

import { Routes } from "@generouted/react-router";

import "@spec-team/ui/styles/user-colors.css";

import { AuthProvider } from "./lib/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>,
);
