import { injectable, inject } from "inversify";
import { UserManager } from "oidc-client-ts";

@injectable()
export class AuthGateway {
  @inject(UserManager) private userManager!: UserManager;

  async getUser() {
    return await this.userManager.getUser();
  }

  async redirectToLogin() {
    return await this.userManager.signinRedirect();
  }

  async redirectToLogout() {
    return await this.userManager.signoutRedirect();
  }

  async requestTokens() {
    return await this.userManager.signinRedirectCallback();
  }

  async removeTokens() {
    return await this.userManager.signoutRedirectCallback();
  }
}
