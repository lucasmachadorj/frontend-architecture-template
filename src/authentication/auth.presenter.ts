import { inject, injectable } from "inversify";
import { AuthGateway } from "./auth.gateway";

@injectable()
export class AuthPresenter {
  @inject(AuthGateway) private authGateway!: AuthGateway;

  async getUser() {
    return await this.authGateway.getUser();
  }
}
