import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Navbar from "./Navbar.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import Skeleton from "./components/Skeleton.jsx";

// 🔥 тяжёлую секцию рвём на отдельный чанк
const MobileDevSite = lazy(() => import("./MobileDevSite.jsx"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Navbar />
      <Suspense fallback={<Skeleton />}>
        <MobileDevSite />
      </Suspense>
    </ThemeProvider>
  </StrictMode>
);
