import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { AlertProvider } from "./contexts/AlertContext.tsx";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AlertProvider>
      <App />
    </AlertProvider>
  </BrowserRouter>
);
