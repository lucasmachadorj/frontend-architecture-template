import { AuthRepository } from "./auth.repository";

export class AuthController {
  constructor(private authRepository: AuthRepository) {}

  async login() {
    const user = await this.authRepository.login();
  }

  async logout() {
    await this.authRepository.logout();
  }

  async requestTokens() {
    await this.authRepository.requestTokens();
  }

  async removeTokens() {
    await this.authRepository.removeTokens();
  }
}
