import { PathParams, QueryParams, RouteConfig } from "./router.domain";
import { NavigateParams } from "./router.gateway";

export interface Navigator {
  on(routeConfig: RouteConfig): void;
  goTo({ routeId, params }: NavigateParams): void;
  replace(path: string): void;
  goBack(): void;
  goForward(): void;
  navigate(path: string): void;
}

export class BrowserNavigator implements Navigator {
  private history: History;
  private routeConfig: RouteConfig = {};

  constructor() {
    this.history = window.history;
    window.onpopstate = this.handlePopState.bind(this);
  }



  navigate(path: string, params?: PathParams) {
    const resolvedPath = params ? this.toPathString(params, path) : path;

    const route = this.routeConfig[path];

    console.log(path)

    if (!route && path === "/") {
      throw new Error("Root route not found");
    }

    if (route) {
      route.uses();
      this.history.pushState(undefined, "", resolvedPath);

      return;
    }

    this.navigate("/");
  }

  replace(path: string, params?: PathParams) {
    const resolvedPath = params ? this.toPathString(params, path) : path;
    this.history.replaceState(undefined, "", resolvedPath);
  }

  goBack() {
    this.history.back();
  }

  goForward() {
    this.history.forward();
  }

  on(routeConfig: RouteConfig) {
    this.routeConfig = routeConfig;
    this.navigateToInitialPath();
    return this;
  }

  goTo({ routeId, params }: NavigateParams) {
    Object.keys(this.routeConfig).forEach((path) => {
      if (this.routeConfig[path].as === routeId) {
        this.navigate(path, params);
        return;
      }
    });

    this.navigate("/");
  }

  private handlePopState(event: PopStateEvent) {
    const path = window.location.pathname;
    const route = this.routeConfig[path];

    if(!route) return;

    route.uses();
  }

  private toSearchString = (params: QueryParams): string => {
    return Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
  };

  private toPathString = (params: PathParams, path: string): string => {
    let result = path;
    for (const key in params) {
      result = result.replace(`:${key}`, String(params[key]));
    }
    return result;
  };

  private navigateToInitialPath() {
    const initialPath = window.location.pathname;
    this.navigate(initialPath);
  }
}
