import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { withInjection } from "./shared/providers/injection";



export const AppComp = observer(() => {


  return (
    <>
    <div>Hi</div>
    </>
  );
});

export const AppComponent = withInjection({})(AppComp);
