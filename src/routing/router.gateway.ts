import { injectable } from "inversify";
import { RouteConfig } from "./router.domain";
import { BrowserNavigator } from "./navigator.service";

export type NavigateParams = {
  routeId: string;
  params?: any;
  query?: any;
};

@injectable()
export class RouterGateway {
  private navigator: BrowserNavigator | null = null;

  async registerRoutes(routeConfig: RouteConfig) {
    if (!this.navigator) {
      this.navigator = BrowserNavigator.create("/");
    }

    this.navigator.on(routeConfig).notFound((path, state) => {
      console.log("Not found", path, state);
    });
  }

  goTo = ({ routeId, params, query }: NavigateParams) => {
    if (!this.navigator) {
      throw new Error("Navigator not initialized");
    }

    this.navigator.goTo({ routeId, query, params });
  };
}
