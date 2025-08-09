import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";
import "./index.css";
import store from "./redux/store.ts";
import routes from "./routes/index.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={routes} />
      <Toaster richColors duration={3000} closeButton position="bottom-left" />
    </ReduxProvider>
  </StrictMode>
);
