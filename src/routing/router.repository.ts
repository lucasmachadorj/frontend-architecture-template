import { inject, injectable } from "inversify";
import { NavigateParams, RouterGateway } from "./router.gateway";
import { makeObservable, observable } from "mobx";
import { Route, RouteDef, RouteId, getRoutes } from "./domain/routes";
import { RouteConfig } from "./router.domain";

export type GenericFunction = (...args: any[]) => void;

export type CurrentRoute = {
  routeId: RouteId;
  routeDef: RouteDef;
  params?: any;
};

export type UpdateCurrentRouteParams = {
  routeId: RouteId;
  params: any;
};

export type RegisterRoutesParams = {
  updateCurrentRoute: (
    updateCurrentRouteParams: UpdateCurrentRouteParams
  ) => void;
};

@injectable()
export class RouterRepository {
  currentRoute: CurrentRoute =  this.findRoute("homeLink") 

  @inject(RouterGateway) routerGateway!: RouterGateway;

  constructor() {
    makeObservable(this, {
      currentRoute: observable,
    });
  }

  registerRoutes({ updateCurrentRoute }: RegisterRoutesParams) {
    let routeConfig: RouteConfig = {};
    const routes = getRoutes();

    routes.forEach((routeArg: Route) => {
      const route = this.findRoute(routeArg.routeId);
      if (!route) {
        console.warn(`Route ${routeArg.routeId} not found`);
        return;
      }
      routeConfig[route.routeDef.path] = {
        as: route.routeId,
        uses: () => {
          updateCurrentRoute({
            routeId: route.routeId,
            params: route.routeDef,
          });
          
        },
      };
    });

    this.routerGateway.registerRoutes(routeConfig);
  }

  findRoute(routeId: string): Route  {
    const route = getRoutes().find((route) => route.routeId === routeId) 
    return route ||
    {
      routeId: "notFound",
      routeDef: { path: "/not-found", isSecure: false },
    }
  }

  updateCurrentRoute({ routeId, routeDef, params }: CurrentRoute) {
    this.currentRoute = {
      routeId,
      routeDef,
      params,
    };
  }

  goTo = async ({ routeId, params }: NavigateParams) => {
    this.routerGateway.goTo({ routeId, params });
  };
}
