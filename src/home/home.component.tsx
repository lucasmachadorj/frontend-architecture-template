import * as React from "react";
import { observer } from "mobx-react";
import { withInjection } from "../infra/injection";

type Props = {};

export const HomeComp = observer((props: Props) => {
  return (
    <>
      <h1>Home</h1>
    </>
  );
});

export const HomeComponent = withInjection({})(HomeComp);
