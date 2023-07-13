import { inject, injectable } from "inversify";
import { NavigateParams, RouterGateway } from "./router.gateway";
import { makeObservable, observable } from "mobx";
import { Route, RouteDef, RouteId, getRoutes } from "./routes";

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
    let routeConfig: Record<string, any> = {};
    const routes = getRoutes();
    routes.forEach((routeArg: Route) => {
      const route = this.findRoute(routeArg.routeId);
      routeConfig[route.routeDef.path] = {
        as: route.routeId,
        uses: (match: any) => {
          updateCurrentRoute({
            routeId: route.routeId,
            params: route.routeDef,
            query: match.queryString,
          });
          if (this.onRouteChanged) {
            this.onRouteChanged();
          }
        },
      };
    });
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

  goToId = async ({ routeId, params, query }: NavigateParams) => {
    this.routerGateway.goToId({ routeId, params, query });
  };
}
