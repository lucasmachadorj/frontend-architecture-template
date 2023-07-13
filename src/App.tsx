import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { withInjection } from "./shared/providers/injection";
import { Types } from "./shared/providers/identifiers";
import { renderedComponents } from "./renderedComponents";
import { Router } from "./routing/router";

interface Props {
  router: Router;
}

export const AppComp = observer(({ router }: Props) => {
  useEffect(() => {
    router.registerRoutes();
  }, []);

  return (
    <>
      {renderedComponents().map((route) => {
        return router.currentRoute.routeId === route.id && route.component;
      })}
    </>
  );
});

export const AppComponent = withInjection({
  router: Types.Router,
})(AppComp);
