import { inject, injectable } from "inversify";
import { AuthGateway } from "./auth.gateway";

@injectable()
export class AuthRepository {
  @inject(AuthGateway) private authGateway!: AuthGateway;

  async login() {
    const user = await this.authGateway.getUser();
    const isLoggedIn = !!user && !user.expired;

    if (isLoggedIn) {
      return;
    }

    await this.authGateway.redirectToLogin();
  }

  async logout() {
    await this.authGateway.redirectToLogout();
  }

  async requestTokens() {
    await this.authGateway.requestTokens();
  }

  async removeTokens() {
    await this.authGateway.removeTokens();
  }

  getUser() {
    return "getUser";
  }
}
