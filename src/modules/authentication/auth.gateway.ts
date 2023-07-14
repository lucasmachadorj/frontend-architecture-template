import { UserManager } from "oidc-client-ts";

export class AuthGateway {
  constructor(private userManager: UserManager) {}

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
