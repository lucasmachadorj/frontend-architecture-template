import { inject, injectable } from "inversify";
import { NavigateParams, RouterGateway } from "./router.gateway";
import { makeObservable, observable } from "mobx";
import { Route, RouteDef, RouteId, getRoutes } from "./routes";
import { RouteConfig } from "./router.domain";

export type GenericFunction = (...args: any[]) => void;

export type CurrentRoute = {
  routeId: RouteId;
  routeDef: RouteDef;
  params: any;
  query: any;
};

export type UpdateCurrentRouteParams = {
  routeId: RouteId;
  params: any;
  query: any;
};

export type RegisterRoutesParams = {
  updateCurrentRoute: (
    updateCurrentRouteParams: UpdateCurrentRouteParams
  ) => void;
  onRouteChanged: GenericFunction;
};

@injectable()
export class RouterRepository {
  currentRoute: CurrentRoute = {
    routeId: "loginLink",
    routeDef: { path: "", isSecure: false },
    params: {},
    query: {},
  };

  onRouteChanged: GenericFunction = () => {};

  @inject(RouterGateway) routerGateway!: RouterGateway;

  constructor() {
    makeObservable(this, {
      currentRoute: observable,
    });
  }

  registerRoutes({ updateCurrentRoute, onRouteChanged }: RegisterRoutesParams) {
    this.onRouteChanged = onRouteChanged;
    let routeConfig: RouteConfig = {};
    const routes = getRoutes();

    routes.forEach((routeArg: Route) => {
      const route = this.findRoute(routeArg.routeId);
      routeConfig[route.routeDef.path] = {
        as: route.routeId,
        uses: (queryString: string) => {
          updateCurrentRoute({
            routeId: route.routeId,
            params: route.routeDef,
            query: queryString,
          });
          if (this.onRouteChanged) {
            this.onRouteChanged();
          }
        },
      };
    });

    this.routerGateway.registerRoutes(routeConfig);
  }

  findRoute(routeId: string): Route {
    const route = getRoutes().find((route) => route.routeId === routeId);
    return (
      route || {
        routeId: "loadingSpinner",
        routeDef: { path: "", isSecure: false },
      }
    );
  }

  updateCurrentRoute({ routeId, routeDef, params, query }: CurrentRoute) {
    this.currentRoute = {
      routeId,
      routeDef,
      params,
      query,
    };
  }

  goTo = async ({ routeId, params, query }: NavigateParams) => {
    this.routerGateway.goTo({ routeId, params, query });
  };
}
