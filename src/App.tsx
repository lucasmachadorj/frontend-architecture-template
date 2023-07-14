import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { withInjection } from "./infra/injection";

export const AppComp = observer(() => {
  return (
    <>
      <div>Hi</div>
    </>
  );
});

export const AppComponent = withInjection({})(AppComp);
