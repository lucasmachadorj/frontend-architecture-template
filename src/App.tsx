import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { withInjection } from "./shared/providers/injection";
import { AppController } from "./app.controller";
import { Types } from "./shared/providers/identifiers";
import { renderedComponents } from "./renderedComponents";

interface Props {
  controller: AppController;
}

export const AppComp = observer(({ controller }: Props) => {
  useEffect(() => {
    const onRouteChange = () => {};
    controller.load(onRouteChange);
  }, []);

  return (
    <>
      {renderedComponents().map((route) => {
        return controller.currentRoute.routeId === route.id && route.component;
      })}
    </>
  );
});

export const AppComponent = withInjection({
  controller: Types.AppController,
})(AppComp);
