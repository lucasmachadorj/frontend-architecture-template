import { inject, injectable } from "inversify";
import {
  GenericFunction,
  RouterRepository,
  UpdateCurrentRouteParams,
} from "./router.repository";
import { action, computed, makeObservable } from "mobx";

@injectable()
export class Router {
  @inject(RouterRepository) routerRepository!: RouterRepository;

  get currentRoute() {
    return this.routerRepository.currentRoute;
  }

  constructor() {
    makeObservable(this, {
      currentRoute: computed,
      updateCurrentRoute: action,
    });
  }

  updateCurrentRoute({
    routeId: newRouteId,
    params,
    query,
  }: UpdateCurrentRouteParams) {
    const oldRoute = this.routerRepository.findRoute(this.currentRoute.routeId);
    const newRoute = this.routerRepository.findRoute(newRouteId);
    const routeChanged = oldRoute.routeId !== newRoute.routeId;
    // verify if has token
    const hasToken = false;
    const protectedOrUnauthenticatedRoute =
      (newRoute.routeDef.isSecure && !hasToken) ||
      newRoute.routeDef.path === "*";

    const publicOrAuthenticatedRoute =
      (newRoute.routeDef.isSecure && hasToken) ||
      newRoute.routeDef.isSecure === false;

    if (routeChanged) {
      this.routerRepository.onRouteChanged();

      if (protectedOrUnauthenticatedRoute) {
        this.routerRepository.goToId({ routeId: "loginLink" });
        return;
      }

      if (publicOrAuthenticatedRoute) {
        if (oldRoute.onLeave) oldRoute.onLeave();
        if (newRoute.onEnter) newRoute.onEnter();
        this.routerRepository.updateCurrentRoute({
          routeId: newRouteId,
          routeDef: newRoute.routeDef,
          params,
          query,
        });
      }
    }
  }

  registerRoutes(onRouteChanged: GenericFunction) {
    this.routerRepository.registerRoutes({
      updateCurrentRoute: this.updateCurrentRoute,
      onRouteChanged,
    });
  }
}
