import { PathParams, QueryParams, RouteConfig, State } from "./router.domain";
import { NavigateParams } from "./router.gateway";

export interface Navigator {
  on(routeConfig: RouteConfig): void;
  goTo({ routeId, params, query }: NavigateParams): void;
  replace(path: string, state?: unknown): void;
  goBack(): void;
  goForward(): void;
  navigate(path: string, state?: unknown): void;
}

export class BrowserNavigator implements Navigator {
  private history: History;
  private routeConfig: RouteConfig = {};
  private notFoundHandler?: (path: string, state: any) => void;

  private constructor(
    initialPath: string,
    query?: QueryParams,
    params?: PathParams
  ) {
    this.history = window.history;
    this.navigate(initialPath, query, params);
    window.onpopstate = this.handlePopState.bind(this);
  }

  static create(initialPath: string, query?: QueryParams, params?: PathParams) {
    return new BrowserNavigator(initialPath, query, params);
  }

  navigate(
    path: string,
    query?: QueryParams,
    params?: PathParams,
    state?: unknown
  ) {
    const search = query ? `?${this.toSearchString(query)}` : "";
    const resolvedPath = params ? this.toPathString(params, path) : path;
    this.history.pushState(state, "", resolvedPath + search);
  }

  replace(
    path: string,
    query?: QueryParams,
    params?: PathParams,
    state?: State
  ) {
    const search = query ? `?${this.toSearchString(query)}` : "";
    const resolvedPath = params ? this.toPathString(params, path) : path;
    this.history.replaceState(state, "", resolvedPath + search);
  }

  goBack() {
    this.history.back();
  }

  goForward() {
    this.history.forward();
  }

  on(routeConfig: RouteConfig) {
    this.routeConfig = routeConfig;
    return this;
  }

  notFound(handler: (path: string, state: any) => void) {
    this.notFoundHandler = handler;
    return this;
  }

  goTo({ routeId, params, query }: NavigateParams) {
    Object.keys(this.routeConfig).forEach((path) => {
      if (this.routeConfig[path].as === routeId) {
        this.navigate(path, query, params);
        return;
      }
    });

    if (this.notFoundHandler) {
      this.notFoundHandler(routeId, undefined);
      return;
    }

    this.navigate("/");
  }

  private handlePopState(event: PopStateEvent) {
    const path = window.location.pathname;
    const route = this.routeConfig[path];

    if (route && event.state) {
      route.uses(event.state, event.state.search);
      return;
    }

    if (this.notFoundHandler) {
      this.notFoundHandler(path, event.state);
    }
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
}
