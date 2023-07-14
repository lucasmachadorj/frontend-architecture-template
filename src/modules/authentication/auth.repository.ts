import { AuthGateway } from "./auth.gateway";

export class AuthRepository {
  constructor(private authGateway: AuthGateway) {}

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

  async getUser() {
    return await this.authGateway.getUser();
  }
}
