import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routesMapper from "./routes";

const rootContainer = document.querySelector("#root")!;
const router = createBrowserRouter(routesMapper.getRoutes());

const root = createRoot(rootContainer);

root.render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
