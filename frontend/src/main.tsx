import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Big from "./Big/Big";
// import Primary from "./routes/Primary/Primary.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Big />
  </StrictMode>
);
