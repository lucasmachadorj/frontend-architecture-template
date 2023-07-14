import { injectable, inject } from "inversify";
import { AuthRepository } from "./auth.repository";

@injectable()
export class AuthController {
  @inject(AuthRepository) private authRepository!: AuthRepository;

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
