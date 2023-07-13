import "reflect-metadata";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { configure } from "mobx";
import { InjectionProvider } from "./shared/providers/injection";
import { container } from "./infra/app.ioc";
import { AppComponent } from "./App";

configure({
  enforceActions: "never",
  computedRequiresReaction: false,
  reactionRequiresObservable: false,
  observableRequiresReaction: false,
  disableErrorBoundaries: false,
});

const rootElement = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

rootElement.render(
  <React.StrictMode>
    <InjectionProvider container={container}>
      <AppComponent />
    </InjectionProvider>
  </React.StrictMode>
);
