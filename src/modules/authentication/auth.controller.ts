import { AuthRepository } from "./auth.repository";

export class AuthController {
  constructor(private authRepository: AuthRepository) {}

  login = async () => {
    await this.authRepository.login();
  };

  logout = async () => {
    await this.authRepository.logout();
  };

  requestTokens = async () => {
    await this.authRepository.requestTokens();
  };

  removeTokens = async () => {
    await this.authRepository.removeTokens();
  };
}
