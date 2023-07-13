import { inject, injectable } from "inversify";
import { computed, makeObservable } from "mobx";
import { Router } from "./routing/router";
import { GenericFunction } from "./routing/router.repository";

@injectable()
export class AppController {
  @inject(Router) router!: Router;

  get currentRoute() {
    return this.router.currentRoute;
  }

  constructor() {
    makeObservable(this, {
      currentRoute: computed,
    });
  }

  load(onRouteChange: any) {
    const onRouteChangeWrapper: GenericFunction = () => {
      onRouteChange();
    };
    this.router.registerRoutes(onRouteChangeWrapper);
  }
}
