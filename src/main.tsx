import "reflect-metadata";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { configure } from "mobx";
import { InjectionProvider } from "./infra/injection";
import { container } from "./infra/app.ioc";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppComponent } from "./App";

configure({
  enforceActions: "never",
  computedRequiresReaction: false,
  reactionRequiresObservable: false,
  observableRequiresReaction: false,
  disableErrorBoundaries: false,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppComponent />,
  },
]);

const rootElement = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

rootElement.render(
  <React.StrictMode>
    <InjectionProvider container={container}>
      <RouterProvider router={router} />
    </InjectionProvider>
  </React.StrictMode>
);
