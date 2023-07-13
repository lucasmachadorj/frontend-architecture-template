import { injectable } from "inversify";

export type NavigateParams = {
  routeId: string;
  params?: any;
  query?: any;
};

@injectable()
export class RouterGateway {
  async registerRoutes(routeConfig: any) {}

  goToId = ({ routeId, params, query }: NavigateParams) => {};
}
