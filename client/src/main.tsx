import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { AlertProvider } from "./contexts/AlertContext.tsx";
import { ClientContextProvider } from "./contexts/ClientContext.tsx";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AlertProvider>
      <ClientContextProvider>
        <App />
      </ClientContextProvider>
    </AlertProvider>
  </BrowserRouter>
);
