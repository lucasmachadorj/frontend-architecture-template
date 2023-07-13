import { injectable } from "inversify";
import { RouteConfig } from "./router.domain";
import { BrowserNavigator } from "./navigator.service";

export type NavigateParams = {
  routeId: string;
  params?: any;
};

@injectable()
export class RouterGateway {
  private navigator: BrowserNavigator | null = null;

  async registerRoutes(routeConfig: RouteConfig) {
    if (!this.navigator) {
      this.navigator = new BrowserNavigator()
    }

    this.navigator.on(routeConfig);
  }

  goTo = ({ routeId, params }: NavigateParams) => {
    if (!this.navigator) {
      throw new Error("Navigator not initialized");
    }

    this.navigator.goTo({ routeId, params });
  };
}
